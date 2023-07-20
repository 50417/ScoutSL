function [list_of_files] = get_working_folder_model_files(obj,src_folder,dest_folder)
%SETUP_WORKING_FOLDER Summary of this function goes here
%   Detailed explanation goes here
list_of_files = {};
if endsWith(src_folder,'.zip','IgnoreCase',true)
    all_files = unzip(src_folder, dest_folder);
    for i = 1:length(all_files)
        file_path = utils.convert_to_str(all_files{i});
        if endsWith(file_path,".slx") || endsWith(file_path,".mdl")
            list_of_files(end+1) = {file_path};
        end
    end 
else
    copyfile(src_folder, dest_folder);
    dest_path = strcat(dest_folder,filesep,"**",filesep,"*");
    mdl_files = dir(strcat(dest_path,".mdl"));
    slx_files = dir(strcat(dest_path,".slx"));

    for i = 1:length(mdl_files)
        tmp = strcat(mdl_files(i).folder,filesep,mdl_files(i).name);
        %tmp = strrep(tmp,dest_folder,"");
        list_of_files(end+1) = {tmp}; 
    end

     for i = 1:length(slx_files)
        tmp = strcat(slx_files(i).folder,filesep,slx_files(i).name);
        %tmp = strrep(tmp,dest_folder,"");
        list_of_files(end+1) = {tmp}; 
    end
end


end

