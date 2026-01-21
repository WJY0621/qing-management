-- 更新现有的白米饭为熟米饭
UPDATE ingredients 
SET name = '米饭(熟)' 
WHERE name = '白米饭' OR name = '米饭';

-- 插入大米(生)，如果不存在的话
INSERT INTO ingredients (name, calories, protein, carbs, fat, category)
SELECT '大米(生)', 346, 7.9, 77, 0.9, '谷薯'
WHERE NOT EXISTS (
    SELECT 1 FROM ingredients WHERE name = '大米(生)'
);
