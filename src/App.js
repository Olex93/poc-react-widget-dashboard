import "./App.css";
import React from "react";

function App() {
  const [highlightColor, setHighlightColor] = React.useState("#953021");
  const [backgroundColor, setBackgroundColor] = React.useState("#ededed");
  const [companyName, setCompanyName] = React.useState("Fourleaf");
  const [widgetType, setWidgetType] = React.useState("chatBox");
  const [showScript, setShowScript] = React.useState(false);

  const zoidScript =
    "<script src='http://krakenjs.com/zoid/dist/zoid.frameworks.js'></script>";
  const chatContainer =
    "<div id='container' style='width: 300px; height: 500px; position: fixed; bottom: 0; right: 5%'></div>";

  const widgetScript = `<script>
  const MyWidget = zoid.create({
    tag: "my-widget",
    url: 'https://poc-react-widget.netlify.app/',
    dimensions: {
      width: "100%",
      height: "100%",
    },
  });
  const element = "#container";
  const options = {
    highlightColor: '${highlightColor}',
    backgroundColor: '${backgroundColor}',
    companyName: '${companyName}',
    widgetType: '${widgetType}',
    changeColor: (setColor, color) => {
      setColor(color)
    }
  };
  MyWidget(options).render(element);</script>`;

  function generateCode() {
    setShowScript(true);
  }

  return (
    <div className="App">
      <h1>Define your options</h1>
      <form>
        <label for="highlightColor">Choose a highlight color:</label>
        <input
          id="highlightColor"
          type="color"
          value={highlightColor}
          onChange={(e) => setHighlightColor(e.target.value)}
        ></input>
        <label for="backgroundColor">Choose a background color</label>
        <input
          id="highlightColor"
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        ></input>
        <label for="companyName">What is your company name?</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        ></input>
        <label for="widgetPosition">
          What type of widget would you like to use?
        </label>
        <select
          type="text"
          value={widgetType}
          onChange={(e) => setWidgetType(e.target.value)}
        >
          <option value="chatBox">Chat box</option>
        </select>
        <button onClick={(event) => {
          event.preventDefault();
          generateCode()
        }}>
          Generate your embed script
        </button>
      </form>

      {showScript === true && (
        <div>
          <h2>Here is your script tag</h2>
          <code class="codeText">{zoidScript}</code>
          <code class="codeText">{chatContainer}</code>
          <code class="codeText">{widgetScript}</code>
        </div>
      )}
    </div>
  );
}

export default App;
