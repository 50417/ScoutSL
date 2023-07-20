classdef model_metric < handle
    % Gets Metrics
    % Description of Metrics: https://www.mathworks.com/help/slcheck/ref/model-metric-checks.html#buuybtl-1
    % NOTE : Object variables always have to be appended with obj
    properties
        cfg;
        table_name;
        foreign_table_name;
        project_model_to_skip;
        SCRIPT_LOCATION; % location of this script. i.e. where SLNET_Metrics is located

        block_metric_obj;

        res_map;

        conn;
        colnames = {'project_id','model_name','model_path','is_test','is_lib',... %1
            'schk_block_count','sldiag_block_count','custom_block_count','schk_block_count_inc_lib','total_block_count_w_mask',...%2
            'lines_count','lines_count_inc_lib','hierar_depth','hierar_depth_inc_lib', ...%3
            'subsystem_count','subsystem_count_inc_lib','ncs_count','crb_count',...%4
            'lib_linked_block_count','lib_linked_block_count_inc_lib',...%5
            'compiles','compile_time','cyclo_complex','cyclo_complex_inc_lib','alge_loop_count',...%6
            'target_hw','solver_type','sim_mode','system_target_file',...%7
            'sim_time','unique_sfun_count','sfun_nam_count','unique_mdl_ref_count','mdlref_nam_count',...%8
            'created_date','has_TargetLink_block','last_modified','toolbox_dependency'};%9

        coltypes = {'NUMERIC','VARCHAR','VARCHAR','Boolean','Boolean',... %1
            'NUMERIC','NUMERIC','NUMERIC','NUMERIC','NUMERIC',...%2
            'NUMERIC','NUMERIC','Numeric','NUMERIC',...%3
            'NUMERIC','Numeric','Numeric','NUMERIC',...%4
            'NUMERIC','NUMERIC',...%5
            'NUMERIC','NUMERIC','NUMERIC','NUMERIC','NUMERIC',...%6
            'VARCHAR','VARCHAR','VARCHAR','VARCHAR'... %7
            'NUMERIC','NUMERIC','VARCHAR','NUMERIC','VARCHAR',... %8
            'DATETIME','Boolean','DATETIME','VARCHAR'};%9

        logfilename = strcat('Model_Metric_LogFile',datestr(now, 'dd-mm-yy-HH-MM-SS'),'.txt')


    end

    methods
        %Constructor
        function obj = model_metric()
            %warning on verbose
            warning ('on','all');
            obj.cfg = model_metric_cfg();
            %disp("open",obj.logfilename);

            obj.SCRIPT_LOCATION = obj.cfg.SCRIPT_LOCATION;

            obj.table_name = obj.cfg.table_name;
            obj.foreign_table_name = obj.cfg.foreign_table_name;
            obj.project_model_to_skip = obj.cfg.project_models_to_skip;

            %obj.blk_info = get_block_info(); % extracts block info of top lvl...
            %obj.lvl_info = obtain_non_supported_hierarchial_metrics();

            obj.conn = utils.connect_table(obj.cfg.dbfile,obj.table_name,obj.colnames,obj.coltypes,obj.cfg.DROP_TABLES,3);

            obj.res_map = utils.initialize_map(obj.colnames,obj.coltypes);

            obj.block_metric_obj = block_metric(obj.cfg.dbfile, obj.cfg.block_metric_table_name,obj.cfg.DROP_TABLES);

            %Creates folder to extract zipped filed files in current
            %directory.
            if obj.cfg.tmp_unzipped_dir==""
                obj.cfg.tmp_unzipped_dir = strcat(filesep,"tmp",filesep,"workdirtmp");
            end
            if(~exist(obj.cfg.tmp_unzipped_dir,'dir'))
                mkdir(char(obj.cfg.tmp_unzipped_dir));
            end



        end


        %concatenates file with source directory
        full_path = get_full_path(obj,file);


        [list_of_files] = get_working_folder_model_files(obj,src_folder,dest_folder);

        %gets File Ids and model name and path from table
        function results = fetch_unique_identifier(obj)
            sqlquery = ['SELECT project_id,model_name,model_path FROM ' obj.table_name];
            results = fetch(obj.conn,sqlquery);

            %max(data)
        end

        %Construct matrix that concatenates 'file_id'+'model_name' to
        %avoid recalculating the metrics
        unique_id_mdl = get_database_content(obj);

        [model_name, relative_path] = get_info_from_path(obj,current_folder_name, folder_path);

        %Main function to call to extract model metrics
        function obj = process_all_projects(obj)
            [folders] = dir(obj.cfg.source_dir); %gives struct with date, name, size info, https://www.mathworks.com/matlabcentral/answers/282562-what-is-the-difference-between-dir-and-ls
            tf = ismember( {folders.name}, {'.', '..'});
            folders(tf) = [];  %remove current and parent directory.

            %Fetch All File id and model_name to avoid recalculating
            file_id_mdl_array = obj.get_database_content();

            %Loop over each folder
            for folder_id = 1 : size(folders)
           
                %      8908  9480  10173 Do later 9579 is interseting crash (view solution) 
                % 1757 is issue with brace indexing
                % 2932 has defined strsplit which is used by Matlab
                % 2967 Issue wth gen path
                % 3491 hangs foraver 228373688
                % 6816 7188 8434 p-code generaed prior version . 2007b
                % 8599 10789 execution/function is not supported. 
                % 8908 TODO later. large number of synthetic models
                % proobaly from SLEMI
                % 9480  hangs foraver 452417989
                
                utils.delete_tmp_folder_content(obj.cfg.tmp_unzipped_dir);

                test_harness = struct([]);
                folder_path = obj.cfg.tmp_unzipped_dir;%char(list_of_files(1));
                current_folder_fp = utils.convert_to_str(strcat(folders(folder_id).folder,filesep,folders(folder_id).name));


                list_of_files = obj.get_working_folder_model_files(current_folder_fp,obj.cfg.tmp_unzipped_dir);
                current_folder_name = split(current_folder_fp,filesep);
                current_folder_name = current_folder_name(end);
                project_id_splt = split(current_folder_name,".");
                project_id = project_id_splt{1};
                obj.res_map("project_id") = str2double(project_id);


                log = strcat("Processing #",  num2str(folder_id), " :File Id ",current_folder_name) ;
                disp(log);

                addpath(genpath(folder_path));%genpath doesnot add folder named private or resources in path as it is keyword in R2019a


                for file_id = 1: length(list_of_files)
                    cd(obj.SCRIPT_LOCATION);
                    model_path = list_of_files{file_id};
                    [model_name, relative_path] = obj.get_info_from_path(model_path,obj.cfg.tmp_unzipped_dir);
                    obj.res_map("model_name") = model_name;
                    obj.res_map("model_path") = relative_path;

                    %Skip if Id and model name already in database
                    if(~isempty(find(file_id_mdl_array==strcat(string(project_id),string(model_name),string(relative_path)), 1)))
                        fprintf('File Id %s %s already processed. Skipping\n', project_id, model_name );
                        continue
                    end

                    if contains(strcat(string(project_id),"-",string(model_name)),obj.project_model_to_skip)
                        continue;
                    end

                    cur_working_dir = pwd;
             
                    fprintf("Extracting metrics from %s\n",model_name);
                    try
                        load_system(model_path);
                        fprintf(' %s loaded\n',model_name);
                    catch ME
                        fprintf('ERROR loading %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);
                        continue;
                        %rmpath(genpath(folder_path));
                    end

                    if ~strcmp(cur_working_dir,pwd)
                        cd(cur_working_dir);
                    end

                    try
                        is_lib = bdIsLibrary(model_name); % Generally Library are precompiled:  https://www.mathworks.com/help/simulink/ug/creating-block-libraries.html
                    catch ME
                        fprintf('ERROR %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);
                        continue;
                        %rmpath(genpath(folder_path));
                    end
                    obj.res_map("is_lib") = is_lib;

                    try

                        [schk_block_count,agg_subsys_count,~,subsys_depth,liblink_count]= metric_utils.get_non_compiled_metrics(model_name,false);
                    catch ME

                        fprintf('ERROR Processing  %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);
                        continue;
                    end
                    obj.res_map("schk_block_count") = schk_block_count;
                    obj.res_map("custom_block_count") = metric_utils.get_custom_tool_total_block_count(model_name);
                    try
                        [~, sRpt] = sldiagnostics(model_name,'CountBlocks');
                        obj.res_map("sldiag_block_count") = sRpt(1).count;
                    catch ME

                        fprintf('ERROR Processing  %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);

                    end

                    obj.res_map("hierar_depth") = subsys_depth;
                    obj.res_map("subsystem_count") = agg_subsys_count;
                    obj.res_map("lib_linked_block_count") = liblink_count;
                    depth = obj.res_map("hierar_depth");
                    try
                        [schk_block_count_inc_lib,agg_subsys_count_inc_lib,~,subsys_depth_inc_lib,liblink_count_inc_lib]= metric_utils.get_non_compiled_metrics(model_name,true);

                        obj.res_map("schk_block_count_inc_lib") = schk_block_count_inc_lib;
                        obj.res_map("hierar_depth_inc_lib") = subsys_depth_inc_lib;
                        depth_inc_lib = obj.res_map("hierar_depth_inc_lib");

                        obj.res_map("subsystem_count_inc_lib") = agg_subsys_count_inc_lib;

                        obj.res_map("lib_linked_block_count_inc_lib") = liblink_count_inc_lib;
                    catch ME

                        fprintf('ERROR Processing non compiled metrics including library  %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);

                    end



                    obj.res_map("target_hw") = metric_utils.get_target_hw(model_name);
                    obj.res_map("solver_type") = metric_utils.get_solver_type(model_name);
                    obj.res_map("sim_mode") = metric_utils.get_sim_mode(model_name);

                    obj.res_map("system_target_file") = metric_utils.get_system_target_file(model_name);

                    obj.res_map("has_TargetLink_block") = metric_utils.get_TargetLink_Info(model_name);
                    [c_date,lm_date] = metric_utils.get_dates(model_name);
                    obj.res_map("created_date") =c_date;
                    obj.res_map("last_modified") =lm_date;
                    obj.res_map("toolbox_dependency") = metric_utils.get_toolbox_dependency(model_name);
                    obj.res_map('sim_time') = metric_utils.get_simulation_time(model_name);

                    [total_block_count_w_mask,crb_count,ncs_count,unique_sfun_count,sfun_reused_key_val,unique_mdl_ref_count,mdlref_nam_count,block_type_map] = metric_utils.get_non_api_metrics(model_name,depth);
                    obj.res_map('total_block_count_w_mask') = total_block_count_w_mask;
                    obj.res_map('crb_count') = crb_count;
                    obj.res_map('ncs_count') = ncs_count;
                    obj.res_map('unique_sfun_count') = unique_sfun_count;
                    obj.res_map('sfun_nam_count') = sfun_reused_key_val;
                    obj.res_map('unique_mdl_ref_count') = unique_mdl_ref_count;
                    obj.res_map('mdlref_nam_count') = mdlref_nam_count;

                    obj.block_metric_obj.populate_block_type_metric(str2double(project_id), model_name,relative_path,block_type_map);


                    obj.res_map('lines_count') =metric_utils.get_lines_count(model_name,depth,false);
                    try
                        obj.res_map('lines_count_inc_lib') =metric_utils.get_lines_count(model_name,depth_inc_lib,true);
                    catch ME

                        fprintf('ERROR Processing lines inc lib %s\n',model_name);
                        disp(['ERROR ID : ' ME.identifier]);
                        disp(['ERROR MSG : ' ME.message]);

                    end
                    if ~is_lib
                        compiled = metric_utils.does_model_compile(model_name);
                        obj.res_map('compiles') = compiled;
                        if ~strcmp(cur_working_dir,pwd)
                            cd(cur_working_dir);
                        end
                        if compiled
                            obj.res_map('compiles') = 1;
                            obj.res_map('compile_time') = metric_utils.get_compile_time(model_name);
                            if ~strcmp(cur_working_dir,pwd)
                                cd(cur_working_dir);
                            end

                            obj.res_map('cyclo_complex') = metric_utils.get_cyclomatic_complexity(model_name, false);
                            if ~strcmp(cur_working_dir,pwd)
                                cd(cur_working_dir);
                            end

                            obj.res_map('cyclo_complex_inc_lib') = metric_utils.get_cyclomatic_complexity(model_name, true);
                            if ~strcmp(cur_working_dir,pwd)
                                cd(cur_working_dir);
                            end

                            obj.res_map('alge_loop_count') = metric_utils.get_number_of_algebraic_loops(model_name);
                        end
                    else
                        fprintf('%s is a library. Skipping calculating cyclomatic metric/compile check\n',model_name);

                    end


                    if ~isempty(sltest.harness.find(model_name,'SearchDepth',depth))
                        test_harness = [test_harness,sltest.harness.find(model_name,'SearchDepth',depth)];
                    end
                    cd(obj.SCRIPT_LOCATION);
                    utils.write_to_database(obj.conn, obj.table_name, obj.colnames, obj.res_map);
                    utils.close_the_model(model_name);
                end

                % close all hidden;

                rmpath(genpath(char(folder_path)));
                try
                    utils.delete_tmp_folder_content(char(obj.cfg.tmp_unzipped_dir));
                catch ME
                    fprintf('ERROR deleting\n');
                    disp(['ERROR ID : ' ME.identifier]);
                    disp(['ERROR MSG : ' ME.message]);

                end

                obj.update_test_flag(test_harness,project_id);

                utils.cleanup();
            end
        end

        function success = update_test_flag(obj,test_harness,project_id)
            %metrics cannot be extracted using Simulink Check API since they
            %are test harness. Hence we insert the model new table.
            project_id = str2double(project_id);
            fprintf("Writing to Database\n");
            if isempty(test_harness)
                fprintf('Empty Test Harness. Returning\n');
                return;
            end
            [~,c] = size(test_harness);


            for i = 1: c
                tmp_res_map = utils.initialize_map(obj.colnames,obj.coltypes);
                tmp_res_map('project_id') = project_id;
                tmp_res_map('model_name') = test_harness(i).name;
                tmp_res_map('is_test') = 1;
                success = utils.write_to_database(obj.conn, obj.table_name, obj.colnames, tmp_res_map);
            end

        end
    end

end
