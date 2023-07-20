%Extract Cyclomatic complexity %MOdels needs to be compilable 
function [cyclo_metric] = get_cyclomatic_complexity(model,analyzeLib)
        
    
        
        %save_system(model,model+_expanded)
        metric_engine = slmetric.Engine();
        %Simulink.BlockDiagram.expandSubsystem(block)
        setAnalysisRoot(metric_engine, 'Root',  model);
        metric_engine.AnalyzeModelReferences = 1;
        if analyzeLib
            metric_engine.AnalyzeLibraries = 1;
        else
            metric_engine.AnalyzeLibraries = 0;
        end
        mData ={'mathworks.metrics.CyclomaticComplexity'};
        try
            execute(metric_engine,mData);
        catch
            disp("Error Executing Slmetric API");
        end
        res_col = getMetrics(metric_engine,mData,'AggregationDepth','all');
        
        cyclo_metric = -1 ; %-1 denotes cyclomatic complexit is not computed at all
        for n=1:length(res_col)
            if res_col(n).Status == 0
                results = res_col(n).Results;

                for m=1:length(results)
                    
                    %disp(['MetricID: ',results(m).MetricID]);
                    %disp(['  ComponentPath: ',results(m).ComponentPath]);
                    %disp(['  Value: ',num2str(results(m).Value)]);
                    if strcmp(results(m).ComponentPath,model)
                        if strcmp(results(m).MetricID ,'mathworks.metrics.CyclomaticComplexity')
                            cyclo_metric =results(m).AggregatedValue;
                        end
                    end
                end
            else
                
                disp(['No results for:',res_col(n).MetricID]);
            end
            
        end
        

end