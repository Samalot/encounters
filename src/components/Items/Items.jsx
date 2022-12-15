import React from "react";

import styles from "./Items.module.scss"

const Maps = ({
  quest
}) => {
  const {
    items
  } = quest;

  return items ? (
    <div className={styles.part}>
      <h2 className={styles.section}>Items</h2>
      
      <div>
        {
          items.map(item => (
            <div className={styles.card} key={`items-${item.name}`}>
              <div className={styles.cardBorder}/>
              <div className={styles.cardContent}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <div>{item.tags.join(", ")}</div>
                { item.attunement && <div><i>(requires attunement)</i></div> }
                <div className={styles.cardText}>{item.text}</div>
              </div>
              <div className={styles.cardBorder}/>
            </div>
          ))
        }
      </div>
      
      
    </div>
  ) : <React.Fragment/>;
};

export default Maps