function [sys_target_file] = get_system_target_file(model_name)
try
    sys_target_file = get_param(model_name,'SystemTargetFile');
catch ME
    fprintf('ERROR Processing SystemTargetFile %s\n',model_name);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    sys_target_file = "NA";
end
end

