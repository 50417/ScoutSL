import React from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";

import { filterSearchResult } from "../../pages/search-result/searchResultAction";
import "./searchform.style.css";
export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    //console.log(value);
    dispatch(filterSearchResult(value));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Col>
            <Form.Control
              name="searchStr"
              className="form-control-settings"
              onChange={handleOnChange}
              placeholder="Search in results"
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
