import './App.css';
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import { useState, useEffect, lazy, Suspense, memo, useMemo } from 'react';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback } from 'react';

//Lazy load the Markdown component for performance optimization
const MarkdownHooks = lazy(() => import('react-markdown'));

const responseCache = new Map();

function App() {

  const [prompt, setprompt] = useState(`/* eg: review my code 
function sum() { return 1 + 1; } /*`);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prism.highlightAll();
  }, [])

  const codeReview = useCallback(async function codeReview(currentPrompt) {
    if(responseCache.has(currentPrompt)) {
      console.log("Cache hit for prompt:", currentPrompt);
      setResponse(responseCache.get(currentPrompt));
      setLoading(false);
      return;
    }
    setLoading(true);
    try { 
      const responseFromServerAi = await axios.post('https://bug-buster-v1.onrender.com/ai/get-reviewed', { prompt: currentPrompt });
      const { response } = responseFromServerAi.data;

      if(!response) {
        throw new Error("No message received from server");
      }

      //cache the rsponse for recording the previous prompts given by the user
      responseCache.set(currentPrompt, response);

      //update the state with the response
      setResponse(response);
      } catch(err) {
        console.error("Error in codeReview:", err);
        alert("An error occurred while processing your request. Please try again.");
        console.error("Error details:", err); 
      } finally {
        setLoading(false);
      }
  }, []);

  const codeReviewDebounced = useMemo(() => debounce(codeReview, 1000), [codeReview]);

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
            onClick={() => codeReviewDebounced(prompt)} 
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
