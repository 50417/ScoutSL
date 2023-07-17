import {
  getProjects,
  getProjectsModelMetric,
  getProjectsCommitMetric,
  getProjectsRepoAttribute,
} from "../../api/queryProjectAPI";
import {
  fetchResultFail,
  fetchResultSuccess,
  fetchResultLoading,
  searchQueryResults,
  resetState,
} from "./searchResultSlice";
export const fetchSearchResult =
  (searchText, searchPageType) => async (dispatch) => {
    dispatch(fetchResultLoading());
    var result;
    try {
      //fetch data from api
      if (searchPageType === "modelmetric") {
        result = await getProjectsModelMetric(searchText);
      } else if (searchPageType === "commitMetric") {
        result = await getProjectsCommitMetric(searchText);
      } else if (searchPageType === "repoAttribute") {
        result = await getProjectsRepoAttribute(searchText);
      } else {
        result = await getProjects(searchText);
      }
      dispatch(fetchResultSuccess(result.data.result));
    } catch (error) {
      dispatch(fetchResultFail(error.message));
    }
  };

export const filterSearchResult = (str) => (dispatch) => {
  dispatch(searchQueryResults(str));
};

export const resetSearchResult = () => (dispatch) => {
  dispatch(resetState());
};
