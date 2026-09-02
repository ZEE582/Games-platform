import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGamepad,
  faChartPie,
  faStar,
  faUserGroup,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  onLogout: () => void;
};

export default function SideMenu({ onLogout }: Props) {
  return (
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
              onLogout();
            }}
          >
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
