import React from "react";

import styles from "./Encounter.module.scss"
import "./encounter.scss"
import { Fragment } from "react";
import indexOfSubstrings from "../../utils/indexOfSubstrings";
import openQuote from "../../resources/image/open_quote.svg";
import closeQuote from "../../resources/image/close_quote.svg";

const Sheets = ({
  quest
}) => {
  const {
    introduction,
    encounter,
    additional
  } = quest;

  const generateHTML = (rawHTML) => {
    let html = rawHTML;

    const startQuotes = indexOfSubstrings(html, /<quote>/gi);
    const endQuotes = indexOfSubstrings(html, /<\/quote>/gi);
    let htmlCopy = html;
    startQuotes.forEach((start, index) => {
      const [entity, quote] = html.substring(start+7, endQuotes[index]).split("-");
      const openQuoteImg = `<img src=\"${openQuote}\" class="quoteStart"/>`;
      const closeQuoteImg = `<img src=\"${closeQuote}\" class="quoteEnd"/>`;
      const quoteBlock = `<div class=\"encounter_quote\"><div class=\"encounter_quote_inner\">${openQuoteImg}${quote}${closeQuoteImg}<div class="quote_entity">${entity}</div></div></div>`;
      htmlCopy = htmlCopy.replaceAll(html.substring(start, endQuotes[index]+8), quoteBlock);
    });
    html = htmlCopy;

    const startEncounters = indexOfSubstrings(html, /<encounter>/gi);
    const endEncounters = indexOfSubstrings(html, /<\/encounter>/gi);
    htmlCopy = html;
    startEncounters.forEach((start, index) => {
      const [type, id, name] = html.substring(start+11, endEncounters[index]).split("-");
      htmlCopy = htmlCopy.replaceAll(html.substring(start, endEncounters[index]+12), `<a class="encounter_link" href="/encounter/${id}">${`${type}: ${name} (#${id})`}</a>`);
    });
    html = htmlCopy;

    return html;
  };

  return (
    <Fragment>
      <div className={styles.encounter}>
        <h2 className={styles.section}>Encounter</h2>
        <div className={styles.encounterBackground}>
          <div><i>Introduction:</i>{` ${introduction}`}</div>
          <br/>
          <div dangerouslySetInnerHTML={{__html: generateHTML(encounter)}} />
        </div>
      </div>
      {
        additional && additional.map((section, index) => (
          <div className={styles.encounter} key={`additional-section-${section.title}-${index}`}>
            <h2 className={styles.section}>{section.title}</h2>
            <div className={styles.encounterBackground}>
              {
                typeof section.text === 'object' ? (
                  <ul>
                    {
                      section.text.map((listItem, listIndex) => <li key={`additional-section-item-${section.title}-${listIndex}`}><div dangerouslySetInnerHTML={{__html: generateHTML(listItem)}} /></li>)
                    }
                  </ul>
                ) : (<div dangerouslySetInnerHTML={{__html: generateHTML(section.text)}} />)
              }
            </div>
          </div>
        ))
      }
    </Fragment>
    
  );
};

export default Sheets