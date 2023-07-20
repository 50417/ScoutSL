function sim_time = get_simulation_time( model)
%Gets simulation time of the model based on the models
%configuration. If the stopTime of the model is set to Inf, then it
% sets the simulation time to -1
%What is simulation Time: https://www.mathworks.com/matlabcentral/answers/163843-simulation-time-and-sampling-time

% cs = configuarationSettings of a model
try
    cs = getActiveConfigSet(model) ;
    startTime = cs.get_param('StartTime');
    stopTime = cs.get_param('StopTime'); %returns a string when time is finite

    startTime = eval(startTime);
    stopTime = eval(stopTime); %making sure that evaluation parts converts to numeric data
    if isfinite(stopTime) && isfinite(startTime) % isfinite() Check whether symbolic array elemtableents are finite

        assert(isnumeric(startTime) && isnumeric(stopTime));
        sim_time = stopTime-startTime;
    else
        sim_time = -1;
    end
catch
    sim_time = -1;
end
end
