function [toolboxes] = get_toolbox_dependency(model)
%GET_TOOLBOX_DEPENDENCY Summary of this function goes here
try
    toolboxes = dependencies.toolboxDependencyAnalysis(model);
    tmp = toolboxes{1};
    for i = 2:length(toolboxes)
        tmp= strcat(tmp,",",toolboxes{i});
    end
    toolboxes = tmp;
catch ME
    fprintf('ERROR Processing toolboxDependency %s\n',model);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    toolboxes = "NA";
end
end

