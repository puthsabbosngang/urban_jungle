import useTitle from "../hooks/useTitle";

export default function Shop() {
  useTitle ("Shop");
  return (
  <>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📦 UrbanJungle Shop Page</h2>
      <p>Welcome! to Urbanjungle's Shop page.</p>
    </div>
  </>
  );
}
