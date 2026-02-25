export type Game = {
  id: number;
  img: string;
  info: string;
  path: string;
};

export type DashbordProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
