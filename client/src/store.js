import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "./pages/search-result/searchResultSlice";
const store = configureStore({
  reducer: {
    queryResults: searchResultReducer,
  },
});

export default store;
