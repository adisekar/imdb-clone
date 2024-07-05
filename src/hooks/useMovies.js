import { useEffect, useState } from "react";
import { key } from "../constants";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}&page=1`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch - ${res.statusText}`);
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query) {
      //   handleCloseMovie();
      fetchMovies();
    }

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
