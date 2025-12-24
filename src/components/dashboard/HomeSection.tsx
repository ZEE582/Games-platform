import "../componentsstyle/HomeSection.css";
export default function HomeSection() {
  return (
    <div className="content" id="home">
      <div className="text">
        <h1>
          Welcome to our gaming platform 🎮
          Where fun, challenge, and excitement come together.
        </h1>
        <p>
          Discover amazing games, compete with players worldwide, and enjoy a whole new level of entertainment.
        </p>
      </div>
      <div className="img">
        <img src="photos/cap.jpg" alt="" />
      </div>
    </div>
  );
}
