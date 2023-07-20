function [solver_type]=get_solver_type(model)
try
    solver_type = get_param(model,'SolverType');
catch ME
    fprintf('ERROR Processing Solver Type %s\n',model);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    solver_type = "NA";
end

end