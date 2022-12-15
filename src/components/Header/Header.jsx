import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import styles from './Header.module.scss';


const Header = () => {
	const location = useLocation();

	const isSelected = (route) => {
		if (route === "encounter") {
			return location.pathname === "/" || location.pathname.includes("encounter");
		} else if (route === "locations") {
			return location.pathname.includes("locations")
		}

	};

  return (
		<div className={styles.headerContainer}>
			<Link to={`/`}><button className={isSelected("encounter") ? styles.selected : ''}>Encounters</button></Link>
			<span>|</span>
			<Link to={`/locations`}><button className={isSelected("locations") ? styles.selected : ''}>Locations</button></Link>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps),
);

export default hocChain(Header);
