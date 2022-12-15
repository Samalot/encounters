import React from "react";
import Media from 'react-media';
import { createStructuredSelector } from 'reselect';
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import Overview from "../../components/Overview/Overview"
import Encounter from "../../components/Encounter/Encounter"
import Items from "../../components/Items/Items"
import Inspiration from "../../components/Inspiration/Inspiration"
import SquareLoader from "react-spinners/SquareLoader";
import { Link } from "react-router-dom";
import { getCache, setCache} from "../../utils/store";
import getEncounter from "../../api/getEncounter";
import handleCache from "../../utils/cache";

import styles from "./Quest.module.scss"
import { useState } from "react";
import { useEffect } from "react";

const Credits = ({quest}) => {
  return quest.credits ? (
    <div>
      <h2 className={styles.section}>Credits</h2>
      <ul>
        {
          quest.credits.map((credit, index) => <li key={`credit-${index}`}><a href={credit.link} target="_blank">{credit.title}</a></li>)
        }
      </ul>  
    </div>
  ) : (<React.Fragment />)
};

const Main = ({
  cache,
  setCache
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [quest, setQuest] = useState({});

  useEffect(() => {  
    handleCache(id, getEncounter, cache, setQuest, setLoading, setCache);
  }, []);

  const normalLayout = () => (
    <React.Fragment>
      <Link to={`/`} className={styles.back}>&lt; Encounters</Link>
      <h1 className={styles.title}>
        { `${quest.title}` }
      </h1>
      <Overview quest={quest} />
      <Encounter quest={quest} />
      <Items quest={quest} />
      <Inspiration quest={quest} />
      <Credits quest={quest} />
    </React.Fragment>
  );

  const largeLayout = () => (
    <div>
      <Link to={`/`} className={styles.back}>&lt; Encounters</Link>
      <div className={styles.columns}>
        <div className={styles.leftCol}>
          <h1 className={styles.title}>
            { `${quest.title}` }
          </h1>
          <Overview quest={quest} />
          <Encounter quest={quest} />
          <Items quest={quest} />
        </div>
        <div className={styles.rightCol}>
          <Inspiration quest={quest} />
          <Credits quest={quest} />
        </div>
      </div>
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
  setCache
};

const mapStateToProps = createStructuredSelector({
  cache: getCache
});

const hocChain = compose(
	connect(mapStateToProps, mapDispatchToProps),
);

export default hocChain(Main);