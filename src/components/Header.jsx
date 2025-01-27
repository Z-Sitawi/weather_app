/* eslint-disable react/prop-types */
import { connect } from "react-redux";

function Header(props) {
  const weather = props.weather;
  return (
    <header className="container p-3 d-flex justify-content-between align-items-start">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="d-flex gap-2">
          <i className="bi bi-geo-alt-fill"></i> {weather.location.name} 
        </h3>
        <span>
          {weather.location.localtime.split(" ")[0].split("-").join(" / ") +
            " (" +
            weather.location.localtime.split(" ")[1] +
            ")"}
        </span>
        <span>{}</span>
      </div>
      <h5>
        <i className="bi bi-gear-fill"></i>
      </h5>
    </header>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, null)(Header);
