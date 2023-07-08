import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryResults: undefined,
  isLoading: false,
  error: "",
  searchInQueryResults: [],
  searchQuery: "",
  totalSearchResults: 0,
  searchPageType: "",
};
const searchResultSlice = createSlice({
  name: "queryResult",
  initialState,
  reducers: {
    fetchResultLoading: (state) => {
      state.isLoading = true;
    },
    fetchResultSuccess: (state, action) => {
      var res = action.payload.result;
      //console.log(res);
      //res.sort((a, b) => b.score - a.score);
      state.queryResults = res;
      state.searchInQueryResults = res;
      state.isLoading = false;
      state.totalSearchResults = action.payload.total_results;
      state.searchQuery = action.payload.searchQuery;
      state.searchPageType = action.payload.searchPageType;
    },
    fetchResultFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchQueryResults: (state, { payload }) => {
      state.searchInQueryResults = state.queryResults.filter((row) => {
        if (!payload) {
          return row;
        }
        if (row.project_description != null) {
          return (
            row.project_description
              .toLowerCase()
              .includes(payload.toLowerCase()) ||
            row.project_name.toLowerCase().includes(payload.toLowerCase()) ||
            row.author_handle.toLowerCase().includes(payload.toLowerCase())
          );
        }
        return false;
      });
    },
  },
});

const { reducer, actions } = searchResultSlice;
export const {
  fetchResultFail,
  fetchResultSuccess,
  fetchResultLoading,
  searchQueryResults,
} = actions;
export default reducer;
