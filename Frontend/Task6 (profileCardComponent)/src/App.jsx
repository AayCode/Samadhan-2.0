import ProfileCard from "./Components/ProfileCard.jsx";

export default function App() {
  const users = [
    {
      name: "Aaysha Mansuri",
      role: "Full Stack Developer",
      avatar: "\Aaysha.jfif",
      location: "Manasa, India",
      bio: "Learning and creating full stack website!",
      interests: ["React", "CSS", "Git"]
    },
    {
      name: "Neha Kumawat",
      role: "Backend Enthusiast",
      avatar: "\Neha.jfif",
      location: "Mandsaur, India",
      bio: "Learning APIs and databases.",
      interests: ["Node.js", "MongoDB", "Postman"]
    },
    {
      name: "Aqsa Mansuri",
      role: "Forntend Developer",
      avatar: "\Aqsa.jfif",
      location: "Manasa, India",
      bio: "Beginner in React—excited to build cool UIs!",
      interests: ["React", "CSS", "Git"]
    },
  ];

  return (
    <main className="app">
      <h1>Profile Cards</h1>
      <div className="grid">
        {users.map((u) => (
          <ProfileCard key={u.name} {...u} />
        ))}
      </div>
    </main>
  );
}