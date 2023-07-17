import React from "react";
import { Tab, Tabs, Container, Row, Col } from "react-bootstrap";
import { ModelMetricOptions } from "../model-metric-search-options/ModelMetricOptions.comp";
import { ProjectCommitSearchOptions } from "../project-commit-search-options/ProjectCommitSearchOptions.comp";
import { RepoAttributeSearchOptions } from "../repo-attribute-search-options/RepoAttributeSearchOptions.comp";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { resetSearchResult } from "../../pages/search-result/searchResultAction";
export const MultiTabAdvancedSearch = ({
  searchPageSwitcher,
  setSearchText,
  handleOnSubmit,
  numbers_re,
  date_re,
}) => {
  const dispatch = useDispatch();
  const onChange = () => {
    dispatch(resetSearchResult());
  };
  return (
    <Container>
      <Row>
        <Col>
          Go back to{" "}
          <a href="#!" onClick={() => searchPageSwitcher("basic")}>
            Simple Search
          </a>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="mb-3"
        unmountOnExit
        fill
        onSelect={onChange}
      >
        <Tab eventKey="metricSearch" title="Simulink model">
          <ModelMetricOptions
            setSearchText={setSearchText}
            handleOnSubmit={handleOnSubmit}
            numbers_re={numbers_re}
          />
        </Tab>
        <Tab eventKey="commitSearch" title="Version controlled repository">
          <ProjectCommitSearchOptions
            setSearchText={setSearchText}
            handleOnSubmit={handleOnSubmit}
            numbers_re={numbers_re}
          />
        </Tab>
        <Tab eventKey="repoSearch" title="GitHub/MATLAB Central project">
          <RepoAttributeSearchOptions
            setSearchText={setSearchText}
            handleOnSubmit={handleOnSubmit}
            numbers_re={numbers_re}
            date_re={date_re}
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

MultiTabAdvancedSearch.propTypes = {
  searchPageSwitcher: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  numbers_re: PropTypes.object.isRequired,
  date_re: PropTypes.object.isRequired,
};
