import { Link } from "react-router-dom";

function HousingCard() {
  return (
    <div className="card">
      <h2>Housing</h2>
      <p>20 available apartments.</p>
      <Link to="/housing">See Housing</Link>
    </div>
  );
}

export default HousingCard;
