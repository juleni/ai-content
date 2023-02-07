import "./App.css";

import { Configuration, OpenAIApi } from "openai";
import { useEffect, useRef, useState } from "react";

function App() {
  const [configuration, setConfiguration] = useState();
  const [generatedResponse, setGeneratedResponse] = useState("");

  const inputTextRef = useRef(null);

  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    setConfiguration(
      new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY, // "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",
      })
    );
  }, []);

  function generate1() {}

  function generate() {
    setGeneratedResponse("generujem báseň ... ");
    console.log(inputTextRef.current.value);
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Napíš slovenskú básničku o: ${inputTextRef.current.value}`,
        temperature: 0.8,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        const generatedText = response.data.choices[0].text;
        setGeneratedResponse(generatedText);
      });

    return generatedResponse;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="title">
          <h1>ꀎ꒐ ꍌꏹꋊꏹꋪꁲꋖꂦꋪ</h1>
        </div>

        <div className="input-wrapper">
          <div className="label-input">&nbsp;Vygeneruj báseň o:</div>
          <input
            className="input-field"
            id="inputId"
            type="text"
            ref={inputTextRef}
          />
        </div>

        <div className="input-button">
          <button className="generate-btn" onClick={generate}>
            ꍌ ꏂ ꂚ ꏂ ꋪ ꀎ ꒻
          </button>
        </div>

        <div className="generated-text">
          <textarea
            readOnly
            value={generatedResponse}
            cols={58}
            rows={23}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
