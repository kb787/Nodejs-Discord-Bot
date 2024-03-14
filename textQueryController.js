const OpenAI = require('openai') ;
const dotenv = require('dotenv') ;

dotenv.config() ;
const openai = new OpenAI({apiKey:process.env.open_ai_api_key}) ;
const handleTextQuery = async(query) => {
    if(!query) {
        return ;
    }
    const openaiResponse = await openai.chat.completions.create({
        messages: [{ role: "system", content: query}],
        model: "gpt-3.5-turbo",
      });
    return openaiResponse.choices[0].message.content ;  
}

module.exports = handleTextQuery ;

