 %drop table Striclty for debugging purposes
 function drop_table(conn,table_name)
            %Strictly for debugginf purpose only
            sqlquery = ['DROP TABLE IF EXISTS ' table_name];
            exec(conn,sqlquery);
            %max(data)
        end