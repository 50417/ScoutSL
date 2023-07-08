const express = require("express");
const router = express.Router();
const {
  getProjectBySearchText,
  getProjectByModelMetric,
  getProjectByCommitMetric,
  getProjectByRepoAttribute,
  getProjectBySearchTextCount,
} = require("../models/projects/Project.model");
const numeric_types = new Set([
  "blocks",
  "lines",
  "subsystems",
  "maxDepth",
  "issue",
  "pr",
  "commit",
  "contributor",
  "modelCommit",
  "modelcontributor",
  "forks",
  "watchers",
  "stars",
  "numSimModel",
  "modelRevision",
  "perModelContributor",
]);
const {
  queryModelMetricValidation,
  queryCommitMetricValidation,
  queryRepoAttributeValidation,
} = require("../middlewares/formValidation.middleware");
router.all("/", (req, res, next) => {
  //res.json({ message: "return fom project routers" });
  next();
});

// Get all projects based on model metric
router.get("/modelmetric", queryModelMetricValidation, async (req, res) => {
  try {
    let request_obj_keys = Object.keys(req.query);
    var request_obj = {};
    for (let i = 0; i < request_obj_keys.length; i++) {
      var key = request_obj_keys[i];
      if (numeric_types.has(key)) {
        request_obj[key] = Number(req.query[key]);
      } else {
        request_obj[key] = req.query[key];
      }
    }
    const result = await getProjectByModelMetric(request_obj);
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get all projects based on commit metric
router.get("/commitmetric", queryCommitMetricValidation, async (req, res) => {
  try {
    let request_obj_keys = Object.keys(req.query);
    var request_obj = {};
    for (let i = 0; i < request_obj_keys.length; i++) {
      var key = request_obj_keys[i];
      if (numeric_types.has(key)) {
        request_obj[key] = Number(req.query[key]);
      } else {
        request_obj[key] = req.query[key];
      }
    }
    const result = await getProjectByCommitMetric(request_obj);
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get all projects based on repo attribute
router.get("/repoattribute", queryRepoAttributeValidation, async (req, res) => {
  try {
    let request_obj_keys = Object.keys(req.query);
    var request_obj = {};
    for (let i = 0; i < request_obj_keys.length; i++) {
      var key = request_obj_keys[i];
      if (numeric_types.has(key)) {
        request_obj[key] = Number(req.query[key]);
      } else {
        request_obj[key] = req.query[key];
      }
    }

    const result = await getProjectByRepoAttribute(request_obj);
    return res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get all projects based on searchText
router.get("/:searchText", async (req, res) => {
  try {
    const { searchText } = req.params;
    const pageSize = Number(req.query["pageSize"]);
    const page = Number(req.query["page"]);
    const count_res = await getProjectBySearchTextCount(searchText);
    const result = await getProjectBySearchText(searchText, pageSize, page);
    return res.json({
      status: "success",
      total_results: count_res,
      searchQuery: searchText,
      searchPageType: "simpleSearch",
      result,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

module.exports = router;
