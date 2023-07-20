function [sim_mode]=get_sim_mode(model)
try
    sim_mode = get_param(model, 'SimulationMode');

catch ME
    fprintf('ERROR Processing Date Time %s\n',modelName);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
end
end