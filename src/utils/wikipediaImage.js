
/**
 * Fetch an image for a player from Wikipedia
 * @param {string} playerName - The name of the player
 * @returns {Promise<string|null>} - The URL of the player's image, or null if not found
 */
export const fetchWikipediaImage = async (playerName) => {
  try {
    // Convert the player name to a Wikipedia-friendly format
    const searchTerm = playerName.replace(/ /g, "%20");
    
    // First, search for the player's Wikipedia page
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&format=json&origin=*`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (!searchData.query.search.length) {
      console.info(`No Wikipedia page found for ${playerName}`);
      return null;
    }
    
    // Get the title of the first search result
    const pageTitle = searchData.query.search[0].title;
    const encodedTitle = encodeURIComponent(pageTitle);
    
    // Now fetch the page information to get the image
    const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodedTitle}&pithumbsize=500&format=json&origin=*`;
    
    const pageResponse = await fetch(pageUrl);
    const pageData = await pageResponse.json();
    
    // Extract the image URL from the response
    const pages = pageData.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
      return pages[pageId].thumbnail.source;
    }
    
    console.info(`No image found for ${playerName} on Wikipedia`);
    return null;
  } catch (error) {
    console.error(`Error fetching image for ${playerName}:`, error);
    return null;
  }
};
