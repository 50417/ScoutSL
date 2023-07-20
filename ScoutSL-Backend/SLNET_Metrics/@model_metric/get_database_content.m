%Construct matrix that concatenates 'file_id'+'model_name' to
%avoid recalculating the metrics
function unique_id_mdl = get_database_content(obj)
    
    file_id_n_model = obj.fetch_unique_identifier();
    [r,c]= size(file_id_n_model);
    unique_id_mdl = string.empty(0,r);
    for i = 1 : r
        if ispc
            file_path = strrep(file_id_n_model{i,3},'/',filesep);
        elseif isunix
            file_path = strrep(file_id_n_model{i,3},'\',filesep);
        end
        %https://www.mathworks.com/matlabcentral/answers/350385-getting-integer-out-of-cell   
        unique_id_mdl(i) = strcat(string(file_id_n_model{i,1}),file_id_n_model{i,2},file_path);
    
    end
 
end