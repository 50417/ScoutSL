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
import "./modelMetricOptions.style.css";

export const ModelMetricOptions = ({
  setSearchText,
  handleOnSubmit,
  numbers_re,
}) => {
  const [blocks, setBlocks] = useState("");
  const [lines, setLines] = useState("");
  const [subsystems, setSubsystems] = useState("");
  const [maxDepth, setMaxDepth] = useState("");
  const [blockTypes, setBlockTypes] = useState([]);
  const [solver, setSolver] = useState("");
  const [simMode, setSimMode] = useState("");
  const [includeLibCount, setIncludeLibCount] = useState(false);
  const [codeGen, setCodeGen] = useState("");

  const [advancedSearchText, setAdvancedSearchText] = useState("");

  const block_categories = [
    "Conditional",
    "Continuous",
    "Custom",
    "Discontinuities",
    "Discrete",
    "Documentation",
    "Interface",
    "Logic",
    "Math",
    "Matrix Operations",
    "Messages & Events",
    "Model Verification",
    "Others",
    "Signal Attributes",
    "Signal Routing",
    "Sinks",
    "Sources",
    "String",
    "Structural",
    "Trigger",
  ];

  const handleAttributeChange = (e) => {
    const value = e.target.value;
    const attributeType = e.target.name;

    switch (attributeType) {
      case "blockAttribute":
        if (numbers_re.test(value)) {
          setBlocks(value);
        }
        break;
      case "lineAttribute":
        if (numbers_re.test(value)) {
          setLines(value);
        }
        break;
      case "subsystemsAttribute":
        if (numbers_re.test(value)) {
          setSubsystems(value);
        }
        break;
      case "maxDepthAttribute":
        if (numbers_re.test(value)) {
          setMaxDepth(value);
        }
        break;
      case "solverAttribute":
        setSolver(value);
        break;
      case "simAttribute":
        setSimMode(value);
        break;
      case "blockTypeAttribute":
        var selectedBlockTypesArr = [].slice
          .call(e.target.selectedOptions)
          .map((item) => item.value);
        setBlockTypes(selectedBlockTypesArr);
        break;
      case "includeLibCount":
        setIncludeLibCount(e.target.checked);
        break;
      case "codeGenAttribute":
        setCodeGen(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    var tmpAdvancedSearchText =
      (blocks.trim() !== "" ? "blocks:" + blocks : "") +
      (lines.trim() !== "" ? " lines:" + lines : "") +
      (subsystems.trim() !== "" ? " subsystems:" + subsystems : "") +
      (maxDepth.trim() !== "" ? " maxDepth:" + maxDepth : "") +
      (solver.trim() !== "" ? " solver:" + solver : "") +
      (simMode.trim() !== "" ? " simMode:" + simMode : "") +
      (codeGen.trim() !== "" ? " codeGen:" + codeGen : "") +
      (includeLibCount ? " inc_lib:true" : "");
    if (blockTypes.length > 0) {
      tmpAdvancedSearchText =
        tmpAdvancedSearchText + " blocktypes:" + blockTypes.join(",");
    }
    setAdvancedSearchText(tmpAdvancedSearchText);
    setSearchText(tmpAdvancedSearchText);
  }, [
    blocks,
    lines,
    subsystems,
    maxDepth,
    solver,
    simMode,
    blockTypes,
    includeLibCount,
    codeGen,
    setSearchText,
  ]);

  return (
    <Container>
      <Form
        autoComplete="off"
        onSubmit={(e) => handleOnSubmit(e, "modelmetric")}
      >
        <Form.Group as={Row} className="mb-5" controlId="formHorizontal-1">
          <Form.Label column>Simulink model with</Form.Label>
          <Col sm={6}>
            <Form.Control
              type="text"
              value={advancedSearchText}
              onChange={handleAttributeChange}
              disabled
              required
            />
          </Col>
          <Col sm={2} lg={3}>
            <Form.Group className="mt-2" controlId="formincludeLibCount-2">
              <Form.Check
                name="includeLibCount"
                value={includeLibCount}
                type="switch"
                id="custom-switch"
                label="include library blocks"
                onChange={handleAttributeChange}
                reverse
              />
            </Form.Group>
          </Col>
          <Col sm={1}>
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Group>

        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formblockAttribute-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of Simulink model blocks
                  </Tooltip>
                }
              >
                <Form.Label>
                  blocks
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="blockAttribute"
                type="text"
                value={blocks}
                placeholder="0..100,200,>1000"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formlineAttribute-4">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Number of connection lines connecting blocks
                  </Tooltip>
                }
              >
                <Form.Label>
                  signal lines
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="lineAttribute"
                type="text"
                value={lines}
                placeholder="0..100,200,>1000"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formsubsystemsAttribute-5">
              <Form.Label>subsystems</Form.Label>

              <Form.Control
                name="subsystemsAttribute"
                type="text"
                value={subsystems}
                placeholder="0..100,200,>1000"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formmaxDepthAttribute-1">
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    maximum subsystem hierarchy depth
                  </Tooltip>
                }
              >
                <Form.Label>
                  having this deep hierarchy
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="maxDepthAttribute"
                type="text"
                value={maxDepth}
                placeholder="0..10,4,<12"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group
              className="mt-3 mb-3"
              controlId="formblockTypeAttribute-1"
            >
              <OverlayTrigger
                placement="left"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Hold Ctrl to deselect/multiselect . <br></br>Block category.
                    Refer to paper
                  </Tooltip>
                }
              >
                <Form.Label>
                  block types
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="blockTypeAttribute"
                as="select"
                multiple
                value={blockTypes}
                onChange={handleAttributeChange}
              >
                {block_categories.map((block_category) => (
                  <option key={block_category} value={block_category}>
                    {block_category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formsolverAttribute-1">
              <Form.Label>solver</Form.Label>

              <Form.Control
                name="solverAttribute"
                as="select"
                className="form-select form-select-override"
                value={solver}
                onChange={handleAttributeChange}
              >
                <option value="">configured with any solver</option>
                <option value="Fixed-step">Fixed-step</option>
                <option value="Variable-step">Variable-step</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formsimAttribute-1">
              <Form.Label>simulation mode</Form.Label>

              <Form.Control
                name="simAttribute"
                className="form-select form-select-override"
                as="select"
                value={simMode}
                onChange={handleAttributeChange}
              >
                <option value="">configured with any simulation mode</option>
                <option value="normal">Normal</option>
                <option value="external">External</option>
                <option value="processor-in-the-loop (pil)">
                  Processor in the loop
                </option>
                <option value="accelerator">Accelerator</option>
                <option value="rapid-accelerator">Rapid Accelerator</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formcodeGenAttribute-1">
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Simulink block configured to generate native code. Refer to
                    paper for heuristic used
                  </Tooltip>
                }
              >
                <Form.Label>
                  code generation
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Form.Control
                name="codeGenAttribute"
                className="form-select form-select-override"
                as="select"
                value={codeGen}
                onChange={handleAttributeChange}
              >
                <option value="">--Select an option--</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

ModelMetricOptions.propTypes = {
  setSearchText: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  numbers_re: PropTypes.object.isRequired,
};
