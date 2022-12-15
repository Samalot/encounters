import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";

import Routes from './views/Routes'
import Header from './components/Header/Header'

import styles from "./style/stylesheet.module.scss";

const App = ({
}) => {
  return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainContent}>
				<Header />
				<Routes />
			</div>
		</div>
  );
}

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(App);
