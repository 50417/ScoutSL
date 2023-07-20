function res_map = initialize_map(colnames, coltypes)

%INITIALIZE_MAP Summary of this function goes here
%   Detailed explanation goes here
    res_map = containers.Map();
    len_col = length(colnames);
    len_types = length(coltypes);

    if len_col ~= len_types
        error('Column names and types length do not match');
    end

    for i = 1:len_col
        if strcmp(coltypes{i},"VARCHAR")
            res_map(colnames{i}) = 'NA';
        else
             res_map(colnames{i}) = -1;
        end   
    end
    
end

