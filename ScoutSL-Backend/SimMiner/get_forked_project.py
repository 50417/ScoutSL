from dotenv import dotenv_values
import logging
import argparse
import os,sys
sys.path.append('./DAO')
import sqlite3
from sqlite3 import Error
from subprocess import Popen, PIPE
import shutil
import time
from github import Github , GithubException,RateLimitExceededException
from ForkedRepo_DAO import SimulinkForkedRepoInfoController
logging.basicConfig(filename='logs/github_forked.log', filemode='a', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
					level=logging.INFO)
logging.getLogger().setLevel(logging.INFO)

logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))

class forked_project():
	'''


	'''
	def __init__(self,token,dbname, folder ):
		self.common_url = "https://github.com/"
		self.pygithub = Github(token)
		self.dir_name = folder
		self.databaseHandler = SimulinkForkedRepoInfoController(dbname)

		self.read_conn = self.create_connection(dbname)
		
		if not os.path.exists(self.dir_name):
			os.mkdir(self.dir_name)
			logging.info("Directory " + self.dir_name + " Created ")

		else:
			logging.info("Directory " + self.dir_name + " already exists")

		self.cur_api_call = 0
		self.start_time = time.time()

	def run_SQL(self, sql):
		cur = self.read_conn.cursor()
		cur.execute(sql)
		rows = cur.fetchall()
		results = [{"project_id":r[0], "url":r[1], "fork_count": r[2]} for r in rows]

		return results

	def get_processed_project_id(self):
		sql = 'SELECT DISTINCT forked_from_id FROM Forked_Projects'
		cur = self.read_conn.cursor()
		cur.execute(sql)
		rows = cur.fetchall()
		results = [r[0] for r in rows]

		return results



	def get_version_sha(self,repo):
		repoLink =self.common_url + \
							 repo.owner.login + "/" + repo.name + ".git"
		p = Popen(['git', 'ls-remote', repoLink, '|', 'grep', 'HEAD'], stdout=PIPE)
		output = p.communicate()[0].decode("utf-8")
		return output.split("\t")[0]

	def get_repo_languages(self,repo):
		language_list = list(repo.get_languages().keys())
		return  ",".join(language_list)

	def fetch_paginated_list(self,all_pages):
		'''
			Converts Github.paginatedList into list
			returns : 
				result: converted list
				pages: number of pages . This is number of API call to get the results
		'''
		result = []
		page_size = all_pages._PaginatedList__requester.per_page
		pages = (all_pages.totalCount - 1) // page_size + 1
		#num_api_call = 1
		for page in range(0, pages):
			# Retry loading page 
			while len(result) < min((page+1) * page_size, all_pages.totalCount):
				#num_api_call += 1
				#self.sleep_check(1)
				# if required due to weird condition: https://github.com/PyGithub/PyGithub/blob/001970d4a828017f704f6744a5775b4207a6523c/github/PaginatedList.py#L242
				elements = all_pages.get_page(-1 if page == 0 else page)
				if len(elements) == page_size or page == pages-1 and len(elements) == all_pages.totalCount % page_size:
					result.extend(elements)
		return result

	def create_connection(self, db_file):
		""" create a database connection to the SQLite database
			specified by the db_file
		:param db_file: database file
		:return: Connection object or None
		"""
		conn = None
		try:
			conn = sqlite3.connect(db_file)
		except Error as e:
			logging.error(e)

		return conn

	def get_forked_projects(self,project_url):
		'''
			Gets forked projects from the API of the provided project
			returns: 
				repo_forks_list : forked repo of project_url as Python list
				no_of_api_call: number of api calls
		'''
		
		project_name = project_url.replace(self.common_url,"")

		repo = self.pygithub.get_repo(project_name)
		#self.sleep_check(1)
		try: 
			repo_forks = repo.get_forks()
			#self.sleep_check(1)
		except RateLimitExceededException as e:
			raise(RateLimitExceededException)
		except Exception as e: 
			logging.info("Error getting list of forked repo.")
			logging.error(e)
			return []

		logging.info("Repo name : {}".format(repo))

		
		try: 
			repo_forks_list = self.fetch_paginated_list(repo_forks)
			#logging.info("Total number of API Calls: {}".format(no_of_api_call))
		
		except Exception as e: 
			logging.info("Error converting the paginated list to list")
			logging.error(e)

		logging.info("Total number of forks: {}".format(repo_forks.totalCount))
		assert(repo_forks.totalCount==len(repo_forks_list))
		
		return repo_forks_list

	def clone_the_repo(self,repo):
		'''
			clones the repository to the destination path
			repo: repo object
			returns: 
				success: boolean value
		'''
		success = True
		destination_path = self.dir_name + "/" + str(repo.id)
		# Cloning the project
		logging.info("Cloning the project %s" %(repo.clone_url + " "+ destination_path))
		try: 
			os.system("git clone "+repo.clone_url + " "+ destination_path)
			#shutil.rmtree(destination_path,ignore_errors=True)
		except Exception as e: 
			logging.info("Cloning failed")
			logging.info(e)
			success = False
		return success

	def write_to_database(self, project_id, repo, license_type, version_sha):
		'''
			Inserts the info to the database
			project_id : parent project id
			repo : forked repo object of the parent project

		'''
		success = True
		try: 
			topic = ",".join(repo.get_topics())
			languages = self.get_repo_languages(repo)
			if(topic != ""):
				logging.info("Topics : "+ topic)
			if(languages != ""):
				logging.info("Languages : "+ languages)
			self.databaseHandler.insert(repo.id,project_id, repo.name,repo.owner.login,repo.owner.type, repo.owner.id, repo.private,
									repo.html_url, repo.description, repo.fork, repo.url,
									repo.created_at, repo.updated_at, repo.pushed_at,
									repo.homepage, repo.size,
									repo.stargazers_count, repo.subscribers_count, languages,repo.forks_count,
									repo.open_issues_count, repo.master_branch, repo.default_branch,
									topic,license_type,version_sha)
		except Exception as e: 
			logging.info("Writing to database failed")
			logging.info(e)
			success = False
		return success

	def get_projects_from_source_table(self,forked): 
		'''
			return: 
				licensed_project_list : list of python dictionary containing project information
		'''

		if forked:
			PROJECTS_INFO_SQL = 'SELECT forked_project_id, project_url,forks_count from Forked_Projects'
		else:
			PROJECTS_INFO_SQL = 'SELECT project_id, project_url,forks_count from Root_Projects'
		licensed_project_list = self.run_SQL(PROJECTS_INFO_SQL)
		return licensed_project_list

	def delete_project_info(self, project_id):
		'''
			Delete forked project information from database and the cloned repository
		'''
		self.databaseHandler.delete(project_id)
		to_delete_folder = self.dir_name + "/" + str(project_id)
		shutil.rmtree(to_delete_folder,ignore_errors=True)

	def delete_forked_from_id(self, forked_from_id):
		'''
			Delete all projects information from database 
		'''
		self.databaseHandler.delete_original_id(forked_from_id)

	def get_license(self,repo):
		try:
			license_type = repo.get_license().license.name	
			logging.info("License Type : "+license_type)
		except Exception as e:
			logging.error(e)
			license_type = ''
		return license_type
		

	def go(self,cache_file,processed_file_ids,get_from_forked_FLAG):
		project_list = self.get_projects_from_source_table(get_from_forked_FLAG)
		processed_project_id = self.get_processed_project_id()
		FLAG = False
		count = 0
		for project in project_list:
			project_id = project['project_id']
			project_url = project['url']
			num_of_forks_from_db = project['fork_count']
			count += 1
			#logging.info("\n==================Processing Project #{}======================".format(count))

			if project_id in processed_project_id or project_id in processed_file_ids:
				#logging.info("\n==================Already processed : {}======================".format(project_id))
				continue
			
			FLAG = True
			try:
				project_forks  = self.get_forked_projects(project_url)
			except RateLimitExceededException as e:
				logging.info("=================Sleeping 1 hour==============")
				time.sleep(3600)
				project_forks = self.get_forked_projects(project_url)
			except Exception as e: 
				logging.error(e)
				logging.error("asdasd")
				continue
			finally: 
				with open(cache_file,'a+') as processed: 
					processed.write(","+str(project_id))
			num_of_forks_from_api = len(project_forks)

			

			if num_of_forks_from_db != num_of_forks_from_api:
				logging.info("Difference in fork counts. \n From DB: {}\nFrom API: {}".format(num_of_forks_from_db,num_of_forks_from_api))

			fork_counter = 0
			for project_fork in project_forks:
				fork_counter += 1
				logging.info("\n========Processing Fork #{} out of {}=====".format(fork_counter,num_of_forks_from_api))

				#First checks if the database contains the project. 
				#If exists, it is assumed that the project is already downloaded and cloning is skipped
				try: 
					version_sha =  self.get_version_sha(project_fork)
					license_type = self.get_license(project_fork)
				except RateLimitExceededException as e:
					self.delete_forked_from_id(project_id)
					logging.info("=================Sleeping 1 hour==============")
					time.sleep(3600)
					self.go()
					return 
				except Exception as e:
					logging.error("Error Getting SHA or Version")
					logging.error(e)
					continue

				write_success = self.write_to_database(project_id,project_fork,license_type,version_sha)
				if write_success:
					clone_success = self.clone_the_repo(project_fork)
					if not clone_success:
						logging.info("Cloned? {} Written to DB? {}".format(clone_success,write_success))
						logging.error("ISSUE Processing the project fork {}".format(project_fork.id))
						self.delete_project_info(project_fork.id)

					
			with open(cache_file,'a+') as processed: 
				processed.write(","+str(project_id))

		logging.info("Are there more ?"+str(FLAG))
		return FLAG

