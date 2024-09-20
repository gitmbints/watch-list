export type Movie = {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  genres: [
    {
      id: number;
      name: string;
    },
  ];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  tagline: string;
  runtime: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Serie = {
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
};

export type TvSerie = Movie & Serie;
