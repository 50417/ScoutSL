function [firstpart,secondpart] = split_into_two_first_delim(str,delim)
%SPLIT_TWO_LAST_DELIM splits the string into two string at the first matching delimiter from the end
% returns two character array
%   Detailed explanation goes here
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
secondpart = arr_of_str{2};
for i = 3 : arr_len
    secondpart = strcat(secondpart,delim,arr_of_str{i});
end


end