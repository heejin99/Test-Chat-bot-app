import Axios from 'axios';
import React from 'react';

function Chatbot() {

    const textQuery = async (text) => {
        
        // First : Need to take care of the message I sent 
        let conversation = {
            who: 'user', 
            content: {
                text:  {
                    text : text
                }
            }
        }
        // Second : We need to tkae care of the mssage Chatbot sent
        
        const textQueryVariables = {
            text // text : text
        }

        try {
            // I will send request to the textQuery Route
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            const content = response.data.fulfillmentMessages[0]

            conversation= {
                who: 'bot', 
                content: content
            }

            console.log(conversation)
            
        } catch (error) {
            conversation = {
                who: 'bot', 
                content: {
                    text:  {
                        text : "Error just occured, please check the problem"
                    }
                }
            }
            console.log(conversation)
        }
    }

    const keyPressHandler = (e) => {
        if (e.key === "Enter") {
            if (!e.target.value) {
                return alert('you need to type something first')
            }
            // We will send request to text query route
            textQuery(e.target.value)

            e.target.value = "";
        }
    }
    return (
        <div style={{ 
            height : 700, width : 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto'}}>

            </div>
            <input
                style={{
                    margin: 0, width: '100%', height:50,
                    borderRadius: '4px', padding: '5px', fontsize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />
        </div>
    )
}

export default Chatbot;