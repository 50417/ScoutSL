function [target_hw]=get_target_hw(model)
try
    cs = getActiveConfigSet(model);
    target_hw = cs.get_param('TargetHWDeviceType');
catch ME
    fprintf('ERROR Processing TargetHWDeviceType %s\n',model);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    target_hw = "NA";
end
end