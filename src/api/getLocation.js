import axios from "axios"

const getLocationrProd = async (id) => {
  // const result = await axios.post("https://samalot.dev/api/encounters", {id});
  // if (result.status === 200) {
  //   return result.data;
  // }
};

const getLocationDev = (id) => {
  console.log(`loading ${id} from local`);
  return require(`../../encounters/locations/${id}.json`);
};


const getLocation = async (id) => {
  const isLocal = true;
  return isLocal ? getLocationDev(id) : getLocationDev(id);;
};

export default getLocation;