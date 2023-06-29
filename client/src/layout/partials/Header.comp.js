import React, { useState } from "react";
import { Container, Row, Button, Modal, Col } from "react-bootstrap";
export const Header = () => {
  const [showCitation, setShowCitation] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleCloseCitation = () => setShowCitation(false);
  const handleShowCitation = () => setShowCitation(true);

  const handleCloseAbout = () => setShowAbout(false);
  const handleShowAbout = () => setShowAbout(true);

  const bibtex =
    "@inproceedings{XX,\nauthor    = {XX}, \ntitle     = {XX},\nbooktitle = {XX},\npages     = {XX},\npublisher = {{XX}},\nyear      = {XX}}";
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
              <Button variant="primary" onClick={handleCloseAbout}>
                Copy
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col style={{ display: "flex", justifyContent: "right" }}>
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
