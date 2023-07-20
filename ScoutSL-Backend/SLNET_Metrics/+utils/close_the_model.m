%Close the model
% Close the model https://www.mathworks.com/matlabcentral/answers/173164-why-the-models-stays-in-paused-after-initialisation-state
function close_the_model(model)
    global FID;
    try
       mdlWks = get_param(model,'ModelWorkspace');
       if ~isempty(mdlWks)
           %https://www.mathworks.com/matlabcentral/answers/426-is-the-model-workspace-dirty
           %intentiaonally setting it to false to close it. 
          mdlWks.isDirty = 0; % Fix for 'The model '' must be compiled before it can be accessed programmatically'
             clear(mdlWks);
       end
       fprintf("Closing %s\n",model);
 
       close_system(model);
       bdclose(model);
    catch exception
       
        disp(exception.message);
        disp("Trying Again");
        if (strcmp(exception.identifier ,'Simulink:Commands:InvModelDirty' ))
            disp("Force Closing");
            bdclose(model);
            return;
        end
        %eval([model '([],[],[],''sizes'')']);
        
        if (strcmp(exception.identifier ,'Simulink:Commands:InvModelClose' ) | strcmp(exception.identifier ,'Simulink:Engine:InvModelClose'))
            eval([model '([],[],[],''term'')']);
            close_system(model);
             bdclose(model);
             return;

        end
        if (strcmp(exception.identifier ,'Simulink:Commands:InvSimulinkObjectName' ))
            bdclose('all');
            return;
        end
        %eval([model '([],[],[],''term'')']);

        bdclose('all');
        %obj.close_the_model(model);
    end
end