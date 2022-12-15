const indexOfSubstrings = (str, regex) => {
  let result, indices = [];
  while ( (result = regex.exec(str)) ) {
      indices.push(result.index);
  }
  return indices
}

export default indexOfSubstrings;