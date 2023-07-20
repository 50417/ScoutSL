%returns number of algebraic loop in the model.
%What is algebraic Loops :
%https://www.mathworks.com/help/simulink/ug/algebraic-loops.html  https://www.mathworks.com/matlabcentral/answers/95310-what-are-algebraic-loops-in-simulink-and-how-do-i-solve-them
function num_alge_loop = get_number_of_algebraic_loops(model)
try
    alge_loops = Simulink.BlockDiagram.getAlgebraicLoops(model);
    num_alge_loop  = numel(alge_loops);
catch ME
    fprintf('ERROR Processing Algerbraic Loop %s\n',model);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    num_alge_loop =-1;
end
end