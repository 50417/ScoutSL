# ScoutSL Backend

Clone the project and install the dependencies
```sh
$ git clone <gitlink>
$ cd ScoutSL
```

## Installation

Tested on Ubuntu 18.04 

First, create virtual environment using  [Anaconda] so that the installation does not conflict with system wide installs.
```sh
$ conda create -n <envname> python=3.8
```

Activate environment and Install the dependencies.
```sh
$ conda activate <envname>
$ pip install -r requirements.txt
```

## Usage

### 1. SimMiner GitHub
The tool mines Simulink repository from GitHub and searches for project since 2008. The repository is a cloned one. Make sure you have enough storage in your system.
Change  to `SimMiner` directory

#### 1.1 To get Simulink projects
```sh
$ python downloadRepoFromGithub.py --query=<QUERY> --dir=<DIRECTORY_TO_STORE_PROJECTS> --dbname=<DATABASE_TO_STORE_COMMIT_METADATA> --token=<GITHUB_AUTHENTICATION_TOKEN>
``` 
We used 
- `query=simulink`  OR `query=language:MATLAB` 
- `dbname=scoutSL.sqlite`
The two queries have to run in two different python execution.

Getting Authetication token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token


#### 1.2 To get project's forks 

```sh
$ python get_forked_project.py --dir=<DIRECTORY_TO_STORE_PROJECTS> --dbname=<DATABASE_TO_STORE_COMMIT_METADATA> --token=<GITHUB_AUTHENTICATION_TOKEN>
``` 
Use the same database that you use to mine the projects. 
Use either same dir  or different directory if you want to save forked projects into different directory.

#### 1.3 To get Projects Issue and PR
```sh
$ python get_issues_pr.py --dbname=<DATABASE_TO_STORE_COMMIT_METADATA> --token=<GITHUB_AUTHENTICATION_TOKEN>
``` 
Use the same database that you use to mine the projects. 

Adding -f flag in the get_forked_project.py and get_issues_pr.py will get the metadata for forked projects. Otherwise only root is processed. 

### 2. SimMiner MATLAB Central 
Create a .env file with the following: 
```
MW_REPO_DIR: <directory where you want store the downloaded project>
GITHUB_DATABASE: <database to store the metadata>
RSS_FEED: https://www.mathworks.com/matlabcentral/fileexchange/feed.atom?date=submitted
```

Run
```sh
$ python downloadFromMathWorks.py 
```
### 3. Running SLNET Metric
model_metric_cfg.m contains all the configuration options that lets you configure the directory of the zipped projects (which has models to be analyzed) and database (where you store the all the model metric).  
##### To automatically find Simulink models and extract metrics from them. 
```sh
> cd SLNET_Metrics
> model_metric_obj = model_metric();
> model_metric_obj.process_all_models_file();
```

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
   [Anaconda]: <https://www.anaconda.com/>
