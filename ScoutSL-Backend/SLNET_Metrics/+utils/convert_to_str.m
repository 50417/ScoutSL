function [outputStr] = convert_to_str(inputArg)
%CONVERT_TO_STR Summary of this function goes here
%   Detailed explanation goes here
outputStr = "";
if iscell(inputArg)
    [~,cols] = size(inputArg);
    for i = 1:cols
        if isnumeric(inputArg{1,i})
            tmp = num2str(inputArg{1,i});
        end
        outputStr = strcat(outputStr,tmp);
    end
else
    outputStr = strcat(outputStr,inputArg);
end
outputStr = strtrim(outputStr);

end

