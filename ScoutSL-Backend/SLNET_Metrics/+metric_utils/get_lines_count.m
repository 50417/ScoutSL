function [lines_count] = get_lines_count(model_name,max_depth,inc_lib)
%Calculating number of lines /connections
unique_lines = 0;
unique_line_map = containers.Map();
if inc_lib
    lines = find_system(model_name,'SearchDepth',max_depth,'FindAll','on', 'LookUnderMasks', 'all', 'FollowLinks','on', 'type','line');
else
    lines = find_system(model_name,'SearchDepth',max_depth,'FindAll','on', 'LookUnderMasks', 'all', 'FollowLinks','off', 'type','line');
end
for l_i = 1:numel(lines)
    c_l = get(lines(l_i));

    for d_i = 1:numel(c_l.DstBlockHandle)
        ulk = [num2str(c_l.SrcBlockHandle) '_' num2str(c_l.SrcPortHandle) '_' num2str(c_l.DstBlockHandle(d_i)) '_' num2str(c_l.DstPortHandle(d_i))];
        if ~ismember(ulk,keys(unique_line_map))
             
            unique_line_map(ulk)= 1;
            unique_lines = unique_lines + 1;
        end
    end
end
lines_count = unique_lines;
end

