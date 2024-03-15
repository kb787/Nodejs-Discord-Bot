const dotenv = require("dotenv");
const NewsAPI = require("newsapi");
dotenv.config();
const newsapi = new NewsAPI(process.env.news_api_key);

const handleHeadlineNewsQuery = async (userDomain) => {
  try {
    const headlineResponse = await newsapi.v2.topHeadlines({
      // sources: "bbc-news,the-verge",
      // q: userTopic,
      category: userDomain,
      language: "en",
    });
    if (headlineResponse.totalResults <= 0) {
      return JSON.stringify("No relevant articles found");
    } else if (headlineResponse.totalResults >= 0) {
      return headlineResponse.articles.description;
    } else {
      return JSON.stringify("Enter a valid article domain");
    }
  } catch (error) {
    const errorMessage = `Unable to process your request due to error ${error}`;
    return JSON.stringify(errorMessage);
  }
};

const handleCompleteNewsQuery = async (userDomain) => {
  try {
    const newsResponse = await newsapi.v2.everything({
      //   q: userTopic,
      //   sources: "bbc-news,the-verge",
      domains: userDomain,
      from: Date.now() - 2,
      to: Date.now() - 1,
      language: "en",
      sortBy: "relevancy",
      page: 2,
    });
    if (newsResponse.totalResults <= 0) {
      return JSON.stringify("No relevant articles found");
    } else if (newsResponse.totalResults >= 0) {
      return newsResponse.articles.description;
    } else {
      return JSON.stringify("Enter a valid article domain");
    }
  } catch (error) {
    const errorMessage = `Unable to process your request due to error ${error}`;
    return JSON.stringify(errorMessage);
  }
};

module.exports = { handleHeadlineNewsQuery, handleCompleteNewsQuery };
