import React from "react";
import { createStructuredSelector } from 'reselect';
import { compose } from "redux";
import { connect } from "react-redux";
import SquareLoader from "react-spinners/SquareLoader";
import { Link } from "react-router-dom";

import styles from './Locations.module.scss';
import tableStyles from "../Main/table.module.scss"
import { useState, useEffect } from "react";
import { setLocations, getLocations } from "../../utils/store";
import getLocationsFile from "../../api/getLocations";

const Locations = ({
	locations,
	setLocations
}) => {
	const [loading, setLoading] = useState(true);
	const [items, setItems] = useState([]);

	useEffect(() => {  
		if (locations) {
			setItems(locations);
      setLoading(false);
		} else {
			getLocationsFile().then(result => {
				setItems(result);
					setLoading(false);
					setLocations(result);
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
            <th>Type</th>
						<th>Description</th>
						<th>Quests</th>
					</tr>
				</thead>
				<tbody>
					{
						items.map((item, index) => (
								<tr key={`location-${item.title}`}>
									<td>{index + 1}</td>
									<td>
									<Link to={`/locations/${index+1}`}>{item.title}</Link></td>
									<td>{item.type}</td>
                  <td>{item.description}</td>
									<td>{`${item.quests ? 'Yes' : 'No'}`}</td>
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
	setLocations
};

const mapStateToProps = createStructuredSelector({
	locations: getLocations
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Locations);