const configureCache = (item, cache, setCache) => {
  if (cache.length < 5) {
    const newCache = [...cache, item];
    setCache(newCache);
  } else {
    cache.shift();
    const newCache = [...cache, item];
    setCache(newCache);
  }
};


const handleCache = (id, getItem, cache, setItem, setLoading, setCache) => {
  const fromCache = cache.filter(cachedItem => parseInt(id) === parseInt(cachedItem.id));
    if (fromCache.length > 0) {
      setItem(fromCache[0]);
      setLoading(false);
    } else {
      getItem(id).then(result => {
        setItem(result);
        setLoading(false);
        configureCache(result, cache, setCache);
      });
    }
};

export default handleCache;