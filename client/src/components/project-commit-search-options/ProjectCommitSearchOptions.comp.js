import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ES6
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

export const ProjectCommitSearchOptions = ({
  handleOnSubmit,
  setSearchText,
  numbers_re,
}) => {
  //TODO: Refactor using object state and form name attribute later
  const { isLoading } = useSelector((state) => state.queryResults);
  const [issue, setIssue] = useState("");
  const [pr, setPR] = useState("");
  const [commit, setCommit] = useState("");
  const [modelCommit, setModelCommit] = useState("");

  const [contributor, setContributor] = useState("");
  const [modelcontributor, setModelContributor] = useState("");

  const [modelRevision, setModelRevision] = useState("");
  const [perModelContributor, setPerModelContributor] = useState("");

  const [advancedSearchText, setAdvancedSearchText] = useState("");

  const handleAttributeChange = (e) => {
    const value = e.target.value;
    const attributeType = e.target.name;
    //console.log(attributeType);
    switch (attributeType) {
      case "issueAttribute":
        if (numbers_re.test(value)) {
          setIssue(value);
        }
        break;
      case "prAttribute":
        if (numbers_re.test(value)) {
          setPR(value);
        }
        break;
      case "commitAttribute":
        if (numbers_re.test(value)) {
          setCommit(value);
        }
        break;
      case "modelCommitAttribute":
        if (numbers_re.test(value)) {
          setModelCommit(value);
        }
        break;
      case "contributorAttribute":
        if (numbers_re.test(value)) {
          setContributor(value);
        }
        break;
      case "modelcontributorAttribute":
        if (numbers_re.test(value)) {
          setModelContributor(value);
        }
        break;
      case "modelRevisionAttribute":
        if (numbers_re.test(value)) {
          setModelRevision(value);
        }
        break;
      case "perModelContributorAttribute":
        if (numbers_re.test(value)) {
          setPerModelContributor(value);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    var tmpAdvancedSearchText =
      (issue.trim() !== "" ? "issue:" + issue : "") +
      (pr.trim() !== "" ? " pr:" + pr : "") +
      (commit.trim() !== "" ? " commit:" + commit : "") +
      (modelCommit.trim() !== "" ? " modelCommit:" + modelCommit : "") +
      (contributor.trim() !== "" ? " contributor:" + contributor : "") +
      (modelcontributor.trim() !== ""
        ? " modelcontributor:" + modelcontributor
        : "") +
      (modelRevision.trim() !== "" ? " modelRevision:" + modelRevision : "") +
      (perModelContributor.trim() !== ""
        ? " perModelContributor:" + perModelContributor
        : "");

    setAdvancedSearchText(tmpAdvancedSearchText);
    setSearchText(tmpAdvancedSearchText);
  }, [
    issue,
    pr,
    commit,
    modelCommit,
    contributor,
    modelcontributor,
    modelRevision,
    perModelContributor,
    setSearchText,
  ]);

  return (
    <Container>
      <Form
        autoComplete="off"
        onSubmit={(e) => handleOnSubmit(e, "commitMetric")}
      >
        <Form.Group as={Row} className="mb-5" controlId="formHorizontal-1">
          <Form.Label column sm={2}>
            VC Repo with
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              value={advancedSearchText}
              onChange={handleAttributeChange}
              disabled
              required
            />
          </Col>
          <Col sm={2}>
            <Button variant="secondary" type="submit" disabled={isLoading}>
              Search
            </Button>
          </Col>
        </Form.Group>

        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formissueAttribute-3">
              <Form.Label>issues</Form.Label>

              <Form.Control
                name="issueAttribute"
                type="text"
                value={issue}
                placeholder="25..50,10,>100 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formprAttribute-4">
              <Form.Label>pull requests</Form.Label>

              <Form.Control
                name="prAttribute"
                type="text"
                value={pr}
                placeholder="10..50,10,>25 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formcommitAttribute-5">
              <Form.Label>commits</Form.Label>
              <Form.Control
                name="commitAttribute"
                type="text"
                value={commit}
                placeholder="0..100,200,>1000 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formcontributorAttribute-6">
              <Form.Label>contributors</Form.Label>

              <Form.Control
                name="contributorAttribute"
                type="text"
                value={contributor}
                placeholder="0..5,>3 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formmodelCommitAttribute-7">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of commits that make change to any model file in the
                    project
                  </Tooltip>
                }
              >
                <Form.Label>
                  model commits
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="modelCommitAttribute"
                type="text"
                value={modelCommit}
                placeholder="0..10, <20 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group
              className="mt-3 mb-3"
              controlId="formHmodelcontributorAttribute-8"
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of contributors that make change to any model file in
                    the project
                  </Tooltip>
                }
              >
                <Form.Label>
                  model contributors
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="modelcontributorAttribute"
                type="text"
                value={modelcontributor}
                placeholder="0..5,>2 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group
              className="mt-3 mb-3"
              controlId="formmodelRevisionAttribute-8"
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of commits on the model file
                  </Tooltip>
                }
              >
                <Form.Label>
                  model revision
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="modelRevisionAttribute"
                type="text"
                value={modelRevision}
                placeholder="0..20,>5 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group
              className="mt-3 mb-3"
              controlId="formperModelcontributor-8"
            >
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of contributors working on the model file
                  </Tooltip>
                }
              >
                <Form.Label>
                  model file-specific contributor
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="perModelContributorAttribute"
                type="text"
                value={perModelContributor}
                placeholder="0..5,>2 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

ProjectCommitSearchOptions.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  numbers_re: PropTypes.object.isRequired,
};
