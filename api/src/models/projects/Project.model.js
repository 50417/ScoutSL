const { ProjectSchema } = require("./Project.schema");
const req_to_col_map = {
  blocks: "models.schk_block_count",
  lines: "models.lines_count",
  subsystems: "models.subsystem_count",
  maxDepth: "models.hierar_depth",
  solver: "models.solver_type",
  simMode: "models.sim_mode",
  blocktypes: "models.block_category",
  commit: "commits_meta.commits",
  pr: "commits_meta.pr",
  issue: "commits_meta.issues",
  contributor: "commits_meta.contributors",
  modelCommit: "commits_meta.commits_MS",
  modelcontributor: "commits_meta.contributors_MS",
  forks: "forks_count",
  watchers: "watchers_count",
  stars: "stargazers_count",
  numSimModel: "no_of_model_files",
  owners: "author_handle",
  language: "languages",
  license: "license",
  createdDate: "created_at",
  pushedDate: "updated_at",
  codeGen: "models.code_gen",
  modelRevision: "models.commits",
  perModelContributor: "models.contributors",
  numOfRating: "no_of_ratings",
  avgRating: "average_rating",
  numOfComments: "no_of_comments",
};
const result_limit = 100000;
const getProjectById = (project_id) => {
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find({ project_id })
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectBySearchText = (searchText) => {
  var queryObj = [];
  attr_text = ["project_description"];
  for (attr of attr_text) {
    var tmp = {};
    tmp[attr] = { $regex: searchText, $options: "i" };
    queryObj.push(tmp);
  }
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find({ $or: queryObj })
        .select(
          "project_url download_link project_name project_description updated_at license no_of_model_files project_id _id version_sha score"
        )
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const get_num_range_query = (param, opt_param) => {
  if (opt_param === "") {
    return Number(param);
  } else if (!isNaN(Number(opt_param))) {
    return { $gt: Number(param), $lt: Number(opt_param) };
  } else if (!isNaN(Date.parse(opt_param))) {
    return { $gte: new Date(param), $lte: new Date(opt_param) };
  } else if (opt_param === ">" && !isNaN(Number(param))) {
    return { $gt: Number(param) };
  } else if (opt_param === ">" && !isNaN(Date.parse(param))) {
    return { $gt: Number(param) };
  } else if (opt_param === "<" && !isNaN(Number(param))) {
    return { $lt: Number(param) };
  } else if (opt_param === "<" && !isNaN(Date.parse(param))) {
    return { $lt: new Date(param) };
  }
  return {};
};

const getProjectByModelMetric = (searchFilterObj) => {
  queryObj = {};

  req_keys = Object.keys(searchFilterObj);
  let append_inc_lib = "";
  if (req_keys.includes("inc_lib")) {
    append_inc_lib = "_inc_lib";
  }

  req_to_col_keys = Object.keys(req_to_col_map);
  for (let i = 0; i < req_keys.length; i++) {
    req_key = req_keys[i];
    if (req_to_col_keys.includes(req_key)) {
      if (req_keys.includes(req_key + "optional")) {
        queryObj[req_to_col_map[req_key] + append_inc_lib] =
          get_num_range_query(
            searchFilterObj[req_key],
            searchFilterObj[req_key + "optional"]
          );
      } else if (Array.isArray(searchFilterObj[req_key])) {
        //for(const arr_itm of queryObj[req_to_col_map[req_key]]){
        queryObj[req_to_col_map[req_key]] = { $all: searchFilterObj[req_key] };
        //}
      } else {
        if (req_key === "codeGen") {
          tmp_boolean = searchFilterObj[req_key] === "true" ? true : false;
          queryObj[req_to_col_map[req_key]] = { $eq: tmp_boolean };
        } else {
          queryObj[req_to_col_map[req_key]] = searchFilterObj[req_key];
        }
      }
    }
  }
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find(queryObj)
        .select(
          "project_url download_link project_name project_description updated_at license no_of_model_files project_id _id version_sha score"
        )
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectByCommitMetric = (searchFilterObj) => {
  queryObj = {};
  const req_keys = Object.keys(searchFilterObj);
  const req_to_col_keys = Object.keys(req_to_col_map);
  for (let i = 0; i < req_keys.length; i++) {
    req_key = req_keys[i];
    if (req_to_col_keys.includes(req_key)) {
      if (req_keys.includes(req_key + "optional")) {
        queryObj[req_to_col_map[req_key]] = get_num_range_query(
          searchFilterObj[req_key],
          searchFilterObj[req_key + "optional"]
        );
      } else {
        queryObj[req_to_col_map[req_key]] = searchFilterObj[req_key];
      }
    }
  }
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find(queryObj)
        .select(
          "project_url download_link project_name project_description updated_at license no_of_model_files project_id _id version_sha score"
        )
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const github_only = ["forks_count", "watchers_count", "stargazers_count"];
const matc_only = ["no_of_ratings", "average_rating", "no_of_comments"];
const getProjectByRepoAttribute = (searchFilterObj) => {
  queryObj = {};
  matcQueryObj = {};
  githubQueryObj = {};

  const req_keys = Object.keys(searchFilterObj);
  const req_to_col_keys = Object.keys(req_to_col_map);

  for (let i = 0; i < req_keys.length; i++) {
    var req_key = req_keys[i];

    if (req_to_col_keys.includes(req_key)) {
      if (req_keys.includes(req_key + "optional")) {
        if (github_only.includes(req_to_col_map[req_key])) {
          githubQueryObj[req_to_col_map[req_key]] = get_num_range_query(
            searchFilterObj[req_key],
            searchFilterObj[req_key + "optional"]
          );
        } else if (matc_only.includes(req_to_col_map[req_key])) {
          matcQueryObj[req_to_col_map[req_key]] = get_num_range_query(
            searchFilterObj[req_key],
            searchFilterObj[req_key + "optional"]
          );
        } else {
          queryObj[req_to_col_map[req_key]] = get_num_range_query(
            searchFilterObj[req_key],
            searchFilterObj[req_key + "optional"]
          );
        }
      } else if (Array.isArray(searchFilterObj[req_key])) {
        //for(const arr_itm of queryObj[req_to_col_map[req_key]]){
        queryObj[req_to_col_map[req_key]] = { $all: searchFilterObj[req_key] };
        //}
      } else {
        if (github_only.includes(req_to_col_map[req_key])) {
          githubQueryObj[req_to_col_map[req_key]] = {
            $regex: searchFilterObj[req_key],
            $options: "i",
          };
        } else if (matc_only.includes(req_to_col_map[req_key])) {
          matcQueryObj[req_to_col_map[req_key]] = {
            $regex: searchFilterObj[req_key],
            $options: "i",
          };
        } else {
          queryObj[req_to_col_map[req_key]] = {
            $regex: searchFilterObj[req_key],
            $options: "i",
          };
        }
      }
    }
  }
  for (const [key, value] of Object.entries(queryObj)) {
    if (Object.keys(githubQueryObj).length !== 0) {
      githubQueryObj[key] = value;
    }
    if (Object.keys(matcQueryObj).length !== 0) {
      matcQueryObj[key] = value;
    }
  }

  var query_to_search;
  if (
    Object.keys(matcQueryObj).length === 0 &&
    Object.keys(githubQueryObj).length === 0
  ) {
    console.log("asdas ");
    query_to_search = [queryObj];
  } else if (Object.keys(githubQueryObj).length === 0) {
    query_to_search = [matcQueryObj];
  } else if (Object.keys(matcQueryObj).length === 0) {
    query_to_search = [githubQueryObj];
  } else {
    query_to_search = [githubQueryObj, matcQueryObj];
  }

  console.log(query_to_search);
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find({ $or: query_to_search })
        .select(
          "project_url download_link project_name project_description updated_at license no_of_model_files project_id _id version_sha score"
        )
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getProjectById,
  getProjectBySearchText,
  getProjectByModelMetric,
  getProjectByCommitMetric,
  getProjectByRepoAttribute,
};
