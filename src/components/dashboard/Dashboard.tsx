import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./componentsstyle/Dashboard.css"

import SideMenu from "./SideMenu";
import HomeSection from "./HomeSection";
import GamesSection from "./GamesSection";
import FavoritesSection from "./FavoritesSection";
import StatsSection from "./StatsSection";
import TeamMembersSection from "./TeamMembersSection";

import { gamesData } from "./data";
import { DashbordProps } from "./types";




export default function Dashbord({ setLoggedIn }: DashbordProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visits, setVisits] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);

  const navigate = useNavigate();

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
    const updated = favorites.includes(img)
      ? favorites.filter((f) => f !== img)
      : [...favorites, img];

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
      <SideMenu onLogout={logout} />

      <div className="main">
        <HomeSection />
        <GamesSection
          games={gamesData}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <FavoritesSection favorites={favorites} />
        <StatsSection visits={visits} users={users} />
        <TeamMembersSection />
      </div>
    </div>
  );
}
