%Credits: https://www.mathworks.com/matlabcentral/answers/1905-logging-in-a-matlab-script
function WriteLog(Data,varargin)
    global FID; % https://www.mathworks.com/help/matlab/ref/global.html %https://www.mathworks.com/help/matlab/ref/persistent.html Local to functions but values are persisted between calls.
    DEBUG = false;
    if nargin > 1
        logfilename = varargin{1};
        if nargin ==3
            DEBUG = varargin{2};
        end
    end
    if isempty(FID) & ~strcmp(Data,'open')
        
         FID = fopen(['logs' filesep logfilename], 'a+');
    end
    % Open the file
    if strcmp(Data, 'open')
        mkdir('logs');
      FID = fopen(['logs' filesep logfilename], 'a+');
      if FID < 0
         error('Cannot open file');
      end
      return;
    elseif strcmp(Data, 'close')
      fclose(FID);
      FID = -1;
    end
    try
        fprintf(FID, '%s: %s\n',datestr(now, 'dd/mm/yy-HH:MM:SS'), Data);
    catch ME
        ME
    end
    % Write to the screen at the same time:
    if DEBUG
        fprintf('%s: %s\n', datestr(now, 'dd/mm/yy-HH:MM:SS'), Data);
    end
end