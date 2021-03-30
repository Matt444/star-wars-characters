import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, Container, Grid, TextField, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

import CharacterCard from "./components/CharacterCard";
import MultipleSelect from "./components/MultipleSelect";
import useStyles from "./styles/App.styles";
import backgroundImg from "./images/background.jpg";
import "./styles/App.css";

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
});

function App() {
    const classes = useStyles();
    const [visibleCharacters, setVisibleCharacters] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [allCharactersLoaded, setAllCharactersLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [films, setFilms] = useState([]);
    const [selectedFilmTitles, setSelectedFilmTitles] = useState([]);
    const [search, setSearch] = useState("");
    const [limitOfCharacters, setLimitOfCharacters] = useState(10);
    const [loading, setLoading] = useState(true);
    const loadingRef = useRef();
    const searchRef = useRef();
    const selectedFilmTitlesRef = useRef();

    loadingRef.current = loading;
    searchRef.current = search;
    selectedFilmTitlesRef.current = selectedFilmTitles;

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loadingRef.current) return;
        setLimitOfCharacters((prev) => prev + 5);
    }

    const clearAll = () => {
        setCharacters([]);
        setVisibleCharacters([]);
        setAllCharactersLoaded(false);
        setLimitOfCharacters(10);
        setPage(1);
    };

    const handleSearchChange = async (value) => {
        clearAll();
        setSearch(value);
    };

    const handleSelectedFilmTitlesChange = (film) => {
        clearAll();
        setSelectedFilmTitles(film);
    };

    useEffect(() => {
        const fetchFilms = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/films`);
            setFilms(data.results);
        };

        fetchFilms();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const filterCharacters = (characters) => {
            let selectedFilmURLs = [];
            films.forEach((f) => {
                if (selectedFilmTitles.includes(f.title)) selectedFilmURLs = [...selectedFilmURLs, f.url];
            });

            const filteredCharacters = characters.filter((c) => {
                let include = false;
                c.films.forEach((url) => {
                    if (selectedFilmURLs.includes(url)) include = true;
                });
                return include;
            });

            return filteredCharacters;
        };

        const update = async () => {
            let newCharacters = characters;
            let currPage = page;

            while (newCharacters.length < limitOfCharacters && !allCharactersLoaded) {
                try {
                    const { data } = await axios.get(`https://swapi.dev/api/people?search=${search}&page=${currPage}`);
                    currPage += 1;

                    if (data.count === newCharacters.length) {
                        setAllCharactersLoaded(true);
                        break;
                    }
                    if (selectedFilmTitles.length > 0) {
                        newCharacters = newCharacters.concat(filterCharacters(data.results));
                    } else {
                        newCharacters = newCharacters.concat(data.results);
                    }
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setAllCharactersLoaded(true);
                        break;
                    } else {
                        console.error("Error while fetching people");
                    }
                }
            }

            if (searchRef.current === search && selectedFilmTitlesRef.current === selectedFilmTitles) {
                setPage(currPage);
                setCharacters(newCharacters);
                setVisibleCharacters(newCharacters.slice(0, Math.min(limitOfCharacters, newCharacters.length)));
                setLoading(false);
            }
        };

        console.log("updating");
        setLoading(true);
        update();
        // eslint-disable-next-line
    }, [search, limitOfCharacters, selectedFilmTitles]);

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <div className={classes.heroSection}>
                    <img src={backgroundImg} className={classes.backgroundImg} alt="background-img" />
                    <h1 className={classes.heroText}>
                        STAR WARS
                        <br />
                        CHARACTERS
                    </h1>
                </div>

                {films.length === 0 ? (
                    <div style={{ color: "white", marginTop: "36vw" }}>
                        Loading page <CircularProgress color={"white"} size="20px" />
                    </div>
                ) : (
                    <Container className={classes.content}>
                        <div className={classes.searchSection}>
                            <TextField
                                id="search"
                                variant="outlined"
                                fullWidth={true}
                                placeholder="Type name to search..."
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                            />
                            <SearchIcon />
                        </div>

                        <div style={{ textAlign: "left", marginBottom: "14px" }}>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography style={{ color: "white", fontSize: "18px", lineHeight: "32px", marginTop: "16px" }}>
                                        Results{!allCharactersLoaded && " loaded"}: {characters.length}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} style={{ textAlign: "left" }}>
                                    <MultipleSelect
                                        items={films.map((f) => f.title)}
                                        selected={selectedFilmTitles}
                                        handleChange={handleSelectedFilmTitlesChange}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        {visibleCharacters.map((c) => (
                            <CharacterCard key={c.name} character={c} films={films} />
                        ))}

                        <div style={{ marginBottom: "50px" }} id="loading">
                            <span style={{ color: "white" }}>
                                {loading ? (
                                    <>
                                        Loading characters <CircularProgress color={"white"} size="20px" />
                                    </>
                                ) : (
                                    allCharactersLoaded && <>No more characters to load</>
                                )}
                            </span>
                        </div>
                    </Container>
                )}
            </ThemeProvider>
        </div>
    );
}

export default App;
