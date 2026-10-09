
export interface Game {
  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  isFavorite?: boolean; // Optional property to mark as favorite
}