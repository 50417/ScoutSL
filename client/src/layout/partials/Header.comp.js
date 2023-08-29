import React, { useState } from "react";
import { Container, Row, Button, Modal, Col } from "react-bootstrap";
import "./header.style.css";
export const Header = () => {
  const [showCitation, setShowCitation] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleCloseCitation = () => setShowCitation(false);
  const handleShowCitation = () => setShowCitation(true);

  const handleCloseAbout = () => setShowAbout(false);
  const handleShowAbout = () => setShowAbout(true);

  const handleCloseHelp = () => setShowHelp(false);
  const handleShowHelp = () => setShowHelp(true);

  const bibtex =
    "@inproceedings{XX,\nauthor    = {XX}, \ntitle     = {XX},\nbooktitle = {XX},\npages     = {XX},\npublisher = {{XX}},\nyear      = {XX}}";
  const getFeedback = () => {
    const feedback_url = "https://forms.gle/JUyRSc2J9Ui715WT9";
    window.open(feedback_url, "_blank");
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
            <Modal.Body>{bibtex}</Modal.Body>
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
