import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import styles from "./Overview.module.scss"

const Overview = ({
  quest
}) => {
  const {
    description,
    reward,
    recommended_level,
    tags,
    combat
  } = quest;

  return (
    <div className={styles.part}>
      {/* <span className={styles.firstLetter}>{description[0]}</span>
      <div className={styles.description}>{ description.substring(1) }</div> */}
      <div className={styles.description}>{ description }</div>

      <div className={styles.overview}>
        <div><strong>Recommended Level:</strong> { `${recommended_level}+` } | <strong>Combat:</strong> { combat ? 'Yes' : 'No' } </div> 
        <div><strong>Rewards:</strong> { reward.join(", ") } </div> 
        <div><strong>Tags:</strong> { tags.map(tag => (
          <Chip 
            label={tag} 
            size="small"
            sx={{
              margin: '0px 2px',
            }}
          />
        )) } </div>
      </div>
      
      
    </div>
  );
};

export default Overview