import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "./../index";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";

const Movies = () => {

  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="H4">
          No movies that match that name.
          <br />
          please search for something else
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "An error has occurred";
  }
  return (
      <MovieList movies={data} />
  
  );

};

export default Movies;
