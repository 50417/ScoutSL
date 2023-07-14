import axios from "axios";
const API_URL = "http://localhost:4001";

export const getProjects = (searchText) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(API_URL + "/v1/project/" + searchText);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProjectsModelMetric = (advancedSearchText) => {
  const params = processSearchText(advancedSearchText);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(API_URL + "/v1/project/modelmetric", {
        params,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProjectsCommitMetric = (advancedSearchText) => {
  const params = processSearchText(advancedSearchText);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(API_URL + "/v1/project/commitmetric", {
        params,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProjectsRepoAttribute = (advancedSearchText) => {
  const params = processSearchText(advancedSearchText);
  //console.log(params);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(API_URL + "/v1/project/repoattribute", {
        params,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getOperandAndOperator = (str) => {
  // First param : always operand
  //last_param : operand or operator
  let attr_param = str.split(":");
  var attr, first_param, last_param;
  if (attr_param.length === 2) {
    attr = attr_param[0];
    const param = attr_param[1];
    if (param.includes(".") && attr !== "license") {
      const params = param.split(".");
      const p1 = params[0];
      const p2 = params[params.length - 1];
      if (
        !isNaN(Number(p1)) &&
        typeof Number(p1) === "number" &&
        !isNaN(Number(p2)) &&
        typeof Number(p2) === "number"
      ) {
        first_param = Number(p1);
        last_param = Number(p2);
      } else if (!isNaN(Date.parse(p1)) && !isNaN(Date.parse(p2))) {
        first_param = p1;
        last_param = p2;
      } else {
        throw new Error("something bad happened!");
      }
    } else if (param.includes(",")) {
      first_param = param.split(",");
    } else if (!isNaN(Number(param)) && typeof Number(param) === "number") {
      first_param = Number(param);
      last_param = "";
    } else if (param.includes(">") || param.includes("<")) {
      first_param = param.replace(">", "");
      first_param = first_param.replace("<", "");
      if (!isNaN(Number(first_param))) {
        first_param = Number(first_param);
      } else if (!isNaN(Date.parse(first_param))) {
        first_param = first_param.replace(" ", "");
      } else {
        throw new Error("something bad happened!");
      }
      last_param = param.includes(">") ? ">" : "<";
    } else if (param === "true" || param === "false") {
      first_param = param === "true" ? true : false;
    } else if (typeof param === "string") {
      first_param = param;
    }
  }
  if (
    (attr === "blocktypes" || attr === "language") &&
    typeof first_param === "string"
  ) {
    first_param = [first_param];
  }
  return [attr, first_param, last_param];
};

const processSearchText = (searchText) => {
  var params = {};

  const advancedRegex = /[^\s]+:[^\s]+/g;
  const advancedFilters = searchText.match(advancedRegex);
  for (let i = 0; i < advancedFilters.length; i++) {
    try {
      var [attr, first_param, last_param] = getOperandAndOperator(
        advancedFilters[i]
      );
    } catch (err) {
      continue;
    }
    params[attr] = first_param;
    params[attr + "optional"] = last_param;
  }
  return params;
};
