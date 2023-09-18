import React, { useState } from 'react';
import axios from 'axios';
import gptConfig from "./config/GPTConfig.jsx"

function safeParse(assistantReply){
    try {
       return JSON.parse(assistantReply); 
    } catch (error) {
        var defaultValue = { 
            "emotion":{ 
                "fun": 0,
                "shyness": 0,
                "anger": 0,
                "sad": 0
            },
            "message": "Sorry, there was an error processing the response."
            };
        return defaultValue;
    }
}

function App() {
    const [userInput, setUserInput] = useState('');
    const [conversations, setConversations] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newConversations = [...conversations, { role: 'user', content: userInput }];

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [
                  {"role": "system", "content": gptConfig
                },
                  {"role": "user", "content":userInput}
                ],
            }, {
              headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
            });

            var assistantReply = response.data.choices[0].message.content;
            var jsonAssistantReply = safeParse(assistantReply);
            console.log(jsonAssistantReply);
            console.log (jsonAssistantReply.emotion);
            console.log (jsonAssistantReply.message);

            setConversations([...newConversations, { role: 'assistant', content: JSON.stringify(jsonAssistantReply.message) }]);
            setUserInput('');
        } catch (error) {
            console.error("There was an error while fetching the reply:", error);
            console.error("Error details:", {
                message: error.message,
                status: error.response ? error.response.status : null,
                data: error.response ? error.response.data : null,
            });
        }
    };

    return (
        <div className="App">
            <div className="conversations">
                {conversations.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                       {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;
