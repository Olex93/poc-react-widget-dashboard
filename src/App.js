import "./App.css";
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  const zoidScript =
    "<script src='http://krakenjs.com/zoid/dist/zoid.frameworks.js'></script>";
  const chatContainer =
    "<div id='container' style='width: 300px; height: 500px; position: fixed; bottom: 0; right: 5%'></div>";
  const topBarContainer =
    "<div id='container' style='width: 100%; height: 50px; position: fixed; top: 0; left: 0'></div>";
  const footerContainer =
    "<div id='container' style='width: 100%; height: 100px; margin-bottom: -100px ; position: fixed; bottom: 0; left: 0'></div>";
  const iframeContainer =
    "div id='container' style='width: 100%; height: 100%'></div>";

  const [highlightColor, setHighlightColor] = React.useState("#953021");
  const [backgroundColor, setBackgroundColor] = React.useState("#ededed");
  const [companyName, setCompanyName] = React.useState("Fourleaf");
  const [widgetType, setWidgetType] = React.useState("chatBox");
  const [selectedContainer, setSelectedContainer] =
    React.useState(chatContainer);
  const [showScript, setShowScript] = React.useState(false);

  // URL STRING FOR LIVE
  // url: 'https://poc-react-widget.netlify.app/',

  const widgetScript = `<script>
  const MyWidget = zoid.create({
    tag: "my-widget",
    url: 'http://localhost:3000/index.html',
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

  function controlWidgetPositioning(value) {
    setWidgetType(value);
    if (value === "chatBox") {
      setSelectedContainer(chatContainer);
    }
    if (value === "topBar") {
      setSelectedContainer(topBarContainer);
    }
    if (value === "footer") {
      setSelectedContainer(footerContainer);
    }
    if (value === "iframeEmbed") {
      setSelectedContainer(iframeContainer);
    }
  }

  function generateCode() {
    setShowScript(true);
  }

  return (
    <Container className="App my-4">
    <Row className="mb-4">
      <Col>
      <h1 className="mb-3">Hey!</h1>
      <p className="mb-2">Let's generate your widget embed code.</p>
      <p className="mb-2">Fll in the fields below then click on the button to generate an embed code that you can use to install the widget on your web pages.</p>
      </Col>
    </Row>

      <h2 className="mb-3">Define your options</h2>
      <Form>
        <Row>
          <Col className="mt-3">
            <Form.Label for="backgroundColor">
              Choose a background color
            </Form.Label>
            <input
              id="highlightColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <Form.Label for="highlightColor">
              Choose a highlight color:
            </Form.Label>
            <input
              id="highlightColor"
              type="color"
              value={highlightColor}
              onChange={(e) => setHighlightColor(e.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <Form.Label for="companyName">
              What is your company name?
            </Form.Label>
            <input
              id="companyName"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col className="mt-3">
            <Form.Label for="widgetPosition">
              What type of widget would you like to use?
            </Form.Label>
            <select
              type="text"
              value={widgetType}
              onChange={(e) => controlWidgetPositioning(e.target.value)}
            >
              <option value="chatBox">Chat box modal</option>
              <option value="topBar">Top bar modal</option>
              <option value="footer">Footer modal</option>
              <option value="iframeEmbed">iFrame embed</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              className="mt-4"
              onClick={(event) => {
                event.preventDefault();
                generateCode();
              }}
            >
              Generate your embed script
            </Button>
          </Col>
        </Row>
      </Form>

      {showScript === true && (
        <Row className="mt-4">
          <Col>
            <h3 className="mb-3">Here is your script tag</h3>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {widgetType === "chatBox" && (
                  <strong>
                    Insert the Chatbox embed code anywhere into the body of your
                    HTML document.
                  </strong>
                )}
                {widgetType === "topBar" && (
                  <strong>
                    Insert the Topbar embed code anywhere into the body of your
                    HTML document.
                  </strong>
                )}
                {widgetType === "footer" && (
                  <>
                    <strong>
                      Insert the Footer embed code at the end of your HTML file
                      just before the closing body tag.
                    </strong>
                    <br></br>
                    <strong>
                      NOTE: for the widget to display correctly, the body in
                      your HTML document must be set to position: relative.
                    </strong>
                  </>
                )}
                {widgetType === "iframeEmbed" && (
                  <strong>
                    Insert the iFrame embed code into the required container in
                    your HTML file. Note, the container for your embed code must
                    have set height and width attributes.
                  </strong>
                )}
              </Col>
            </Row>
            <div style={{ backgroundColor: "rgba(230,230,230)" }}>
              <code class="codeText">{zoidScript}</code>
              <code class="codeText">{selectedContainer}</code>
              <code class="codeText">{widgetScript}</code>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
