<<<<<<< HEAD
import "./componentsstyle/FavoritesSection.css";
=======
import "../componentsstyle/FavoritesSection.css";
>>>>>>> bb96d04d5498d38c4b7b2d423b15f15c16597d38

type Props = {
  favorites: string[];
};

export default function FavoritesSection({ favorites }: Props) {
  return (
    <div className="favorites-section" id="favorite">
      <h2>Favorites</h2>

      <div className="favorites">
        {favorites.length === 0 ? (
          <p>No favorites yet 🎮</p>
        ) : (
          favorites.map((img, i) => (
            <div className="game" key={i}>
              <div className="front">
                <img src={img} alt="" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
