export type Game = {
  id: number;
  img: string;
  info: string;
  path: string;
};


export const gamesData: Game[] = [
  { id: 1, img: "/photo/snake.jpg", info: "Snake Game", path: "/games/snack/snack.html" },
  { id: 2, img: "/photo/xo.jpg", info: "XO Game", path: "/games/xo/index.html" },
  { id: 3, img: "/photo/bird.jpg", info: "bird Game", path: "/games/bird/html_C.html" },
  { id: 4, img: "/photo/rbs.jpg", info: "Rock Paper Scissors", path: "/games/RBS/index.html" },
  { id: 5, img: "/photo/football.jpg", info: "football game", path: "/games/football_game/index.html" },
  { id: 6, img: "/photo/azkar.jpg", info: "fast typing sgame", path: "/games/azkar/index.html" },
];
