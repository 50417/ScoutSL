import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import Pagination from "../../pages/search-result/Pagination";
export const SearchResultTable = () => {
  const { searchInQueryResults } = useSelector((state) => state.queryResults);
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = 10;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchInQueryResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchInQueryResults, PageSize]);

  const downloadJson = (project_json_obj) => {
    const { ["_id"]: dummy, ...tmpObject } = project_json_obj;
    const file_name = project_json_obj.project_id + ".json";
    var blob = new Blob([JSON.stringify(tmpObject, null, 3)], {
      type: "application/json",
    });

    saveAs(blob, file_name);
  };
  return (
    <>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={searchInQueryResults.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {searchInQueryResults.length ? (
        currentTableData.map((row) => (
          <Card border="secondary" bg="light" text="dark" className="mb-2 mt-2">
            <Row xs={1} md={2}>
              <Col xs={2} md={4} className="mb-4">
                <Card.Text style={{ textAlign: "left" }}>
                  <a href={row.project_url}>
                    <strong>{row.project_name}</strong>
                  </a>
                </Card.Text>
              </Col>
              <Col xs={4} md={8} className="mb-4">
                <Card.Text
                  style={{ textAlign: "left" }}
                  className="text-truncate"
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
                >
                  {row.license ? row.license : "No License"}
                </Card.Text>
              </Col>
              <Col xs={2} md={3} className="mb-1">
                <Card.Text style={{ textAlign: "left" }}>
                  Updated on: {row.updated_at.substring(0, 10)}
                </Card.Text>
              </Col>
              <Col xs={2} md={3} className="mb-1">
                <Card.Text style={{ textAlign: "left" }}>
                  Models: {row.no_of_model_files}
                </Card.Text>
              </Col>
              <Col xs={2} md={2} className="mb-1">
                <Card.Text style={{ textAlign: "right" }}>
                  <Button
                    name="button-downloadJson"
                    variant="dark"
                    onClick={() => downloadJson(row)}
                    className=""
                  >
                    Metadata
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
        totalCount={searchInQueryResults.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
