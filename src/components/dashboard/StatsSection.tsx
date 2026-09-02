import "./componentsstyle/StatsSection.css";
type Props = {
  visits: number;
  users: number;
};

export default function StatsSection({ visits, users }: Props) {
  return (
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
  );
}
