import React, { useState } from "react";
import { Container, Row, Button, Modal, Col } from "react-bootstrap";
import "./header.style.css";
export const Header = () => {
  const [showCitation, setShowCitation] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showREADME, setShowREADME] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleCloseCitation = () => setShowCitation(false);
  const handleShowCitation = () => setShowCitation(true);

  const handleCloseAbout = () => setShowAbout(false);
  const handleShowAbout = () => setShowAbout(true);

  const handleCloseREADME = () => setShowREADME(false);
  const handleShowREADME = () => setShowREADME(true);

  const handleCloseHelp = () => setShowHelp(false);
  const handleShowHelp = () => setShowHelp(true);

  const bibtex = "@inproceedings{Shrestha23ScoutSL,";
  const bibtex_1 =
    "  author = {Sohil Lal Shrestha and Alexander Boll and Timo Kehrer and Christoph Csallner},";
  const bibtex_2 =
    "title = {{ScoutSL}: An Open-Source Simulink Search Engine},";
  const bibtex_3 =
    " booktitle = {2023 ACM/IEEE International Conference on Model Driven Engineering Languages and Systems Companion ({MODELS-C})},";
  const bibtex_4 = "  year = {2023},";
  const bibtex_5 = "  pages = {70--74},";
  const bibtex_6 = "  publisher = {IEEE},";
  const bibtex_7 = "}  ";
  const getFeedback = () => {
    const feedback_url = "https://forms.gle/JUyRSc2J9Ui715WT9";
    window.open(feedback_url, "_blank");
  };
  const goToVideo = () => {
    const video_url = "https://youtu.be/HwsHL8LrVCM";
    window.open(video_url, "_blank");
  };
  return (
    <Container>
      <Row>
        <Col style={{ display: "flex", justifyContent: "left" }}>
          <Button variant="light" onClick={handleShowAbout}>
            About
          </Button>

          <Modal show={showAbout} onHide={handleCloseAbout}>
            <Modal.Header closeButton>
              <Modal.Title>About</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Joint work of Software Engineering Research Center, University of
              Texas at Arlington and Software Engineering Group, University of
              Bern
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAbout}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseHelp}>
                Copy
              </Button>
            </Modal.Footer>
          </Modal>

          <Button variant="light" onClick={handleShowREADME}>
            README
          </Button>

          <Modal size="lg" show={showREADME} onHide={handleCloseREADME}>
            <Modal.Header closeButton>
              <Modal.Title>README</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Dear Simulink-Enthusiast! </p>
              <p>
                ScoutSL is a search engine for Simulink models and Simulink
                projects fitting your criteria. We think this can be useful, if
                you need Simulink models for your:
              </p>
              <ol>
                1. research
                <ol>a. to study Simulink modeling practice </ol>
                <ol>b. as experimental subjects for your empirical research</ol>
              </ol>
              <ol>2. teaching, e.g. to show concrete examples</ol>{" "}
              <ol>
                3. hobby, e.g. pre-made controls for your quadro-copter drone or
                LEGO robot
              </ol>
              <h2> Usage</h2> <h4> Keyword search </h4>
              <p>
                With the keyword search, you can find Simulink models or
                Simulink projects by topic. In the starting screen, you can
                input your keyword search like in any other search engine. After
                entering your keyword, ScoutSL presents a result list for your
                query. In each result's top row, the result homepage is linked
                in the top left, followed by a short description. The bottom row
                shows the license type, last update time, how many models are
                part of the project, a direct download link, and JSON-metadata
                of the project.
              </p>
              <p>
                You can combine different keywords, some keyword suggestions
                are: automotive, pacemaker, drone, wind turbine, solar power,
                pendulum.
              </p>
              <h4> Advanced Search </h4>
              <p>
                You can also click on "Advanced Search" to access the three
                advanced search modes. With the advanced search modes, you can
                find Simulink models or Simulink projects by model or project
                metrics or metadata.
              </p>
              <h5> Simulink model</h5>
              <p>
                Here, you can find Simulink models according to your needs, e.g.
                of a certain size or with a certain block set. Some suggestions
                are: &gt;10000 blocks, solver with variable-step, with code
                generation
              </p>
              <h5> Version controlled repository</h5>{" "}
              <p>
                Here, you can find Simulink projects according to your needs,
                e.g. of a certain number of commits, and contributors.{" "}
              </p>{" "}
              <p>
                Some suggestions are: &gt;100000 commits, &gt;100 contributors{" "}
              </p>{" "}
              <h5> GitHub/MATLAB Central project</h5>
              <p>
                Here, you can find Simulink projects according to your needs,
                e.g. with a certain license type, created after a certain date,
                etc.
              </p>
              <p> Some suggestions are: BSD 2 license, &gt; 4 stars</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseREADME}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            name="button-goToVideo"
            variant="light"
            onClick={() => goToVideo()}
          >
            Video Tutorial
          </Button>
        </Col>

        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="light" onClick={handleShowHelp}>
            Help
          </Button>

          <Modal show={showHelp} onHide={handleCloseHelp}>
            <Modal.Header closeButton>
              <Modal.Title>Supported Query Format</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Date Attributes</h4>
              <table stripped bordered hover variant="dark" size="xxl">
                <tr>
                  <th>Query </th>
                  <th>Find projects </th>
                </tr>
                <tr>
                  <td style={{ width: "50%" }}>2020-01-01..2022-01-01</td>
                  <td style={{ width: "50%" }}>
                    created between Jan 1st 2020 and Jan 1st 2022
                    (non-inclusive)
                  </td>
                </tr>
                <tr>
                  <td>&lt;2020-01-01</td>
                  <td>created before Jan 1st 2020</td>
                </tr>
                <tr>
                  <td>&gt;2020-01-01</td>
                  <td>created after Jan 1st 2020</td>
                </tr>
              </table>
              <br></br>
              <br></br>
              <h4>Numeric Attributes</h4>
              <table stripped bordered hover variant="dark" size="xxl">
                <tr>
                  <th>Query </th>
                  <th>Find model with blocks </th>
                </tr>
                <tr>
                  <td style={{ width: "55%" }}>10..200</td>
                  <td style={{ width: "50%" }}> between 10 and 200</td>
                </tr>
                <tr>
                  <td>&lt;200</td>
                  <td>less than 200</td>
                </tr>
                <tr>
                  <td>&gt;10 </td>
                  <td>greater than 10</td>
                </tr>
                <tr>
                  <td>10 </td>
                  <td>equal to 10</td>
                </tr>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseHelp}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col style={{ display: "flex", justifyContent: "right" }}>
          <Button
            name="button-getFeedback"
            variant="light"
            onClick={() => getFeedback()}
            className="getFeedbackdButton"
          >
            Got Feedback?
          </Button>
          <Button variant="light" onClick={handleShowCitation}>
            Cite as
          </Button>
          <Modal show={showCitation} onHide={handleCloseCitation}>
            <Modal.Header closeButton>
              <Modal.Title>Cite as</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {bibtex}
                <br></br>
                &nbsp; &nbsp;{bibtex_1}
                <br></br>
                &nbsp; &nbsp;{bibtex_2}
                <br></br>
                &nbsp; &nbsp;{bibtex_3}
                <br></br>
                &nbsp; &nbsp;{bibtex_4}
                <br></br>
                &nbsp; &nbsp;{bibtex_5}
                <br></br>
                &nbsp; &nbsp;{bibtex_6}
                <br></br>
                &nbsp; &nbsp;{bibtex_7}
                <br></br>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCitation}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseCitation}>
                Copy
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};