def main():
	parser = argparse.ArgumentParser(description='Get argument for downloading')
	parser.add_argument('-d', '--dir', dest="dir_name", type=str,
					help='Name of directory to store downloaded files ')
	parser.add_argument('-db', '--dbname', dest="db_name", type=str,
					help='Name of sqlite database (e.g. "a.sqlite") to get the projects. The forked repos metadata is also stored in the same metadata')
	parser.add_argument("-t", '--token', dest="token", type=str,
					help = 'https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line')
	
	parser.add_argument('-f', '--forked', dest="f_flag", default=False,action='store_true',
					help='Boolean value to determine to include only those project with license| Dont include the file if downloading all projects')

	args = parser.parse_args()


	processed_ones = []

	cache_file = 'processed_file_ids_forked.csv'
	if ~os.path.exists(''):
		f = open(cache_file,'a')
		f.close()

	with open(cache_file,'r') as processed_file_id:
		lines = processed_file_id.readlines()
		for line in lines: 
			processed_ones.extend( line.split(","))
	
	processed_file_ids = set([ int(f.strip())  for f in processed_ones if type(f).__name__ == 'str' and f.strip()!=''])

	config = dotenv_values("../.env")


	query = config['GITHUB_QUERY']#args.query
	print(query)
	dbname = config['GITHUB_DATABASE']#args.db_name
	l_flag = config['LICENSE']#args.l_flag
	folder = config['REPO_DIR']
	token = config['GITHUB_TOKEN']#args.token # BASIC AUTH OR OAUTH 5000 requests per hour ||  30 requests per minute for using SEARCH API

	get_from_forked_FLAG = config['GET_FORKS_OF_FORK']#args.f_flag
	are_there_more = True

	forked_project_obj = forked_project(token, dbname, folder)
	#forked_project_obj.get_forked_projects("https://github.com/HuangCongQing/Algorithms_MathModels")
	#forked_project_obj.get_projects_from_source_table()
	if get_from_forked_FLAG: 
		while (are_there_more):
			are_there_more = forked_project_obj.go(cache_file,processed_file_ids,get_from_forked_FLAG)
	else: 
		forked_project_obj.go(cache_file,processed_file_ids,get_from_forked_FLAG)




if __name__ == '__main__':
	main()

