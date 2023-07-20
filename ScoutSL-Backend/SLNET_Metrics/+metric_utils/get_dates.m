function [created_date,last_modified_date]=get_dates(modelName)
try
OrigCreationDate = get_param(modelName, 'Created');
LastChangeDate = get_param(modelName, 'LastModifiedDate');

created_date = datetime(OrigCreationDate,'InputFormat','eee MMM dd HH:mm:ss yyyy','Format','yyyy-MM-dd HH:mm:ss');
last_modified_date = datetime(LastChangeDate,'InputFormat','eee MMM dd HH:mm:ss yyyy','Format','yyyy-MM-dd HH:mm:ss');
catch ME
    fprintf('ERROR Processing Date Time %s\n',modelName);
    disp(['ERROR ID : ' ME.identifier]);
    disp(['ERROR MSG : ' ME.message]);
    last_modified_date = -1;
    created_date = -1;
end
end