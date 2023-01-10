import { useState } from 'react'
import './App.css';
const axios = require('axios');

export default function Home(){
// 
    const [query, setQuery] = useState('What is the capital of France')
    const [reply, setReply] = useState('')

    // const token = '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'

    // function submit() {
    //     axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //             }
    //       })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // }

    async function submit() {
        setReply("Loading...")
        const apiUrl = 'http://localhost:5000/query';
        // const apiKey = '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';
      
        let response = await axios({
          method: 'post',
          url: apiUrl,
          data: {
            prompt: query,
            max_tokens: 4000,
          }
        });
        console.log(response.data);
        setReply(response.data)
      }

    return(
        <div className="main">
            {/* <input id="input" type="text"></input> */}
            <textarea id="input" rows="15" cols="50"  onInput={e => setQuery(e.target.value)} ></textarea>
            <input className="button" type="button" value="Submit" onClick={() => submit()}/>
            <pre id="reply">{reply}</pre>
        </div>
    )
}