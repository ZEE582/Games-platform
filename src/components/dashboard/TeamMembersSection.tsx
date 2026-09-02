import MemberCard from "./MemberCard";
import "./componentsstyle/TeamMembersSection.css";
type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  email: string;
};

const members: Member[] = [
  {
    id: 1,
    name: "Nada-Nour",
    role: "Front-End Developer",
    image: "photos/nada.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "nada.nour00700@gmail.com",
  },
  {
    id: 2,
    name: "Ahmad-hanani",
    role: "Front-End Developer",
    image: "photos/ahmad.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "ahmadhnani3@gmail.com",
  },
  {
    id: 3,
    name: "Waseem-Mohammed",
    role: "Front-End Developer",
    image: "photos/waseem.jpg",
    github: "https://github.com/wwaseemmohammed",
    linkedin: "https://linkedin.com",
    email: "wwaseemmohammedd@gmail.com",
  },
  {
    id: 4,
    name: "Yousef",
    role: "Front-End Developer",
    image: "photos/cap.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "yousef@example.com",
  },
];

export default function TeamMembersSection() {
  return (
    <div id="members" className="members-section">
      <h2>Team Members</h2>

      <div className="Members">
        {members.map((m) => (
          <MemberCard
            key={m.id}
            name={m.name}
            role={m.role}
            image={m.image}
            github={m.github}
            linkedin={m.linkedin}
            email={m.email}
          />
        ))}
      </div>
    </div>
  );
}
