import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ES6
import Select from "react-select";
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
import { useSelector } from "react-redux";

export const ModelMetricOptions = ({
  setSearchText,
  handleOnSubmit,
  numbers_re,
}) => {
  const { isLoading } = useSelector((state) => state.queryResults);
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

  const block_categories_map = [
    { value: "Conditional", label: "Conditional" },
    { value: "Continuous", label: "Continuous" },
    { value: "Custom", label: "Custom" },
    { value: "Discontinuities", label: "Discontinuities" },
    { value: "Discrete", label: "Discrete" },
    { value: "Documentation", label: "Documentation" },
    { value: "Interface", label: "Interface" },
    { value: "Logic", label: "Logic" },
    { value: "Math", label: "Math" },
    { value: "Matrix Operations", label: "Matrix Operations" },
    { value: "Messages & Events", label: "Messages & Events" },
    { value: "Model Verification", label: "Model Verification" },
    { value: "Others", label: "Others" },
    { value: "Signal Attributes", label: "Signal Attributes" },
    { value: "Signal Routing", label: "Signal Routing" },
    { value: "Sinks", label: "Sinks" },
    { value: "Sources", label: "Sources" },
    { value: "String", label: "String" },
    { value: "Structural", label: "Structural" },
    { value: "Trigger", label: "Trigger" },
  ];

  const handleAttributeChange = (e, multiselectEvent) => {
    var attributeType;
    if (multiselectEvent && multiselectEvent.name === "blockTypeAttribute") {
      attributeType = multiselectEvent.name;
    } else {
      var value = e.target.value;
      attributeType = e.target.name;
    }

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
        var selectedBlockTypesArr = [].slice.call(e).map((item) => item.value);
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
    if (blockTypes.length > 0 && blockTypes !== "") {
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
            <Button variant="secondary" type="submit" disabled={isLoading}>
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
                placeholder="0..100,200,>1000 (See Help)"
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
                placeholder="0..100,200,>1000 (See Help)"
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
                placeholder="0..100,200,>1000 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formmaxDepthAttribute-1">
              <OverlayTrigger
                placement="top"
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
                placeholder="0..10,4,<8 (See Help)"
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
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    Search/Select block category.
                    Refer to paper for full list.
                  </Tooltip>
                }
              >
                <Form.Label>
                  block types
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>

              <Select
                name="blockTypeAttribute"
                options={block_categories_map}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleAttributeChange}
                allowSelectAll={true}
                defaultValue={blockTypes}
              />
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
                placement="top"
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
