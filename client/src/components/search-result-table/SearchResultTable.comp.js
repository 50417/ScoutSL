import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import Pagination from "../../pages/search-result/Pagination";
import { fetchSearchResult } from "../../pages/search-result/searchResultAction";
export const SearchResultTable = () => {
  const dispatch = useDispatch();
  const {
    searchInQueryResults,
    totalSearchResults,
    searchQuery,
    searchPageType,
  } = useSelector((state) => state.queryResults);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchInQueryResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchInQueryResults, PageSize]);

  const retrieveResultsAndChangePage = (page) => {
    console.log(page);
    setCurrentPage(page);
    dispatch(fetchSearchResult(searchQuery, searchPageType, PageSize, page));
  };

  const downloadJson = (project_json_obj) => {
    const { _id: dummy, ...tmpObject } = project_json_obj;
    const file_name = project_json_obj.project_id + ".json";
    var blob = new Blob([JSON.stringify(tmpObject, null, 3)], {
      type: "application/json",
    });

    saveAs(blob, file_name);
  };

  const downloadProject = (project_json_obj) => {
    const git_url = "https://github.com";
    const proj_url = project_json_obj.project_url;
    if (proj_url.includes(git_url)) {
      var download_link =
        proj_url + "/archive/" + project_json_obj.version_sha + ".zip";
      window.open(download_link, "_blank");
    } else {
      window.open(project_json_obj.download_link, "_blank");
    }
  };
  return (
    <>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalSearchResults}
        pageSize={PageSize}
        onPageChange={(page) => retrieveResultsAndChangePage(page)}
      />
      {searchInQueryResults.length ? (
        currentTableData.map((row) => (
          <Card
            border="secondary"
            bg="light"
            text="dark"
            className="mb-2 mt-2"
            key={row.projectid}
          >
            <Row xs={1} md={2}>
              <Col xs={2} md={4} className="mb-4">
                <Card.Text
                  style={{ textAlign: "left" }}
                  key={row.projectid + "Pname"}
                >
                  <a
                    href={row.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{row.project_name}</strong>
                  </a>
                </Card.Text>
              </Col>
              <Col xs={4} md={8} className="mb-4">
                <Card.Text
                  style={{ textAlign: "left" }}
                  className="text-truncate"
                  key={row.projectid + "Pdesc"}
                >
                  {row.project_description}
                </Card.Text>
              </Col>
            </Row>
            <Row xs={1} md={1}>
              <Col xs={2} md={4} className="mb-1">
                <Card.Text
                  style={{ textAlign: "left" }}
                  className="text-truncate"
                  key={row.projectid + "license"}
                >
                  {row.license ? row.license : "No License"}
                </Card.Text>
              </Col>
              <Col xs={2} md={3} className="mb-1">
                <Card.Text
                  style={{ textAlign: "left" }}
                  key={row.projectid + "lastUpdate"}
                >
                  Last update: {row.updated_at.substring(0, 10)}
                </Card.Text>
              </Col>
              <Col xs={1} md={2} className="mb-1">
                <Card.Text
                  style={{ textAlign: "left" }}
                  key={row.projectid + "numModels"}
                >
                  Models: {row.no_of_model_files}
                </Card.Text>
              </Col>
              <Col xs={1} md={1} className="mb-1">
                <Card.Text
                  style={{ textAlign: "right" }}
                  key={row.projectid + "dbutton"}
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        if download fails or to get the latest version, go to
                        the project link
                      </Tooltip>
                    }
                  >
                    <Button
                      name="button-downloadProject"
                      variant="dark"
                      onClick={() => downloadProject(row)}
                      className="downloadButton"
                    >
                      Download
                    </Button>
                  </OverlayTrigger>
                </Card.Text>
              </Col>
              <Col xs={1} md={2} className="mb-1">
                <Card.Text
                  style={{ textAlign: "right" }}
                  key={row.projectid + "downloadJson"}
                >
                  <Button
                    name="button-downloadJson"
                    variant="dark"
                    onClick={() => downloadJson(row)}
                    className=""
                  >
                    JSON
                  </Button>
                </Card.Text>
              </Col>
            </Row>
          </Card>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">
            No Results Found
          </td>
        </tr>
      )}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalSearchResults}
        pageSize={PageSize}
        onPageChange={(page) => retrieveResultsAndChangePage(page)}
      />
    </>
  );
};
