import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ImageZoom from "react-image-zooom";

import styles from "./Map.module.scss"
import tableStyles from "../../style/table.module.scss"

const loadImg = (locationId, imgId) => {
  // return require(`../../../encounters/locations/${img}`);
  // console.log(`https://samalot.dev/encounter/${locationId}_${imgId}.png`);
  return `https://samalot.dev/encounter/${locationId}_${imgId}.png`;
};

const Maps = ({
  location
}) => {
  const {
    maps,
    id,
  } = location;

  const [selectedImage, setSelectedImage] = useState(0);
  // const [displayImage, setDisplayImage] = useState(`https://samalot.dev/encounter/${id}_0.png`);
  const [imageZoom, setImageZoom] = useState(false);

  useEffect(() => {
    const mapElements = maps.forEach((map, index) => <ImageZoom className={styles.mapImg} src={`https://samalot.dev/encounter/${id}_${index}.png`} alt="A image to apply the ImageZoom plugin" zoom="300"/>);
    console.log(mapElements);
    setImageZoom(mapElements);
  }, [location]);

  const handleImageSelect = (amount) => {
    const newImage = Math.min(Math.max(selectedImage + amount, 0), maps.length - 1);
    setSelectedImage(newImage);
    // setDisplayImage(`https://samalot.dev/encounter/${id}_${newImage}.png`);
  };

  // const image = useCallback(() => <ImageZoom className={styles.mapImg} src={displayImage} alt="A image to apply the ImageZoom plugin" zoom="300"/>, [displayImage]);

  return maps ? (
    <div className={styles.part}>
      <h2 className={styles.section}>Maps</h2>

      <div className={styles.menu}>
        <button className={styles.button} onClick={() => handleImageSelect(-1)}><ArrowDropUpIcon /></button>
        <button className={styles.button} onClick={() => handleImageSelect(1)}><ArrowDropDownIcon /></button>
        &nbsp;
        <span>{`${maps[selectedImage].name} (${maps.length - selectedImage}/${maps.length})`}</span>
      </div>
      
      <div className={styles.imageContainer}>
        {/* <img className={styles.mapImg} src={loadImg(id, selectedImage)}/> */}
        {/* { image() } */}
        { imageZoom && imageZoom[selectedImage] }
      </div>
      <div className={styles.labels} style={{marginBottom: 10}}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th/>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              maps[selectedImage].labels.map((item, index) => (
                <tr key={`label-${index}`}>
                  <td>{index + 1}</td>
                  <td><div dangerouslySetInnerHTML={{__html: item}}/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <h2 className={styles.section}>Links</h2>
      <div className={styles.buttonWrapper}>
        <button className={styles.imgButton}>🖼️ Standard</button>
        <button className={styles.imgButton}>🖨️ Printer Friendly</button>
        <button className={styles.imgButton}>🗺️ Sepia</button>
      </div>
    </div>
  ) : <React.Fragment/>;
};

export default Maps