import './App.css'
import Prism from "prismjs"
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript";
import { useState, useEffect, lazy, Suspense, memo } from 'react'
// import { MarkdownHooks } from 'react-markdown'
import rehypeStarryNight from 'rehype-starry-night'
import rehypeRaw from 'rehype-raw';
import axios from 'axios';

//Lazy load the Markdown component for performance optimization
const MarkdownHooks = lazy(() => import('react-markdown'));

const responseCache = new Map();

function App() {

  const [prompt, setprompt] = useState(`function sum() { return 1 + 1; }`);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prism.highlightAll();
  }, [])

  async function codeReview() {
    if(responseCache.has(prompt)) {
      console.log("Cache hit for prompt:", prompt);
      setResponse(responseCache.get(prompt));
      setLoading(false);
      return;
    }
    setLoading(true);
    try { 
      // const responseFromServerAi = await axios.post('https://bug-buster-v1.onrender.com/ai/get-reviewed', { prompt })
      // const { response } = responseFromServerAi.data;
      // console.log("responseFromServerAi.data:", responseFromServerAi.data);
      // if( !response ) {
      //   throw new Error("No message received from server");
      const responseFromServerAi = await axios.post('https://bug-buster-v1.onrender.com/ai/get-reviewed', { prompt });
      const { response } = responseFromServerAi.data;

      if(!response) {
        throw new Error("No message received from server");
      }

      //cache the rsponse for recording the previous prompts given by the user
      responseCache.set(prompt, response);

      //update the state with the response
      setResponse(response);
      } catch(err) {
        console.error("Error in codeReview:", err);
        alert("An error occurred while processing your request. Please try again.");
        console.error("Error details:", err); 
      } finally {
        setLoading(false);
      }
  }

  const Loader = memo(() => {
    return(
      <div className="Loader">
        <div className="spinner">
          <div>
            <p>Reviewing your code...</p>
          </div>
        </div>
    </div>
    )
  });

  const RenderReviewedCode = memo(({ response }) => {
    return (
      <Suspense fallback={<Loader />}>
        <MarkdownHooks rehypePlugins={[rehypeStarryNight, rehypeRaw]}>
          {response}
        </MarkdownHooks>
      </Suspense>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.response === nextProps.response;
  // Only re-render if the response prop has changed
  // This prevents unnecessary re-renders and improves performance
  }
);

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

        { loading ? (
          <Loader />
        ) : ( 
          <RenderReviewedCode response = { response } />
        )}
        </div>
      </main>
  );
}

export default App;
