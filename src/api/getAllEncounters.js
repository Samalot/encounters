import axios from "axios"

const getSummaryProd = async () => {
  const result = await  axios.get("https://samalot.dev/api/encounters")
  if (result.status === 200) {
    return result.data;
  }
};

const getSummaryDev = (path) => {
  return require(`../../encounters/${path}.json`);
};


const getAllEncounters = async () => {
  const isLocal = true;
  return isLocal ? getSummaryDev("summary") : getSummaryProd();
};

export default getAllEncounters;