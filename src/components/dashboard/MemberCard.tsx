import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

type Props = {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
};

export default function MemberCard({
  name,
  role,
  image,
  github,
  linkedin,
  email,
}: Props) {
  return (
    <div className="profile-card">
      <div className="image">
        <img src={image} className="profile-img" alt={name} />
      </div>

      <div className="text-data">
        <span className="name">{name}</span>
        <span className="job">{role}</span>
      </div>

      <div className="media-buttons">
        {github && (
          <a href={github} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        )}

        {linkedin && (
          <a href={linkedin} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        )}

        {email && (
          <a href={`mailto:${email}`}>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        )}
      </div>
    </div>
  );
}
