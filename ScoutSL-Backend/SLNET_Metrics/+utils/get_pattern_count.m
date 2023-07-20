function [res_count] = get_pattern_count(str,pat)
%GET_PATTERN_COUNT Summary of this function goes here
%   Detailed explanation goes here
res_count = 0;
if isa(str,'string')
    str = char(str);
end

str_length = length(str);
i = 1;
while i <= str_length
    if str(i) == pat
        res_count = res_count + 1;
        while i+1 <= str_length && str(i+1) == pat
            i = i +1;
        end
    end
    i = i+1;
end

end

