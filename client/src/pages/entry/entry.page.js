import React, { useState } from "react";
import { Searchbar } from "../../components/searchbar/Searchbar.comp";
import "./entry.style.css";
import { Container, Row, Col } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { fetchSearchResult } from "../search-result/searchResultAction";
import { SearchResult } from "../search-result/SearchResult.page";
import { MultiTabAdvancedSearch } from "../../components/multi-tab-advanced-search/MultiTabAdvancedSearch.comp";

export const Entry = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchPageLoad, setSearchPageLoad] = useState("basic");
  const [fetchedSearchQuery, setFetchedSearchQuery] = useState("");
  const numbers_re = /^[0-9.<>\b]*$/;
  const date_re = /^[0-9.<>\-\b]*$/;

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleOnSubmit = (e, searchPageType) => {
    e.preventDefault();
    if (!searchText) {
      return alert("Fill up the form");
    }
    //console.log(searchText);
    //console.log(searchText.trim().startsWith("inc_lib"));
    if (searchText.startsWith("inc_lib")) {
      return alert("Fill up the form");
    }
    setFetchedSearchQuery(searchText);
    dispatch(fetchSearchResult(searchText, searchPageType, 10, 0));
  };

  const searchPageSwitcher = (searchPageType) => {
    setSearchPageLoad(searchPageType);
    if (searchPageType === "basic") {
      setSearchText("");
      setFetchedSearchQuery("");
    }
  };
  return (
    <Container>
      <Row>
        <div className="entry-page">
          {searchPageLoad === "basic" && (
            <Searchbar
              handleOnChange={handleOnChange}
              handleOnSubmit={handleOnSubmit}
              searchPageSwitcher={searchPageSwitcher}
              searchText={searchText}
            />
          )}
          {searchPageLoad === "advanced" && (
            <MultiTabAdvancedSearch
              handleOnSubmit={handleOnSubmit}
              searchPageSwitcher={searchPageSwitcher}
              setSearchText={setSearchText}
              numbers_re={numbers_re}
              date_re={date_re}
            />
          )}
        </div>
      </Row>
      <Row className="mt-5">
        <Col>
          <SearchResult fetchedSearchQuery={fetchedSearchQuery} />
        </Col>
      </Row>
    </Container>
  );
};
