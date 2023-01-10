const express = require("express");
const cors = require('cors');
const axios = require('axios');


require('dotenv').config('./.env'); 

const app = express();

app.use(express.json());
app.use(cors())

app.post("/query", async (req, res) => {
    const { prompt, max_tokens } = req.body

    try {
        let response = await axios({
            method: 'post',
            url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
            headers: {
              Authorization: `Bearer ${process.env.apiKey}`
            },
            data: {
              prompt: prompt,
              max_tokens: max_tokens,
            }
          });
          console.log(response.data);
        //   setReply(response.data.choices[0].text)
        
        res.status(200).json(response.data.choices[0].text)
    } catch (error) {
        res.status(400).json(error)
    }
    
    }
)



const PORT = process.env.PORT || 5000;

// start server

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
