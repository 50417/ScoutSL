function [conn] = connect_table(dbfile,table_name,colnames,coltypes,DROP_TABLES,PK_first_N)
    conn = sqlite(dbfile,'connect');
    cols = strcat(colnames(1) ," ",coltypes(1)) ;
    for i=2:length(colnames)
        cols = strcat(cols, ... 
            ',', ... 
            colnames(i), " ",coltypes(i) ) ;
    end
    primary_keys = colnames(1);
    for j=2:PK_first_N
        primary_keys = strcat(primary_keys,",",colnames(j));
    
    end
    create_metric_table = strcat("create table IF NOT EXISTS ", table_name ...
    ,'(', cols  ,...
    ", PRIMARY KEY (",primary_keys,"), CONSTRAINT UPair  UNIQUE(",primary_keys,") )");
    
    if DROP_TABLES
       disp(fprintf("Dropping %s",table_name));
        utils.drop_table(conn,table_name);
        disp(fprintf("Dropped %s",table_name));
    end
     disp(create_metric_table);
    exec(conn,char(create_metric_table));
end

