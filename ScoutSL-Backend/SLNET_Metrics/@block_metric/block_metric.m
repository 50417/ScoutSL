classdef block_metric < handle
    properties
        table_name;
        foreign_table_name;
        conn;
        colnames = {'project_id','model_name','model_path','block_type','reference_block','block_category','block_count'};
        coltypes = {'NUMERIC','VARCHAR','VARCHAR','VARCHAR','VARCHAR','VARCHAR','NUMERIC'};
        blk_category_map;

    end
    methods
        function obj = block_metric(dbfile, block_table_name,DROP_TABLES)
            warning ('off','all');
            obj.table_name = block_table_name;

            obj.conn = utils.connect_table(dbfile,block_table_name,obj.colnames,obj.coltypes,DROP_TABLES,6);
            block_lib_map = metric_utils.getblock_library_map();
            obj.blk_category_map = metric_utils.get_non_overlap_block_category_map(block_lib_map);

        end

        function success = populate_block_type_metric(obj,project_id, model_name,model_path,block_type_map)
            success = false;
            block_type_block_name_refs = keys(block_type_map);

            tmp_map = containers.Map();
            for i = 1:length(block_type_block_name_refs)
                block_count = block_type_map(block_type_block_name_refs{i});
                [block_type, current_block_reference_block] = utils.split_into_two_first_delim(block_type_block_name_refs{i},"|");
                [current_block,reference_block]  = utils.split_into_two_first_delim(current_block_reference_block,"|");
                return_category = metric_utils.get_block_category(block_type,current_block,false,obj.blk_category_map,reference_block);

                new_tmp_key = strcat(block_type,"|",reference_block,"|",return_category);
                if ~ismember(new_tmp_key,keys(tmp_map))
                    tmp_map(new_tmp_key) = 0;
                end
                tmp_map(new_tmp_key) = tmp_map(new_tmp_key) + block_count;

            end

            tmp_map_keys = keys(tmp_map);
            for i = 1:length(tmp_map_keys)
                res_map = containers.Map();
                block_count = tmp_map(tmp_map_keys{i});
                
                res_map('project_id') = project_id;
                res_map('model_name') = model_name;
                res_map('model_path') = model_path;
                [block_type, reference_block_category] = utils.split_into_two_first_delim(tmp_map_keys{i},"|");
                [reference_block,block_category]  = utils.split_into_two_last_delim(reference_block_category,"|");
                
                res_map('block_type') = block_type;
                %res_map('block_name') = current_block;
                res_map('block_count') = block_count;
                res_map('reference_block') = reference_block;
                res_map('block_category') = block_category;
                utils.write_to_database(obj.conn, obj.table_name, obj.colnames, res_map);
                success = true;
            end


        end
    end


end
