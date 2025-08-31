export default function ProfileCard({
  name,
  role,
  avatar,
  bio,
  location,
  tags = [],
  onFollow,
}) {
  return (
    <div className="card">
      <div className="row">
        <img src={avatar} alt={`${name} avatar`} className="avatar" />
        <div>
          <h3 className="name">{name}</h3>
          <p className="role">{role}</p>
          {location && <div className="meta">📍 {location}</div>}
        </div>
      </div>

      {bio && <p className="bio">{bio}</p>}

      {tags.length > 0 && (
        <div className="badges">
          {tags.map((t) => (
            <span className="badge" key={t}>{t}</span>
          ))}
        </div>
      )}

      <div className="actions">
        <button className="btn primary" onClick={() => onFollow?.(name)}>
          Follow
        </button>
        <button className="btn">Message</button>
      </div>
    </div>
  );
}