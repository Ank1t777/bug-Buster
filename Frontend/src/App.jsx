import './App.css'
import Prism from "prismjs"
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript";
import { useState, useEffect } from 'react'
import axios from 'axios';

function App() {

  const [codeSnippet, setCodeSnippet] = useState(`function sum() { return 1 + 1; }`);

  useEffect(() => {
    Prism.highlightAll();
  }, [])

  async function codeReview() {
    const response = axios.post('http://localhost:3000/ai/get-reviewed', { codeSnippet})
    console.log(response.data)
  }

  return (
      <main>
        <div className="left--panel">
          <div className="prompt">
           <Editor
              value={codeSnippet}
              onValueChange={code => setCodeSnippet(code)}
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
        </div>
      </main>
  )
}

export default App
