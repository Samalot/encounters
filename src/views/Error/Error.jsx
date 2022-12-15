import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import { } from '../../utils/store';

import styles from './Error.scss';

const Error = () => {
  return (
		<div>
			Error
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

export default hocChain(Error);