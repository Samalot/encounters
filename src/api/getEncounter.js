import axios from "axios"

const getEncounterProd = async (id) => {
  const result = await axios.post("https://samalot.dev/api/encounters", {id});
  if (result.status === 200) {
    return result.data;
  }
};

const getEncounterDev = (id) => {
  console.log(`loading ${id} from local`);
  return require(`../../encounters/${id}.json`);
};


const getEncounter = async (id) => {
  const isLocal = true;
  return isLocal ? getEncounterDev(id) : getEncounterProd(id);;
};

export default getEncounter;