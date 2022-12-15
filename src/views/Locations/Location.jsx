import React from "react";
import Media from 'react-media';
import { createStructuredSelector } from 'reselect';
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import SquareLoader from "react-spinners/SquareLoader";
import { Link } from "react-router-dom";
import { getLocationsCache, setLocationsCache} from "../../utils/store";
import handleCache from "../../utils/cache";
import getLocation from "../../api/getLocation";
import Maps from "../../components/Map/Maps";

import styles from "./Location.module.scss"
import { useState } from "react";
import { useEffect } from "react";

const Main = ({
  cache,
  setLocationsCache
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});

  useEffect(() => {  
    handleCache(id, getLocation, cache, setLocation, setLoading, setLocationsCache);
  }, []);

  const normalLayout = () => (
    <React.Fragment>
      <Link to={`/locations`} className={styles.back}>&lt; Locations</Link>
      <h1 className={styles.title}>{ `${location.title}` }</h1>
      <Maps location={location} />
    </React.Fragment>
  );

  const largeLayout = () => (
    <div>
      <Link to={`/locations`} className={styles.back}>&lt; Locations</Link>
      <h1 className={styles.title}>{ `${location.title}` }</h1>
      <Maps location={location} />
    </div>
  );

  return !loading ? (
		<div className={styles.quest}>
      <Media queries={{
        mobile: "(max-width: 414px)",
        normal: "(min-width: 415px) and (max-width: 1199px)",
        large: "(min-width: 1200px)"
      }}>
        {matches => (
          <React.Fragment>
            {(matches.mobile || matches.normal) && normalLayout()}
            {matches.large && largeLayout()}
          </React.Fragment>
        )}
      </Media>
		</div>
	) : (
    <div className={styles.loadingWrapper}>
      <SquareLoader
        color='#58180e'
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className={styles.loading}>...Loading Encounter...</div>
    </div>
  );
}

const mapDispatchToProps = {
  setLocationsCache
};

const mapStateToProps = createStructuredSelector({
  cache: getLocationsCache
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Main);