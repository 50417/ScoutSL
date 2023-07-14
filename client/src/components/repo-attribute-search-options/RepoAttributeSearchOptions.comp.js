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
import Select from "react-select";
import { useSelector } from "react-redux";

export const RepoAttributeSearchOptions = ({
  handleOnSubmit,
  setSearchText,
  numbers_re,
  date_re,
}) => {
  const { isLoading } = useSelector((state) => state.queryResults);
  const [forks, setForks] = useState("");
  const [watchers, setWatchers] = useState("");
  const [stars, setStars] = useState("");

  const [createdDate, setCreatedDate] = useState("");
  const [pushedDate, setPushedDate] = useState("");

  const [numSimModel, setNumSimModel] = useState("");
  const [owners, setOwners] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [language, setLanguage] = useState([]);
  const [license, setlicense] = useState("");

  const [numOfRating, setNumOfRating] = useState("");
  const [avgRating, setAvgRating] = useState("");

  const [advancedSearchText, setAdvancedSearchText] = useState("");

  const license_types = [
    "Academic Free License v3.0",
    "Apache License 2.0",
    'BSD 2-clause "Simplified" license',
    'BSD 3-clause "New" or "Revised" license',
    'BSD 4-clause "Original" license',
    "Boost Software License 1.0",
    "Creative Commons Attribution 4.0 International",
    "Creative Commons Attribution Share Alike 4.0 International",
    "Creative Commons Zero v1.0 Universal",
    "Do What The F*ck You Want To Public License",
    "Eclipse Public License 1.0",
    "Eclipse Public License 2.0",
    "GNU Affero General Public License v3.0",
    "GNU General Public License v2.0",
    "GNU General Public License v3.0",
    "GNU Lesser General Public License v2.1",
    "GNU Lesser General Public License v3.0",
    "ISC License",
    "MIT License",
    "Mozilla Public License 2.0",
    "Other",
    "The Unlicense",
    "University of Illinois/NCSA Open Source License",
  ];

  const project_languages = [
    "1C Enterprise",
    "AGS Script",
    "AMPL",
    "ANTLR",
    "ASP",
    "ASP.NET",
    "ActionScript",
    "Ada",
    "Alloy",
    "AngelScript",
    "ApacheConf",
    "Arduino",
    "Assembly",
    "AutoHotkey",
    "AutoIt",
    "Awk",
    "Batchfile",
    "Bison",
    "BlitzBasic",
    "Brainfuck",
    "Brightscript",
    "C",
    "C#",
    "C++",
    "CLIPS",
    "CMake",
    "CSS",
    "CartoCSS",
    "Clarion",
    "Clean",
    "Click",
    "CoffeeScript",
    "Common Lisp",
    "Coq",
    "Csound",
    "Cuda",
    "Cython",
    "D",
    "DIGITAL Command Language",
    "DM",
    "Dafny",
    "Dart",
    "DataWeave",
    "Dockerfile",
    "Dylan",
    "ECL",
    "Eagle",
    "Elixir",
    "Elm",
    "Emacs Lisp",
    "Erlang",
    "F*",
    "Faust",
    "Forth",
    "Fortran",
    "G-code",
    "GAMS",
    "GAP",
    "GDB",
    "GLSL",
    "Gnuplot",
    "Go",
    "Groff",
    "Groovy",
    "HCL",
    "HLSL",
    "HTML",
    "Hack",
    "Haskell",
    "IDL",
    "IGOR Pro",
    "Ioke",
    "Isabelle",
    "Java",
    "JavaScript",
    "JetBrains MPS",
    "Jinja",
    "Julia",
    "Jupyter Notebook",
    "KiCad Layout",
    "LSL",
    "LabVIEW",
    "Less",
    "Lex",
    "Limbo",
    "Lua",
    "M",
    "M4",
    "MATLAB",
    "Makefile",
    "Mathematica",
    "Max",
    "Mercury",
    "Modelica",
    "Module Management System",
    "NASL",
    "NSIS",
    "NetLogo",
    "NewLisp",
    "Nix",
    "OCaml",
    "Objective-C",
    "Objective-C++",
    "Opa",
    "Opal",
    "OpenEdge ABL",
    "OpenSCAD",
    "PHP",
    "PLSQL",
    "PLpgSQL",
    "POV-Ray SDL",
    "Papyrus",
    "Pascal",
    "Pawn",
    "Perl",
    "Perl 6",
    "PostScript",
    "PowerShell",
    "Processing",
    "Prolog",
    "Protocol Buffer",
    "PureBasic",
    "Python",
    "QML",
    "QMake",
    "R",
    "Racket",
    "Raku",
    "Rich Text Format",
    "Roff",
    "Ruby",
    "Rust",
    "SAS",
    "SCSS",
    "SMT",
    "SWIG",
    "SaltStack",
    "Scala",
    "Scheme",
    "Scilab",
    "ShaderLab",
    "Shell",
    "Smalltalk",
    "Smarty",
    "Solidity",
    "SourcePawn",
    "Standard ML",
    "Starlark",
    "Stata",
    "SuperCollider",
    "Swift",
    "SystemVerilog",
    "TSQL",
    "TXL",
    "Tcl",
    "TeX",
    "Terra",
    "TypeScript",
    "V",
    "VBA",
    "VBScript",
    "VHDL",
    "Verilog",
    "Vim Script",
    "Vim Snippet",
    "Visual Basic",
    "XC",
    "XS",
    "XSLT",
    "Xtend",
    "Yacc",
    "Zimpl",
    "eC",
    "kvlang",
    "mupad",
    "nesC",
    "q",
    "sed",
    "xBase",
  ];
  var project_languages_map = [];
  for (const s of project_languages) {
    project_languages_map.push({ value: s.replace(/\s/g, ""), label: s });
  }

  const handleAttributeChange = (e, multiselectEvent) => {
    var attributeType;
    if (multiselectEvent && multiselectEvent.name === "languageAttribute") {
      attributeType = multiselectEvent.name;
    } else {
      var value = e.target.value;
      attributeType = e.target.name;
    }
    switch (attributeType) {
      case "avgRatingAttribute":
        if (numbers_re.test(value)) {
          setAvgRating(value);
        }
        break;
      case "numRatingAttribute":
        if (numbers_re.test(value)) {
          setNumOfRating(value);
        }
        break;
      case "forksAttribute":
        if (numbers_re.test(value)) {
          setForks(value);
        }
        break;
      case "watchersAttribute":
        if (numbers_re.test(value)) {
          setWatchers(value);
        }
        break;
      case "starsAttribute":
        if (numbers_re.test(value)) {
          setStars(value);
        }
        break;
      case "createdDateAttribute":
        if (date_re.test(value)) {
          setCreatedDate(value);
        }
        break;
      case "pushedAttribute":
        if (date_re.test(value)) {
          setPushedDate(value);
        }
        break;
      case "numSimModelAttribute":
        if (numbers_re.test(value)) {
          setNumSimModel(value);
        }
        break;
      case "ownersAttribute":
        setOwners(value);
        break;
      case "searchQueryAttribute":
        setSearchQuery(value);
        break;
      case "licenseAttribute":
        var selectedArr = [].slice
          .call(e.target.selectedOptions)
          .map((item) => item.value);
        setlicense(selectedArr);
        break;
      case "languageAttribute":
        var selectedLanguageArr = [].slice.call(e).map((item) => item.value);
        setLanguage(selectedLanguageArr);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    var tmpAdvancedSearchText =
      (forks.trim() !== "" ? "forks:" + forks : "") +
      (watchers.trim() !== "" ? " watchers:" + watchers : "") +
      (stars.trim() !== "" ? " stars:" + stars : "") +
      (createdDate.trim() !== "" ? " createdDate:" + createdDate : "") +
      (pushedDate.trim() !== "" ? " pushedDate:" + pushedDate : "") +
      (numSimModel.trim() !== "" ? " numSimModel:" + numSimModel : "") +
      (owners.trim() !== "" ? " owners:" + owners : "") +
      (searchQuery.trim() !== "" ? " searchQuery:" + searchQuery : "") +
      (numOfRating.trim() !== "" ? " numOfRating:" + numOfRating : "") +
      (avgRating.trim() !== "" ? " setAvgRating:" + avgRating : "");
    if (license.length > 0 && license[0] !== "") {
      tmpAdvancedSearchText =
        tmpAdvancedSearchText + " license:" + license.join(",");
    }
    if (language.length > 0 && language[0] !== "") {
      tmpAdvancedSearchText =
        tmpAdvancedSearchText + " language:" + language.join(",");
    }

    setAdvancedSearchText(tmpAdvancedSearchText);
    setSearchText(tmpAdvancedSearchText);
  }, [
    forks,
    watchers,
    stars,
    createdDate,
    pushedDate,
    numSimModel,
    owners,
    searchQuery,
    license,
    language,
    numOfRating,
    avgRating,
    setSearchText,
  ]);

  return (
    <Container>
      <Form
        autoComplete="off"
        onSubmit={(e) => handleOnSubmit(e, "repoAttribute")}
      >
        <Form.Group as={Row} className="mb-5" controlId="formHorizontal-1">
          <Form.Label column sm={2}>
            Project with
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
            <Form.Group className="mt-3" controlId="formHorizontal-3">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-forks">GitHub-related</Tooltip>
                }
              >
                <Form.Label>
                  forks
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="forksAttribute"
                type="text"
                value={forks}
                placeholder="0..10,>5,<10 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-4">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-watchers">GitHub-related</Tooltip>
                }
              >
                <Form.Label>
                  watchers <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="watchersAttribute"
                type="text"
                value={watchers}
                placeholder="10..25,5,>10 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-Stars">GitHub-related</Tooltip>
                }
              >
                <Form.Label>
                  stars
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="starsAttribute"
                type="text"
                value={stars}
                placeholder=">50,10..25 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>created at</Form.Label>

              <Form.Control
                name="createdDateAttribute"
                type="text"
                value={createdDate}
                placeholder=" <YYYY-MM-DD (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>last updated at</Form.Label>

              <Form.Control
                name="pushedAttribute"
                type="text"
                value={pushedDate}
                placeholder=">YYYY-MM-DD (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label> this many Simulink models</Form.Label>

              <Form.Control
                name="numSimModelAttribute"
                type="text"
                value={numSimModel}
                placeholder="0..50,>100 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>from this owner</Form.Label>

              <Form.Control
                name="ownersAttribute"
                type="text"
                value={owners}
                placeholder=""
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>these license types</Form.Label>

              <Form.Control
                name="licenseAttribute"
                as="select"
                value={license}
                onChange={handleAttributeChange}
              >
                <option value="">-- any license --</option>
                {license_types.map((license_type) => (
                  <option
                    key={license_type}
                    value={license_type.replace(/\s/g, "")}
                  >
                    {license_type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>written in these languages</Form.Label>

              <Select
                name="languageAttribute"
                options={project_languages_map}
                isMulti
                closeMenuOnSelect={false}
                onChange={handleAttributeChange}
                allowSelectAll={true}
                defaultValue={language}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-ratings">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-numRating">
                    MATLAB Central-related
                  </Tooltip>
                }
              >
                <Form.Label>
                  number of ratings
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="numRatingAttribute"
                type="text"
                value={numOfRating}
                placeholder=">5,10..25 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-avgratings">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="button-tooltip-avgrating">
                    MATLAB Central-related
                  </Tooltip>
                }
              >
                <Form.Label>
                  average ratings
                  <AiFillQuestionCircle />
                </Form.Label>
              </OverlayTrigger>
              <Form.Control
                name="avgRatingAttribute"
                type="text"
                value={avgRating}
                placeholder="1..5, <4 (See Help)"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

RepoAttributeSearchOptions.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  setSearchText: PropTypes.func.isRequired,
  numbers_re: PropTypes.object.isRequired,
  date_re: PropTypes.object.isRequired,
};
