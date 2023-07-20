%Calculates model metrics. Models doesnot need to be compilable.
function [blk_count,agg_sub_count,subsys_count,subsys_depth,liblink_count]= get_non_compiled_metrics(model,inc_lib)
metric_engine = slmetric.Engine();
%Simulink.BlockDiagram.expandSubsystem(block)
setAnalysisRoot(metric_engine, 'Root',  model);
% Include referenced models and libraries in the analysis,
% these properties are on by default
metric_engine.AnalyzeModelReferences = 1;

if inc_lib
    metric_engine.AnalyzeLibraries = 1;
else
    metric_engine.AnalyzeLibraries = 0;
end

mData ={'mathworks.metrics.SimulinkBlockCount' ,'mathworks.metrics.SubSystemCount','mathworks.metrics.SubSystemDepth',...
    'mathworks.metrics.LibraryLinkCount'};
execute(metric_engine,mData)

res_col = getMetrics(metric_engine,mData,'AggregationDepth','all');
count =0;
blk_count =0;
depth=0;
agg_count=0;
liblink_count = 0;
for n=1:length(res_col)
    if res_col(n).Status == 0
        results = res_col(n).Results;

        for m=1:length(results)
            if strcmp(results(m).ComponentPath,model)
                if strcmp(results(m).MetricID ,'mathworks.metrics.SubSystemCount')
                    count = results(m).Value;
                    agg_count =results(m).AggregatedValue;
                elseif strcmp(results(m).MetricID,'mathworks.metrics.SubSystemDepth')
                    for j = 1: length(results)
                        tmp_depth =results(j).Value;
                        if tmp_depth >depth
                            depth=tmp_depth;
                        end
                    end
                elseif strcmp(results(m).MetricID,'mathworks.metrics.SimulinkBlockCount')
                    blk_count=results(m).AggregatedValue;
                elseif strcmp(results(m).MetricID,'mathworks.metrics.LibraryLinkCount')%Only for compilable models
                    liblink_count=results(m).AggregatedValue;
                end
            end
        end
    else
        disp(['No results for:',res_col(n).MetricID]);
    end

end
subsys_count = count;
subsys_depth = depth+1; % We are considering top level as 1, not zero
agg_sub_count = agg_count;
end