import React from "react";
import PropTypes from "prop-types"; // ES6
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./searchbar.style.css";
import { useSelector } from "react-redux";
export const Searchbar = ({
  handleOnChange,
  handleOnSubmit,
  searchPageSwitcher,
  searchText,
}) => {
  const { isLoading } = useSelector((state) => state.queryResults);
  return (
    <Container>
      <Row>
        <Col>
          <Form
            className="search-form"
            autoComplete="off"
            onSubmit={handleOnSubmit}
          >
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    style={{ width: "400px" }}
                    type="text"
                    value={searchText}
                    placeholder="Type automotive to search for automotive Simulink projects"
                    onChange={handleOnChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="secondary" type="submit" disabled={isLoading}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>
            Use{" "}
            <a href="#!" onClick={() => searchPageSwitcher("advanced")}>
              Advanced Search
            </a>{" "}
            to search for Simulink projects specific to your needs
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

Searchbar.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  searchPageSwitcher: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
};
