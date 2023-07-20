function [firstpart,secondpart] = split_into_two_last_delim(str,delim)
%SPLIT_INTO_TWO_LAST_DELIM Summary of this function goes here
if isempty(str)
    firstpart = '';
    secondpart = '';
    return;
end
try
    arr_of_str = strsplit(str,delim);
catch
    arr_of_str = split(str,delim);
end
arr_len = length(arr_of_str);
firstpart = arr_of_str{1};
for i = 2 : arr_len-1
    firstpart = strcat(firstpart,delim,arr_of_str{i});
end
secondpart = arr_of_str{arr_len};
end

