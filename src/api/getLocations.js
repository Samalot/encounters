import axios from "axios"

const getLocationsProd = async () => {
  const result = await  axios.get("https://samalot.dev/api/encounters")
  if (result.status === 200) {
    return result.data;
  }
};

const getLocationsDev = (path) => {
  return require(`../../encounters/${path}.json`);
};


const getLocations = async () => {
  const isLocal = true;
  return isLocal ? getLocationsDev("locations") : getLocationsDev("locations");
};

export default getLocations;