%Checks if a models compiles for not
function compiles = does_model_compile(model)

    %eval(['mex /home/sls6964xx/Desktop/UtilityProgramNConfigurationFile/ModelMetricCollection/tmp/SDF-MATLAB-master/C/src/sfun_ndtable.cpp']);
   %'com.mathworks.mde.cmdwin.CmdWinMLIF.getInstance().processKeyFromC(2,67,''C'')'

    %obj.timeout = timer('TimerFcn'," ME = MException('Timeout:TimeExceeded','Time Exceeded While Compiling');throw(ME);",'StartDelay',1);
    %start(obj.timeout);
    %eval([model, '([], [], [], ''compile'');'])
    
   % stop(obj.timeout);
    %delete(obj.timeout);
    %compiles = 1;
    try
        slreportgen.utils.compileModel(model)
        compiles = slreportgen.utils.isModelCompiled(model);
        if compiles  
            slreportgen.utils.uncompileModel(model);
             
        end 
       
        %eval([model, '([], [], [], ''compile'');']);
        %compiles = 0;
    catch ME 

        disp(['ERROR ID : ' ME.identifier]);
        disp(['ERROR MSG : ' ME.message]);

        compiles = 0;
    end
end