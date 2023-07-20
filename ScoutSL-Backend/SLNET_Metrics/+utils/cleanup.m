%to clean up files MATLAB generates while processing
function cleanup()
    extensions = {'slxc','c','mat','wav','bmp','log','mexa64','stl','avi','cpp','asv','txt','sti','csv','png','a',...
       'tlc','mexw64'}; % cell arrAY.. Add file extesiion 
    for i = 1 :  length(extensions)
        delete( char(strcat("*.",extensions(i))));
    end
    bdclose('all');
end