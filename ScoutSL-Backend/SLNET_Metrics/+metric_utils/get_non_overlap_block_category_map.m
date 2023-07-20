function [blk_category_map] = get_non_overlap_block_category_map(block_lib_map)
blocks = keys(block_lib_map);

blk_category_map = containers.Map();
categories = java.util.HashSet;

for i = 1:length(blocks)
    lib = block_lib_map(blocks{i}); % cell
    blk_type = blocks{i};
    category = metric_utils.get_block_category(blk_type,lib{1},true);
    categories.add(category);
    if ~isKey(blk_category_map,category)
        blk_category_map(category) = java.util.HashSet;
        blk_category_map(category).add(blk_type);
    else
        blk_category_map(category).add(blk_type);
    end

end
blk_category_map('Structural').add('Reference');
blk_category_map('Trigger').add('ActionPort');
overlaped = utils.does_map_contain_overlaped_values(blk_category_map);
if overlaped
    error('Block Category map contain overlaped values.')
end
end

