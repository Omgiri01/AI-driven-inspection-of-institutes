import axios from 'axios';

export async function getPexelsImage() {
  try {
    const response = await axios.get(`/pexels/image`);
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function getPexelsVideo() {
  try {
    const response = await axios.get(`/pexels/video`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
}

let localStorageLock = false;

export async function getMultiplePexelsImages(
  queries = ['home', 'apple', 'pizza', 'mountains', 'cat'],
) {
  const normalizeQuery = (query) =>
    query.trim().toLowerCase().replace(/\s+/g, '');

  while (localStorageLock) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  localStorageLock = true;

  const cachedImages =
    JSON.parse(localStorage.getItem('pexelsImagesCache')) || {};

  const isImageCached = (query) => {
    const normalizedQuery = normalizeQuery(query);
    const cached = cachedImages[normalizedQuery];
    const isCached =
      cached && cached.src && cached.photographer && cached.photographer_url;
    return isCached;
  };

  const missingQueries = queries.filter((query) => !isImageCached(query));

  if (missingQueries.length > 0) {
    const queryString = missingQueries.join(',');

    try {
      const response = await axios.get(`/pexels/multiple-images`, {
        params: { queries: queryString },
      });

      missingQueries.forEach((query, index) => {
        const normalizedQuery = normalizeQuery(query);
        if (!cachedImages[normalizedQuery]) {
          cachedImages[normalizedQuery] = response.data[index];
        }
      });

      localStorage.setItem('pexelsImagesCache', JSON.stringify(cachedImages));
    } catch (error) {
      console.error(error);
    }
  }

  const result = queries.map((query) => cachedImages[normalizeQuery(query)]);

  localStorageLock = false;

  return result;
}
