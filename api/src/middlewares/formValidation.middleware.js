const Joi = require("joi");
const { models } = require("mongoose");
//Rules
const createdDate = Joi.date().less("now");
const createdDateoptional = Joi.string().allow("");
const pushedDate = Joi.date().less("now");
const pushedDateoptional = Joi.string().allow("");

const project_description = Joi.string().optional();
const blocks = Joi.number().min(0);
const blocksoptional = Joi.string().allow("");

const lines = Joi.number().min(0);
const linesoptional = Joi.string().allow("");

const subsystems = Joi.number().min(0);
const subsystemsoptional = Joi.string().allow("");

const maxDepth = Joi.number().min(0);
const maxDepthoptional = Joi.string().allow("");

modelRevision = Joi.number().min(0);
modelRevisionoptional = Joi.string().allow("");

perModelContributor = Joi.number().min(0);
perModelContributoroptional = Joi.string().allow("");

const blocktypes = Joi.array().items(Joi.string());
const solver = Joi.string();
const simMode = Joi.string();
const inc_lib = Joi.boolean();
const codeGen = Joi.boolean();

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
  "modelRevision",
  "perModelContributor",
  "forks",
  "watchers",
  "stars",
  "numSimModel",
]);

const queryModelMetricValidation = (req, res, next) => {
  const schema = Joi.object({
    blocks,
    lines,
    subsystems,
    maxDepth,
    blocktypes,
    project_description,
    solver,
    blocksoptional,
    linesoptional,
    maxDepthoptional,
    subsystemsoptional,
    simMode,
    inc_lib,
    codeGen,
  });
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

  const value = schema.validate(request_obj);
  if (value.error) {
    return res
      .status(400)
      .json({ status: "ERROR", message: value.error.message });
  }
  next();
};
const issue = Joi.number().min(0);
const issueoptional = Joi.string().allow("");

const pr = Joi.number().min(0);
const proptional = Joi.string().allow("");

const commit = Joi.number().min(0);
const commitoptional = Joi.string().allow("");

const modelCommit = Joi.number().min(0);
const modelCommitoptional = Joi.string().allow("");

const contributor = Joi.number().min(0);
const contributoroptional = Joi.string().allow("");

const modelcontributor = Joi.number().min(0);
const modelcontributoroptional = Joi.string().allow("");

const queryCommitMetricValidation = (req, res, next) => {
  const schema = Joi.object({
    issue,
    issueoptional,
    pr,
    proptional,
    commit,
    commitoptional,
    modelCommit,
    modelCommitoptional,
    contributor,
    contributoroptional,
    modelcontributor,
    modelcontributoroptional,
    modelRevision,
    modelRevisionoptional,
    perModelContributor,
    perModelContributoroptional,
  });
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

  const value = schema.validate(request_obj);
  if (value.error) {
    return res
      .status(400)
      .json({ status: "ERROR", message: value.error.message });
  }
  next();
};

const forks = Joi.number().min(0);
const forksoptional = Joi.string().allow("");

const watchers = Joi.number().min(0);
const watchersoptional = Joi.string().allow("");

const stars = Joi.number().min(0);
const starsoptional = Joi.string().allow("");

const numSimModel = Joi.number().min(0);
const numSimModeloptional = Joi.string().allow("");

const owners = Joi.string().optional();
const license = Joi.string().optional();

const language = Joi.array().items(Joi.string());

const queryRepoAttributeValidation = (req, res, next) => {
  const schema = Joi.object({
    forks,
    forksoptional,
    watchers,
    watchersoptional,
    stars,
    starsoptional,
    numSimModel,
    numSimModeloptional,
    owners,
    license,
    language,
    createdDate,
    pushedDate,
    createdDateoptional,
    pushedDateoptional,
  });
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

  const value = schema.validate(request_obj);
  if (value.error) {
    return res
      .status(400)
      .json({ status: "ERROR", message: value.error.message });
  }
  next();
};
module.exports = {
  queryModelMetricValidation,
  queryCommitMetricValidation,
  queryRepoAttributeValidation,
};
