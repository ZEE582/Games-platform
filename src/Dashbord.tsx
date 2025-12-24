import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faGamepad, 
  faChartPie, 
  faStar, 
  faUserGroup, 
  faSignOut 
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type Game = {
  id: number;
  img: string;
  info: string;
  path: string
};

const gamesData: Game[] = [
  { id: 1, img: "/photo/snake.jpg", info: "Snake Game", path: "/games/snack/snack.html" }, 
  { id: 2, img: "/photo/xo.jpg", info: "XO Game", path: "/games/xo/index.html" },            
  { id: 3, img: "/photo/bird.jpg", info: "bird Game", path: "/games/bird/html_C.html" },            
  { id: 4, img: "/photo/rbs.jpg", info: "Rock Paper Scissors", path: "/games/RBS/index.html" },      
  { id: 5, img: "/photo/football.jpg", info: "football game", path: "/games/football_game/index.html" },      
  { id: 6, img: "/photo/azkar.jpg", info: "fast typing sgame", path: "/games/azkar/index.html" },      

];

type DashbordProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Dashbord({ setLoggedIn }: DashbordProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visits, setVisits] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);

  const navigate = useNavigate();

  // Load data once
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavs);

    const v = Number(localStorage.getItem("visits") || 0) + 1;
    localStorage.setItem("visits", String(v));
    setVisits(v);

    let u = Number(localStorage.getItem("users") || 0);
    const visited = localStorage.getItem("userVisited");
    if (!visited) {
      u += 1;
      localStorage.setItem("users", String(u));
      localStorage.setItem("userVisited", "true");
    }
    setUsers(u);
  }, []);

  const toggleFavorite = (img: string) => {
    let updated: string[];
    if (favorites.includes(img)) {
      updated = favorites.filter(f => f !== img);
    } else {
      updated = [...favorites, img];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="layout">
      {/* ===== Side Menu ===== */}
      <div className="menu">
        <ul>
          <li className="profile">
            <div className="imge">
              <img src="photos/cap.jpg" alt="" />
            </div>
            <h2>CAP_TEAM</h2>
          </li>

          <li>
            <a href="#home" className="active">
              <FontAwesomeIcon icon={faHome} />
              <p>Dashboard</p>
            </a>
          </li>

          <li>
            <a href="#games">
              <FontAwesomeIcon icon={faGamepad} />
              <p>Games</p>
            </a>
          </li>

          <li>
            <a href="#charts">
              <FontAwesomeIcon icon={faChartPie} />
              <p>Charts</p>
            </a>
          </li>

          <li>
            <a href="#favorite">
              <FontAwesomeIcon icon={faStar} />
              <p>Favorite</p>
            </a>
          </li>

          <li>
            <a href="#members">
              <FontAwesomeIcon icon={faUserGroup} />
              <p>Team Members</p>
            </a>
          </li>

          <li className="logout">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              <FontAwesomeIcon icon={faSignOut} /> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* ===== Main Content ===== */}
      <div className="main">
        {/* Home */}
        <div className="content" id="home">
          <div className="text">
            <h1>
              Welcome to our gaming platform 🎮  
              Where fun, challenge, and excitement come together.
            </h1>
            <p>Discover amazing games, compete with players worldwide, and enjoy a whole new level of entertainment.</p>
          </div>
          <div className="img">
            <img src="photos/cap.jpg" alt="" />
          </div>
        </div>

        {/* Games Section */}
        <div className="gamess" id="games">
          <h2>Games Section</h2>
          <div className="games">
            {gamesData.map(game => (
              <div
  className="game"
  key={game.id}
  onClick={() => {
    if (game.path.endsWith(".html")) {
      window.open(game.path, "_blank");
    } else {
      navigate(game.path);
    }
  }}
>
  <button
    className={`fav-btn ${favorites.includes(game.img) ? "active" : ""}`}
    onClick={(e) => {
      e.stopPropagation(); 
      toggleFavorite(game.img);
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

        {/* Favorites */}
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

        {/* Charts */}
        <section className="charts-section" id="charts">
          <h2>Website Statistics</h2>
          <div className="charts">
            <div className="chart-box">
              <h3>{visits}</h3>
              <p>Total Visits</p>
            </div>
            <div className="chart-box">
              <h3>{users}</h3>
              <p>Total Users</p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <div id="members" className="members-section">
          <h2>Team Members</h2>
          <div className="Members">
            {/* Nada */}
            <div className="profile-card">
              <div className="image">
                <img src="photos/nada.jpg" className="profile-img" alt="Nada" />
              </div>
              <div className="text-data">
                <span className="name">Nada-Nour</span>
                <span className="job">Front-End Developer</span>
              </div>
              <div className="media-buttons">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:nada.nour00700@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>

            {/* Ahmad */}
            <div className="profile-card">
              <div className="image">
                <img src="photos/ahmad.jpg" className="profile-img" alt="Ahmad" />
              </div>
              <div className="text-data">
                <span className="name">Ahmad-hanani</span>
                <span className="job">Front-End Developer</span>
              </div>
              <div className="media-buttons">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://www.linkedin.com/in/waseem-mohammed" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:ahmadhnani3@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>

            {/* Waseem */}
            <div className="profile-card">
              <div className="image">
                <img src="photos/waseem.jpg" className="profile-img" alt="Waseem" />
              </div>
              <div className="text-data">
                <span className="name">Waseem-Mohammed</span>
                <span className="job">Front-End Developer</span>
              </div>
              <div className="media-buttons">
                <a href="https://github.com/wwaseemmohammed" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:wwaseemmohammedd@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>

            {/* Yousef */}
            <div className="profile-card">
              <div className="image">
                <img src="photos/cap.jpg" className="profile-img" alt="Yousef" />
              </div>
              <div className="text-data">
                <span className="name">Yousef</span>
                <span className="job">Front-End Developer</span>
              </div>
              <div className="media-buttons">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="mailto:nada.nour00700@gmail.com">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
