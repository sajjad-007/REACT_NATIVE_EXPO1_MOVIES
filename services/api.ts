export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_API_ACCESS_TOKEN,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  //encodeURIComponent makes sure the text is treated as data, not as part of the URL structure.
  //If you just drop raw text into a URL, spaces, &, =, ?, and other symbols can break it or be misinterpreted.
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //In JavaScript (and React Native), Error is a built-in class that represents an error object.
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails | undefined> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      { headers: TMDB_CONFIG.headers }
    );
    if (!response.ok) {
      throw new Error('failed to fetch movieDetails');
    }
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error from fetchMovieDetails', error);
    return undefined;
  }
};

// fetchMovieDetails(22299354);
