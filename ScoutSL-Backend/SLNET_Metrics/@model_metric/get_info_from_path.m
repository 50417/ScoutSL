function [ model_name, relative_path] = get_info_from_path(obj,current_model_path, folder_path)
%GET_INFO_FROM_PATH Summary of this function goes here
relative_path = strrep(current_model_path,folder_path, "");

try
    tmp = strsplit(current_model_path,filesep)';
model_name = tmp{end};
model_name_splt = strsplit(string(model_name),".")';
catch ME
        tmp = split(current_model_path,filesep);
model_name = tmp{end};
    model_name_splt = split(model_name,".");
end
model_name = string(model_name_splt{1});
end

