const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  _id: {
    type: String,
    maxLength: 100,
    required: true,
  },
  project_id: {
    type: Number,
    required: true,
  },
  project_name: {
    type: String,
    maxLength: 100,
    required: true,
  },
  author_handle: {
    type: String,
    required: true,
  },
  project_url: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  no_of_model_files: {
    type: Number,
    required: true,
  },
  license: {
    type: String,
    maxLength: 100,
    required: true,
  },
  no_of_comments: {
    type: Number,
  },
  no_of_ratings: {
    type: Number,
  },
  average_ratings: {
    type: Number,
  },
  last_30_days_downloads: {
    type: Number,
  },
  download_link: {
    type: String,
  },
  author_uri: {
    type: String,
    required: true,
  },
  forks_count: {
    type: Number,
  },
  open_issues_count: {
    type: Number,
  },
  watchers_count: {
    type: Number,
  },
  stargazers_count: {
    type: Number,
  },
  size_in_kb: {
    type: Number,
  },
  models: [{}],
});

module.exports = {
  ProjectSchema: mongoose.model("test_v15", ProjectSchema),
};
