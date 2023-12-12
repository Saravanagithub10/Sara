import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup, Container } from "react-bootstrap";
import axios from "axios";
import Content from "../../Content/content";

import { Search as SearchIcon } from "react-bootstrap-icons";

const Search = () => {
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchSearch = async () => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=33c1451d78149c6f37c7f351d22f6452&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      const tvResponse = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=33c1451d78149c6f37c7f351d22f6452&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );

      const moviesWithLabel = movieResponse.data.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));

      const tvSeriesWithLabel = tvResponse.data.results.map((tv) => ({
        ...tv,
        media_type: "tv",
      }));

      const combinedResults = [...moviesWithLabel, ...tvSeriesWithLabel];
      setContent(combinedResults);
      setSearchPerformed(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);

  return (
    <div
      className="search-container"
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <span className="title" style={{ color: "black" }}>
            Search Your Favorite
          </span>
          <InputGroup className="mb-3">
            <FormControl
              style={{
                flex: 1,
                color: "black",
                backgroundColor: "White",
                borderRadius: "5px",
                border: "2px solid black",
                fontSize: "1.5rem",
              }}
              className="search box"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              style={{
                marginLeft: "10px",
                backgroundColor: "#eed202",
                border: "2px solid black",
                fontSize: "1.5rem",
                borderRadius: "5px",
              }}
              onClick={fetchSearch}
            >
              <SearchIcon />
            </Button>
          </InputGroup>

          {searchPerformed && (
            <div className="home">
              {content.length > 0 ? (
                content.map((c) => (
                  <Content
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.name || c.title}
                    date={c.first_air_date || c.release_date}
                    media_type={c.media_type}
                    overview={c.overview}
                  />
                ))
              ) : (
                <h2>No Content Found</h2>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Search;
