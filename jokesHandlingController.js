const JokeAPI = require("sv443-joke-api");

const handleJokeRequest = async () => {
  try {
    const apiResponse = await JokeAPI.getJokes({
      jokeType: "single",
      categories: "Any",
    }).then((res) => res.json());
    console.log(apiResponse);
    const joke = apiResponse.joke;
    return joke;
  } catch (error) {
    return JSON.stringify(
      `Unable to process your request due to error ${error}`
    );
  }
};

module.exports = handleJokeRequest;
