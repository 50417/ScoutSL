 %Deletes content of obj.cfg.tmp_unzipped_dir such that next
        %project can be analyzed
        function delete_tmp_folder_content(folder)
            
            %Get a list of all files in the folder
            list = dir(folder);
            % Get a logical vector that tells which is a directory.
            dirFlags = [list.isdir];
            % Extract only those that are directories.
            subFolders = list(dirFlags);
            tf = ismember( {subFolders.name}, {'.', '..'});
            subFolders(tf) = [];  %remove current and parent directory.
        
             for k = 1 : length(subFolders)
              base_folder_name = subFolders(k).name;
              full_folder_name = fullfile(folder, base_folder_name);
              fprintf( 'Now deleting %s\n\n', full_folder_name);
              rmdir(full_folder_name,'s');
             end
            
             file_pattern = fullfile(folder, '*.*'); 
            files = dir(file_pattern);%dir(filePattern);
            tf = ismember( {files.name}, {'.', '..'});
            files(tf) = [];
            for k = 1 : length(files)
              base_file_name = files(k).name;
              full_file_name = fullfile(folder, base_file_name);
              fprintf( 'Now deleting %s\n\n', full_file_name);
              delete(full_file_name);
            end

            %fclose('all'); %Some files are opened by the models
            %global FID;
            %arrayfun(@fclose, setdiff(fopen('all'), FID));
            if exist('slprj', 'dir')
                rmdir('slprj','s');
            end
            if isunix
                system(char(strcat('rm -rf'," ",folder)));
            else 
                 rmdir(char(folder),'s');%https://www.mathworks.com/matlabcentral/answers/21413-error-using-rmdir
            end
            %WriteLog("open");
            rehash;
            java.lang.Thread.sleep(5);
            mkdir(char(folder));
            utils.cleanup();
            
        end