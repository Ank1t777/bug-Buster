import './App.css';
import Prism from 'prismjs'
import { useState, lazy, Suspense, memo, useMemo, useCallback, useRef, useEffect } from 'react';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
//import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import debounce from 'lodash/debounce';
// import 'highlight.js/styles/atom-one-light.css';
import rehypeRaw from 'rehype-raw';
import rehypeStarryNight from 'rehype-starry-night';
const Editor = lazy(() => import("react-simple-code-editor"));
const MarkdownHooks = lazy(() => import('react-markdown'));



function App() {
  const [prompt, setPrompt] = useState(`/* eg: review my code 
function sum() { return 1 + 1; } */`);
  const [response, setResponse] = useState("");
  const [customLanguage, setCustomLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const supportedLanguages = ['javascript', 'python', 'java', 'typescript', 'rust'];
  const [showCustomInput, setShowCustomInput] = useState(false);
  const customInputRef = useRef(null);
  const importedLanguages = useRef({});
  const [language, setLanguage] = useState('javascript');
  const [rehypePlugins, setRehypePlugins] = useState([]);


  useEffect(() => {

    const initializeRehypePlugins = async () => {
      const starryNight = await rehypeStarryNight();
      setRehypePlugins([rehypeRaw, starryNight]);
    };

    initializeRehypePlugins();

  const langToLoad = language === 'custom' ? customLanguage : language;

  if(!langToLoad || importedLanguages.current[langToLoad]) {
    return;
  }
   import(`prismjs/components/prism-${langToLoad}.js`)
    .then(() => {
      importedLanguages.current[langToLoad] = true;
      console.log(`${langToLoad} loaded`);
    })
    .catch(() => {
      console.warn(`Could not load: ${langToLoad}`);
    });
}, [language, customLanguage]);
  //const [rehypePlugins, setRehypePlugins] = useState([rehypeRaw]);

  // Initialize rehype plugins with Starry Night
  // useEffect(() => {
  //   const initializeRehypePlugins = async () => {
  //     const starryNightPlugin = await rehypeStarryNight();
  //     setRehypePlugins([rehypeRaw, starryNightPlugin]);
  //   };
  //   initializeRehypePlugins();
  //   console.log(Prism);
  // }, []);

  // Function to handle code review
  const codeReview = useCallback(async (currentPrompt) => {
    setLoading(true);
    try {
      const responseFromServerAi = await axios.post('https://bug-buster-v1.onrender.com/ai/get-reviewed', { prompt: currentPrompt });
      const { response } = responseFromServerAi.data;

      if (!response) {
        throw new Error("No message received from server");
      }

      setResponse(response);
    } catch (err) {
      console.error("Error in codeReview:", err);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelectLanguage = (e) => {
  const selectedLanguage = e.target.value;
  setLanguage(selectedLanguage);

  if (selectedLanguage === "custom") {
    setShowCustomInput(true);
    setPrompt(`Enter your code in ${customLanguage} language`);
    setCustomLanguage('');
    setTimeout(() => customInputRef.current?.focus(), 0);
  } else {
    setShowCustomInput(false);
    setCustomLanguage('');

    // Optionally prefill prompt
    switch (selectedLanguage) {
      case 'javascript':
        setPrompt(`/* eg: review my code function sum() { return 1 + 1; } */`);
        break;
      case 'python':
        setPrompt(`/* eg: review my code def sum(): return 1 + 1 */`);
        break;
      case 'java':
        setPrompt(`/* eg: review my code public class Main { public static void main(String[] args) { System.out.println("Hello World"); } } */`);
        break;
      case 'typescript':
        setPrompt(`/* eg: review my code function sum(): number { return 1 + 1; } */`);
        break;
      case 'rust':
        setPrompt(`/* eg: review my code fn main() { println!("Hello, world!"); } */`);
        break;
    }
  }
};


  const applySelectedLanguage = () => {
    if(customLanguage.trim()) {
      setLanguage(customLanguage.trim());
      showCustomInput(false);
    }
  }

  const onEnterKey = (e) => {
    if(e.key === 'Enter') {
      applySelectedLanguage();
    }
  }

  // Debounced version of the code review function
  const codeReviewDebounced = useMemo(() => debounce(codeReview, 1000), [codeReview]);

  // Loader component
  const Loader = memo(() => (
    <div className="Loader">
      <div className="spinner">
      </div>
      <p>Reviewing your code...</p>
    </div>
  ));

  // Component to render the reviewed code
  const RenderReviewedCode = memo(({ response }) => (
    <Suspense fallback={<Loader />}>
      {/* <MarkdownHooks rehypePlugins={rehypePlugins}> */}
        <MarkdownHooks rehypePlugins={[rehypePlugins]}>
        {response}
      </MarkdownHooks>
    </Suspense>
  ), (prevProps, nextProps) => prevProps.response === nextProps.response);

  return (
    <main>
      <div className="left--panel">
        <div className="prompt">
          <Suspense fallback={<Loader />}>
            <Editor
              value={prompt}
              onValueChange={(code) => setPrompt(code || '')}
              highlight={(code) => {
                const lang = language === "custom" ? customLanguage : language;
                const grammar = Prism.languages[lang] || Prism.languages.javascript;
                return Prism.highlight(code, grammar, lang);
              }}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "#282c34",
                color: "#ffffff"
              }}
            />
          </Suspense>
        </div>
        <div className="supported--languages">
              <select onChange = {handleSelectLanguage} className="select--language">
                {
                  supportedLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))
                }
                <option key="custom" value="custom">Other</option>
              </select>

              {
                  showCustomInput && (
                    <div className="custom--lang--wrapper">
                      <input
                        type="text"
                        placeholder="Enter languguage"
                        value={customLanguage}
                        onChange={(e) => setCustomLanguage(e.target.value)}
                        className="custom--input"
                        onKeyDown={(e) => { onEnterKey(e)}
                        }
                      />
                      <button
                        className="apply--custom--lang"
                        onClick={applySelectedLanguage}
                        >
                        Apply
                      </button>
                    </div>
                  )
                }
        </div>

        <div
          onClick={() => codeReviewDebounced(prompt)}
          className="review--button"
        >
          Review
        </div>
      </div>
      <div className="right--panel">
        {loading ? <Loader /> : <RenderReviewedCode response={response} />}
      </div>
    </main>
  );
}

export default App;