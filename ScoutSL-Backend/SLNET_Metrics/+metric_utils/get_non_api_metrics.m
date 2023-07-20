function [total_block_count_w_mask,crb_count,ncs_count,unique_sfun_count,sfun_reused_key_val,unique_mdl_ref_count,mdlref_nam_count,blockTypeMap] = get_non_api_metrics(model_name,depth)
try
    max_depth = depth; % depth from the API

    blockTypeMap = containers.Map();
    modelrefMap = containers.Map();
    sfun_reuse_map = containers.Map();

    crb_count =  0;%Model Reference + subsystem Count
    ncs_count = 0; % num of contained subsystem
    total_block_count_w_mask = 0; % number of blocks  looking underneath masked block but not looking underneath model reference and library bl

    all_blocks =  find_system(model_name,'SearchDepth',max_depth,'LookUnderMasks', 'all', 'FollowLinks','off');

    for cur_depth = 1:max_depth
        all_blocks_this_depth = get_block_current_level(all_blocks,cur_depth);
        childCount_onthisLevel = 0;%Child models are blocks which are model references and Subsystem (Child Representing blocks)
        subsystem_onthisLevel = 0; % subsystem count in this level (subset of childmodels) (NCS)
        sfunctions_onthisLevel = 0;

        blockCount =length(all_blocks_this_depth);
        total_block_count_w_mask = total_block_count_w_mask + blockCount;
        for i = 1:blockCount
            currentBlock = all_blocks_this_depth{i};
            if ~strcmp(currentBlock, model_name)
                [block_type,reference_block] = metric_utils.get_block_type(currentBlock);
                block_type_ref_key = strcat(block_type,"|",currentBlock,"|",reference_block);
                if ~ismember(block_type_ref_key,keys(blockTypeMap))
                    blockTypeMap(block_type_ref_key) = 0;
                end
                blockTypeMap(block_type_ref_key) = blockTypeMap(block_type_ref_key) + 1;
                if strcmp(block_type,'ModelReference')
                    childCount_onthisLevel = childCount_onthisLevel+1;
                    modelName = get_param(currentBlock,'ModelName');
                    if ~ismember(modelName,keys(modelrefMap))
                        modelrefMap(modelName) = 0;
                    end
                    modelrefMap(modelName) = modelrefMap(modelName)+ 1;
                elseif strcmp(block_type,'SubSystem')
                    childCount_onthisLevel=childCount_onthisLevel+1;
                    subsystem_onthisLevel = subsystem_onthisLevel + 1;
                elseif  strcmp( block_type,'S-Function')
                    sfunctions_onthisLevel = sfunctions_onthisLevel + 1;
                    sfun_name = char(get_param(currentBlock, 'FunctionName'));
                    if ~ismember(sfun_name,keys(sfun_reuse_map))
                        sfun_reuse_map(sfun_name) = 0;
                    end
                    sfun_reuse_map(sfun_name) = sfun_reuse_map(sfun_name) +1;
                end
            end
        end
        ncs_count = ncs_count + subsystem_onthisLevel;
        crb_count = crb_count + childCount_onthisLevel;

    end


    sfun_val_str='';% variable that has sfunction with its count separate by comma, FORMAT: ,sfunname_count,
    sfun_key = keys(sfun_reuse_map);
    for K = 1 :length(sfun_key)

        sfun_val_str = strcat(sfun_val_str,',',sfun_key{K},'_',int2str(sfun_reuse_map(sfun_key{K})));
    end

    mdlref_val_str='';% variable that has mdlref with its count separate by comma, FORMAT: ,mdl_ref_count,
    mdlref_key = keys(modelrefMap);
    for K = 1 :length(mdlref_key)
        mdlref_val_str = strcat(mdlref_val_str,',',mdlref_key{K},'_',int2str(modelrefMap(mdlref_key{K})));
    end



    unique_sfun_count = length(sfun_key);
    sfun_reused_key_val= sfun_val_str; % list of s function used more than once


    mdlref_nam_count = mdlref_val_str; % list of mdlref used and its count
    unique_mdl_ref_count = length(mdlref_key);

catch ME
    fprintf('ERROR Processing non-compiled_metrics %s\n',model_name);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    total_block_count_w_mask = -1;
    crb_count= -1;
    ncs_count= -1;
    unique_sfun_count = -1;
    sfun_reused_key_val= 'NA';
    unique_mdl_ref_count= -1;
    mdlref_nam_count= 'NA';
    blockTypeMap= containers.Map(); 
end

end


function block_on_this_level = get_block_current_level(all_blocks,level)
total_blocks = length(all_blocks);
block_on_this_level = {};
for i = 1:total_blocks
    no_of_single_backslash = regexp(all_blocks{i},'(?<!/)/(?!/)');
    if length(no_of_single_backslash) == level
        block_on_this_level(end+1) = all_blocks(i);
    end
end
end
