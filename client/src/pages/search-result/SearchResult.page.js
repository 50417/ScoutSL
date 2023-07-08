import React from "react";
//import { useDispatch } from "react-redux";
//import { fetchSearchResult } from "./searchResultAction";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { SearchResultTable } from "../../components/search-result-table/SearchResultTable.comp";
import { useSelector } from "react-redux";
export const SearchResult = ({ fetchedSearchQuery }) => {
  const { queryResults, isLoading, error } = useSelector(
    (state) => state.queryResults
  );
  if (isLoading)
    return (
      <>
        <span className="sr-only">Searching over 100k+ models...</span>
        <Spinner animation="border" variant="primary"></Spinner>
      </>
    );
  if (error) {
    //console.log(error);
    return (
      <Alert>
        Oops! Something went wrong with your input. Please double-check and try
        again
      </Alert>
    );
  }
  if (queryResults !== undefined && queryResults.length === 0)
    return (
      <Alert>
        Sorry, we did not find a project matching your search criteria
      </Alert>
    );
  return (
    <>
      {" "}
      <Container style={{ width: "90%" }}>
        {queryResults !== undefined && queryResults.length ? (
          <Row>
            <Col style={{ display: "flex", justifyContent: "left" }} md={2}>
              {queryResults.length + " "} results
            </Col>
            <Col
              style={{ justifyContent: "center" }}
              className="text-truncate"
              md={8}
            >
              Search Query: {fetchedSearchQuery}
            </Col>
            <Col style={{ display: "flex", justifyContent: "right" }} md={2}>
              <SearchForm />
            </Col>
            <SearchResultTable />
          </Row>
        ) : (
          <Row></Row>
        )}
      </Container>
    </>
  );
};
