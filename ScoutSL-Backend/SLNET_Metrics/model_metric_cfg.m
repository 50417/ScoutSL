classdef model_metric_cfg < handle
    properties(Constant)
        % choose one
        %project_source = 'Tutorial';
        project_source = 'GitHub';
        %project_source = 'MATC';
        %project_source = 'Others';
        %project_source = 'All';
        %project_source = 'sourceforge';
    end
    properties
        % How to use properties : https://www.mathworks.com/help/matlab/matlab_oop/how-to-use-properties.html
        % NOTE : Constant properties val cant be obtained using get methods
        % path to ... /SLNET_METRICS/
        SCRIPT_LOCATION = ''


        %  Simulink models Zip files  directory to be analyzed
        %directory where the Simulink projects(in zip format) are stored
        source_dir = ''


        %directory where the sqlite database which contains metadata tables
        %are. Ideally we want to store in the same db that Slnet-miner populates project metadata.
        dbfile  = ''


        %New/Existing table Where Simulink model metrics(Block_Count) will be stored
        table_name;

        %Main table that consists of metadata from the source where the
        %simulink projects is collected from
        foreign_table_name ;

        block_metric_table_name ;
        block_metric_foreign_table_name ;


        %DEBUG MODE:
        DROP_TABLES = false %drop all existing tables and calculates metrics from scratch
        DEBUG = true %debug mode % prints to the console if TRUE

        PROCESS_LIBRARY = false % non compiled metrics can be extracted from the library.
        %optional
        tmp_unzipped_dir = ''; %Stores UnZipped Files in this directory % Defaults to  current directory with folder tmp/
        %unused right now
        report_dir = ''; %Creates a file and stores results in this directory
        %project_id-model_name
        project_models_to_skip = ["26116-pid",...
            "47593-BuoySimulinkExample",...
            "47593-findBuoySimulinkSoftRealTimeExample",...
            "47593-findBuoySimulinkExample",...
            "11092-NodeSpecialCase",...
            "12136324-pfb_core",...
            "124572926-statespace",... % crashes R2022b Ubuntu
            "139797839-Wind_Turbine",...% crashes R2022b Ubuntu
            "141117695-test_1d",...% crashes R2022b Ubuntu
            "150327128-ss",...% crashes R2022b Ubuntu
            "152409754-mlepSimulink_example",... ask for some external library location.
            "157036846-final_net_simout",...% crashes R2022b Ubuntu
            "157037879-final_net_simoutEnumerated",...% crashes R2022b Ubuntu
            "157037879-final_net_simout",...% crashes R2022b Ubuntu
            "166640870-pid",...% crashes R2022b Ubuntu
            "171761058-fft_2019_rord",...% crashes R2022b Ubuntu
            "186524330-pid",...% crashes R2022b Ubuntu
            "190654756-LDW_mask",...% crashes R2022b Ubuntu
            "192390717-statespace",...% crashes R2022b Ubuntu
            "214022845-TCPIO",... %hangs forever
            "217929608-sim_sys",... %hangs forever
            "228373688-domt_2048ch_600mhzdomt_2048ch_600mhz",... %hangs forever
            "233537763-statespace",...% crashes R2022b Ubuntu
            "241908173-HDS_Room",... %hangs forever
    	    "274546432-serial",... %crashes R2022b Ubuntu
    	    "279564825-sm_car",... %hangs forever
            "279564825-Vehicle_Axle1",... %hangs forever
            "279564825-Vehicle_Axle2",... %hangs forever
            "279564825-Vehicle_Axle3",... %hangs forever
            "279870137-pid",... %crashes R2022b Ubuntu
            "298660405-xNeuralSim",... %hangs forever
            "39575985-pid",... %crashes R2022b Ubuntu
            "40256740-StateSpaceModel",... %crashes R2022b Ubuntu
            "40620585-fuzzy",... %crashes R2022b Ubuntu
            "407381023-QRS_Detector_Library",... %hangs forever
            "417470956-pid",... %crashes R2022b Ubuntu
            "428160656-Sample1001",... %crashes R2022b Ubuntu
            "428160656-Sample170",... %crashes R2022b Ubuntu
            "428160656-Sample215",...
            "476618083-ControllerTuneLianxi",... %crashes R2022b Ubuntu
            "478238997-DYN_02x",... %hangs forever
            "484369913-SensorTryout",... %hangs forever
            "502259524-rct_ulinearize_builtin",... %crashes R2022b Ubuntu
            "507568076-pid",... %crashes R2022b Ubuntu
            "511701062-half",... %crashes R2022b Ubuntu
            "511701062-statespace",... %crashes R2022b Ubuntu
            "530381919-xNeuralSim",... %hangs forever
            "536469948-kuka_sim",... %hangs forever
            "539937330-LKA",... %hangs forever
            "541560084-darkd6",... %hangs forever
            "541560084-darksc2",... %hangs forever
            "541560084-darktriad3",... %hangs forever
            "552315863-ss",... %crashes R2022b Ubuntu
            "552315863-tf",... %crashes R2022b Ubuntu
            "593337370-graph",... %crashes R2022b Ubuntu
            "599230354-ForwardVehicleSensorFusionTestBench",... %hangs forever
            "61990691-pid",... %crashes R2022b Ubuntu
            "64223824-Ghost",... %hangs forever
            "64843071-task11",... %crashes R2022b Ubuntu
            "71217245-monroe_library",... %hangs forever
            "76393928-pid",... %crashes R2022b Ubuntu
            "76442734-pid",... %crashes R2022b Ubuntu
            "80701465-r2_b16a4x512f",... %hangs forever
            "80701465-r2_b16a4x64f",... %hangs forever
            "85605763-CaseD",... %crashes R2022b Ubuntu
            "89303330-fzxt4_3",... %hangs forever
            "90823362-pid",... %crashes R2022b Ubuntu
            "97022596-test_1d",...
            "541560084-empty",... %crashes R2022b Ubuntu
            "575232128-chapter2_5",... %hangs forever
            "80701465-fft_async_test_sim_CT",... %hangs forever
            "80701465-fft_async_test_sim_FD",... %hangs forever
            "428160656-Sample231",... %crashes R2022b Ubuntu
            "428160656-Sample274",... %crashes R2022b Ubuntu
            "428160656-Sample295",... %crashes R2022b Ubuntu
            "428160656-Sample299",... %crashes R2022b Ubuntu
            ]

    end
    methods
        %Constructor
        function obj = model_metric_cfg()
            %New/Existing table Where Simulink model metrics(Block_Count) will be stored
            obj.table_name = [obj.project_source '_Models'];

            %Main table that consists of metadata from the source where the
            %simulink projects is collected from
            obj.foreign_table_name = strcat(obj.project_source,'_Projects');

            obj.block_metric_table_name = strcat(obj.project_source,'_Blocks');
            obj.block_metric_foreign_table_name = strcat(obj.project_source,'_Projects');


        end
    end

end
