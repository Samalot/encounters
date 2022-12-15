import React from "react";

import styles from "./Inspiration.module.scss"
import tableStyles from "../../style/table.module.scss"

const Inspiration = ({
  quest
}) => {
  const {
    inspiration
  } = quest;

  return inspiration ? (
    <div className={styles.part}>
      <h2 className={styles.section}>Inspiration</h2>
      {
        inspiration.map((table, tableIndex) => (
          <div className={tableStyles.tableWrapper} key={`inspiration-${tableIndex}`}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th/>
                  <th>{table.title}</th>
                </tr>
              </thead>
              <tbody>
                {
                  table.items.map((item, index) => (
                    <tr key={`inspiration-${tableIndex}-${index}`}>
                      <td>{index + 1}</td>
                      <td><div dangerouslySetInnerHTML={{__html: item}}/></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ))
      }
    </div>
  ) : <React.Fragment />;
};

export default Inspiration