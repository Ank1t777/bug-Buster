import './App.css'
import Prism from "prismjs"
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript";
import { useState, useEffect } from 'react'
import {MarkdownHooks} from 'react-markdown'
import rehypeStarryNight from 'rehype-starry-night'
import axios from 'axios';

function App() {

  const [prompt, setprompt] = useState(`function sum() { return 1 + 1; }`);
  const [response, setResponse] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, [])

  async function codeReview() {
    try {
      const responseFromServerAi = await axios.post('http://localhost:3000/ai/get-reviewed', { prompt })
      console.log(responseFromServerAi.data.response);
      setResponse(responseFromServerAi.data.response);
    } catch(err) {
      console.error("Error in codeReview:", err);
      alert("An error occurred while processing your request. Please try again.");
      console.error("Error details:", err); 
    }
  }

  return (
      <main>
        <div className="left--panel">
          <div className="prompt">
           <Editor
              value={prompt}
              onValueChange={code => setprompt(code)}
              highlight={code => Prism.highlight(code, Prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "#282c34",
                color: "#ffffff"
              }}
           />
          </div>
          <div
            onClick={codeReview} 
            className="review--button">
              Review
          </div>
        </div>
        <div className="right--panel">

        <MarkdownHooks 
          rehypePlugins={[rehypeStarryNight]}>
            {response}
        </MarkdownHooks>
        </div>
      </main>
  )
}

export default App
