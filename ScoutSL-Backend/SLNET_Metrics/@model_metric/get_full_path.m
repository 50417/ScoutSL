%concatenates file with source directory
        function full_path = get_full_path(obj,file)
            full_path = [obj.cfg.source_dir filesep file];
        end