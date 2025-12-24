import { useNavigate } from "react-router-dom";
import { Game } from "./types";
import "../componentsstyle/GamesSection.css";

type Props = {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (img: string) => void;
};

export default function GamesSection({ games, favorites, onToggleFavorite }: Props) {
  const navigate = useNavigate();

  return (
    <div className="gamess" id="games">
      <h2>Games Section</h2>

      <div className="games">
        {games.map((game) => (
          <div
            className="game"
            key={game.id}
            onClick={() => {
              if (game.path.endsWith(".html")) window.open(game.path, "_blank");
              else navigate(game.path);
            }}
          >
            <button
              className={`fav-btn ${favorites.includes(game.img) ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(game.img);
              }}
            >
              ⭐
            </button>

            <div className="front">
              <img src={game.img} alt="" />
            </div>

            <div className="back">
              <p>{game.info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
