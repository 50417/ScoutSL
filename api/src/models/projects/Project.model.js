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
};
const result_limit = 300;
const getProjectById = (project_id) => {
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find({ project_id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectBySearchText = (searchText) => {
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find({
        project_description: { $regex: searchText, $options: "i" },
      })
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
    return param;
  } else if (!isNaN(Number(opt_param))) {
    return { $gt: param, $lt: Number(opt_param) };
  } else if (!isNaN(Date.parse(opt_param))) {
    return { $gte: new Date(param), $lte: new Date(opt_param) };
  } else if (opt_param === ">" && !isNaN(Number(param))) {
    return { $gt: param };
  } else if (opt_param === ">" && !isNaN(Date.parse(param))) {
    return { $gt: param };
  } else if (opt_param === "<" && !isNaN(Number(param))) {
    return { $lt: Number(param) };
  } else if (opt_param === "<" && !isNaN(Date.parse(param))) {
    return { $lt: new Date(param) };
  }
  return {};
};

const getProjectByModelMetric = async (searchFilterObj) => {
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
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectByCommitMetric = async (searchFilterObj) => {
  queryObj = {};
  const req_keys = Object.keys(searchFilterObj);
  const req_to_col_keys = Object.keys(req_to_col_map);
  for (let i = 0; i < req_keys.length; i++) {
    req_key = req_keys[i];
    console.log(req_key);
    if (req_to_col_keys.includes(req_key)) {
      console.log(req_key);
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
  console.log(queryObj);
  const res = await ProjectSchema.find(queryObj);
  console.log(res.data);
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find(queryObj)
        .limit(result_limit)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getProjectByRepoAttribute = async (searchFilterObj) => {
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
      } else if (Array.isArray(searchFilterObj[req_key])) {
        //for(const arr_itm of queryObj[req_to_col_map[req_key]]){
        queryObj[req_to_col_map[req_key]] = { $all: searchFilterObj[req_key] };
        //}
      } else {
        queryObj[req_to_col_map[req_key]] = {
          $regex: searchFilterObj[req_key],
          $options: "i",
        };
      }
    }
  }
  console.log(queryObj);
  const res = ProjectSchema.find(queryObj);
  console.log(res.data);
  return new Promise((resolve, reject) => {
    try {
      ProjectSchema.find(queryObj)
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
