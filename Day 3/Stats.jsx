export default function Stats({ completed }) {
  const xp = completed * 10;
  const level = Math.floor(xp / 50) + 1;
  const progress = (xp % 50) * 2;

  return (
    <div className="stats-panel">
      <h2>📊 Productivity</h2>
      <p>Level {level}</p>
      <div className="xp-bar">
        <div className="xp-fill" style={{ width: progress + "%" }} />
      </div>
      <p>XP: {xp}</p>
    </div>
  );
}
