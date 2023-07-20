%Writes to database 
function output_bol = write_to_database(conn, table_name, colnames, res)

    try
        tmp_insert_values = cell(1,length(colnames));
        for i = 1:length(colnames)
            tmp_insert_values{1,i} = res(colnames{i});
        end
        insert_table_data = cell2table(tmp_insert_values,"VariableNames",colnames);
        sqlwrite(conn,table_name,insert_table_data);
    catch ME
        fprintf('ERROR Inserting to Database %s\n',res('model_name'));                    
        disp(['ERROR ID : ' ME.identifier]);
        disp(['ERROR MSG : ' ME.message]);
    end
    output_bol= 1;
end