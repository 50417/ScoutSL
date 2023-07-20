function x = get_custom_tool_total_block_count(model)
try
    %load_system(model)
    [refmodels,modelblock] = find_mdlrefs(model);

    % Open dependent models
    for i = 1:length(refmodels)
        load_system(refmodels{i});

    end
    %% Count the number of instances
    mCount = zeros(size(refmodels));
    mCount(end) = 1; % Last element is the top model, only one instance
    for i = 1:length(modelblock)
        mod = get_param(modelblock{i},'ModelName');
        mCount = mCount + strcmp(mod,refmodels);
    end
    %%
    %for i = 1:length(mDep)
    %   disp([num2str(mCount(i)) ' instances of' mDep{i}])
    %end
    %disp(' ')

    %% Loop over dependencies, get number of blocks
    s = cell(size(refmodels));
    for i = 1:length(refmodels)
        [t,s{i}] = sldiagnostics(refmodels{i},'CountBlocks');

    end
    %% Multiply number of blocks, times model count, add to total
    totalBlocks = 0;
    for i = 1:length(refmodels)
        totalBlocks = totalBlocks + s{i}(1).count * mCount(i);
    end
    %disp(' ')
    %disp(['Total blocks: ' num2str(totalBlocks)])
    x= totalBlocks;
catch ME
    fprintf('ERROR Processing Solver Type %s\n',model);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    x = -1;
end

%close_system(model)
end