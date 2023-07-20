function [compile_time] = get_compile_time(model_name)
try
    [~, sRpt] = sldiagnostics(model_name, 'CompileStats');
    compile_time = sum([sRpt.Statistics(:).WallClockTime]);
catch ME
    fprintf('ERROR Processing Compile Time %s\n',model_name);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    compile_time = -1;
end
end
