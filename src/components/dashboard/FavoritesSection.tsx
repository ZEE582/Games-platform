import "./componentsstyle/FavoritesSection.css";

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
