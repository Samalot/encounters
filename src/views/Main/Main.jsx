import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import SquareLoader from "react-spinners/SquareLoader";
import { Link } from "react-router-dom";

import styles from './Main.module.scss';
import tableStyles from "./table.module.scss"
import { useState, useEffect } from "react";
import { getSummary, setSummary } from "../../utils/store";
import getAllEncounters from "../../api/getAllEncounters";

const Main = ({
	summary,
	setSummary
}) => {
	const [loading, setLoading] = useState(true);
	const [encounters, setEncounters] = useState([]);

	useEffect(() => {  
		if (summary) {
			setEncounters(summary);
      setLoading(false);
		} else {
			getAllEncounters().then(result => {
					setEncounters(result);
					setLoading(false);
					setSummary(result);
			});
		}
  }, []);

  return !loading ? (
		<div>
			<table className={tableStyles.table}>
				<thead>
					<tr>
						<th/>
						<th>Name</th>
						<th>Description</th>
						<th>Type</th>
						<th>Level</th>
						<th>Combat</th>
					</tr>
				</thead>
				<tbody>
					{
						encounters.map((item, index) => (
								<tr key={`encounters-${item.title}`}>
									<td>{index + 1}</td>
									<td>
									<Link to={`/encounter/${index+1}`}>{item.title}</Link></td>
									<td>{item.description}</td>
									<td>{item.type}</td>
									<td>{`${item.recommended_level}+`}</td>
									<td>{item.combat ? 'Yes' : 'No'}</td>
								</tr>
						))
					}
				</tbody>
			</table>
		</div>
	) : (
    <div className={styles.loadingWrapper}>
      <SquareLoader
        color='#58180e'
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={styles.loading}>...Loading Encounters...</div>
    </div>
  );
}

const mapDispatchToProps = {
	setSummary
};

const mapStateToProps = createStructuredSelector({
	summary: getSummary
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Main);