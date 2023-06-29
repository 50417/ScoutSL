import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ES6
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const RepoAttributeSearchOptions = ({
  handleOnSubmit,
  setSearchText,
  numbers_re,
  date_re,
}) => {
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
  const handleAttributeChange = (e) => {
    const value = e.target.value;
    const attributeType = e.target.name;
    //console.log();
    switch (attributeType) {
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
        var selectedLanguageArr = [].slice
          .call(e.target.selectedOptions)
          .map((item) => item.value);
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
      (searchQuery.trim() !== "" ? " searchQuery:" + searchQuery : "");
    if (license.length > 0) {
      console.log(license.length);
      tmpAdvancedSearchText =
        tmpAdvancedSearchText + " license:" + license.join(",");
    }
    if (language.length > 0) {
      console.log(language.length);
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
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Group>

        <Row style={{ backgroundColor: "rgba(248, 244, 242, 0.952)" }}>
          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-3">
              <Form.Label>forks</Form.Label>

              <Form.Control
                name="forksAttribute"
                type="text"
                value={forks}
                placeholder="0..100,200,>1000"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-4">
              <Form.Label> watchers</Form.Label>

              <Form.Control
                name="watchersAttribute"
                type="text"
                value={watchers}
                placeholder="0..100,200,>1000"
                onChange={handleAttributeChange}
              />
            </Form.Group>
          </Col>

          <Col lg={3}>
            <Form.Group className="mt-3" controlId="formHorizontal-1">
              <Form.Label>stars</Form.Label>

              <Form.Control
                name="starsAttribute"
                type="text"
                value={stars}
                placeholder="0..100,200,>1000"
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
                placeholder=" <YYYY-MM-DD, YYYY-MM-DD..YYYY-MM-DD"
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
                placeholder=" >YYYY-MM-DD, YYYY-MM-DD..YYYY-MM-DD"
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
                placeholder="0..100,200,>1000"
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

              <Form.Control
                name="languageAttribute"
                as="select"
                multiple
                value={language}
                onChange={handleAttributeChange}
              >
                {project_languages.map((project_language) => (
                  <option
                    key={project_language}
                    value={project_language.replace(/\s/g, "")}
                  >
                    {project_language}
                  </option>
                ))}
              </Form.Control>
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
