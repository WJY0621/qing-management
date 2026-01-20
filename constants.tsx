
import { Ingredient, Gender, Goal } from './types';

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: '1', name: '鸡胸肉', calories: 133, protein: 24.6, carbs: 0, fat: 3.2, category: '肉禽蛋' },
  { id: '2', name: '西兰花', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, category: '蔬菜' },
  { id: '3', name: '全麦面包', calories: 246, protein: 9, carbs: 45, fat: 3, category: '谷薯' },
  { id: '4', name: '牛油果', calories: 160, protein: 2, carbs: 9, fat: 15, category: '水果' },
  { id: '5', name: '鸡蛋', calories: 143, protein: 12.6, carbs: 1.1, fat: 9.5, category: '肉禽蛋' },
  { id: '6', name: '燕麦片', calories: 389, protein: 13, carbs: 67, fat: 7, category: '谷薯' },
  { id: '7', name: '牛肉', calories: 250, protein: 26, carbs: 0, fat: 15, category: '肉禽蛋' },
  { id: '8', name: '三文鱼', calories: 208, protein: 20, carbs: 0, fat: 13, category: '肉禽蛋' },
  { id: '9', name: '白米饭', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, category: '谷薯' },
  { id: '10', name: '红薯', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, category: '谷薯' },
  { id: '11', name: '菠菜', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: '蔬菜' },
  { id: '12', name: '香蕉', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, category: '水果' },
  { id: '13', name: '土豆', calories: 77, protein: 2, carbs: 17, fat: 0.1, category: '谷薯' },
  { id: '14', name: '玉米', calories: 86, protein: 3.2, carbs: 19, fat: 1.2, category: '谷薯' },
  { id: '15', name: '羊肉', calories: 294, protein: 25, carbs: 0, fat: 21, category: '肉禽蛋' },
  { id: '16', name: '西红柿', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, category: '蔬菜' },
  { id: '17', name: '黄瓜', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, category: '蔬菜' },
  { id: '18', name: '豆腐', calories: 81, protein: 8.1, carbs: 4.2, fat: 3.7, category: '肉禽蛋' },
  { id: '19', name: '鸡腿肉', calories: 181, protein: 18, carbs: 0, fat: 12, category: '肉禽蛋' },
  { id: '20', name: '意面', calories: 158, protein: 5.8, carbs: 31, fat: 0.9, category: '谷薯' },
  { id: '21', name: '混合坚果', calories: 607, protein: 20, carbs: 21, fat: 54, category: '油脂' },
  
  // 新增水果
  { id: '22', name: '苹果', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, category: '水果' },
  { id: '23', name: '葡萄', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, category: '水果' },
  { id: '24', name: '橙子', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, category: '水果' },
  { id: '25', name: '草莓', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, category: '水果' },
  { id: '26', name: '西瓜', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, category: '水果' },
  { id: '27', name: '桃子', calories: 39, protein: 0.9, carbs: 9.5, fat: 0.1, category: '水果' },
  { id: '28', name: '梨', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, category: '水果' },
  { id: '29', name: '蓝莓', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, category: '水果' },
  { id: '30', name: '猕猴桃', calories: 57, protein: 1.1, carbs: 15, fat: 0.5, category: '水果' },
  { id: '31', name: '火龙果', calories: 60, protein: 1.1, carbs: 15, fat: 0.5, category: '水果' },

  // 新增蔬菜
  { id: '32', name: '大白菜', calories: 13, protein: 1.5, carbs: 3.2, fat: 0.1, category: '蔬菜' },
  { id: '33', name: '生菜', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2, category: '蔬菜' },
  { id: '34', name: '胡萝卜', calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2, category: '蔬菜' },
  { id: '35', name: '洋葱', calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1, category: '蔬菜' },
  { id: '36', name: '青椒', calories: 20, protein: 0.9, carbs: 4.6, fat: 0.2, category: '蔬菜' },
  { id: '37', name: '茄子', calories: 25, protein: 1, carbs: 5.9, fat: 0.2, category: '蔬菜' },
  { id: '38', name: '冬瓜', calories: 12, protein: 0.4, carbs: 2.6, fat: 0.2, category: '蔬菜' },
  { id: '39', name: '芹菜', calories: 16, protein: 0.7, carbs: 3, fat: 0.2, category: '蔬菜' },
  { id: '40', name: '南瓜', calories: 26, protein: 1, carbs: 6.5, fat: 0.1, category: '蔬菜' },
  { id: '41', name: '蘑菇', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3, category: '蔬菜' },

  // 新增肉类/水产
  { id: '42', name: '猪肉(瘦)', calories: 143, protein: 20, carbs: 1.5, fat: 6.2, category: '肉禽蛋' },
  { id: '43', name: '鸭肉', calories: 240, protein: 18, carbs: 0, fat: 19, category: '肉禽蛋' },
  { id: '44', name: '虾仁', calories: 85, protein: 20, carbs: 0, fat: 0.5, category: '肉禽蛋' },
  { id: '45', name: '鳕鱼', calories: 82, protein: 18, carbs: 0, fat: 0.7, category: '肉禽蛋' },
  { id: '46', name: '鲈鱼', calories: 105, protein: 19, carbs: 0, fat: 3, category: '肉禽蛋' },
  { id: '47', name: '牛排', calories: 165, protein: 20, carbs: 0, fat: 9, category: '肉禽蛋' },
  { id: '48', name: '鸡翅', calories: 203, protein: 17, carbs: 0, fat: 15, category: '肉禽蛋' },

  // 新增油脂/调料
  { id: '49', name: '橄榄油', calories: 884, protein: 0, carbs: 0, fat: 100, category: '油脂' },
  { id: '50', name: '花生油', calories: 899, protein: 0, carbs: 0, fat: 100, category: '油脂' },
  { id: '51', name: '大豆油', calories: 884, protein: 0, carbs: 0, fat: 100, category: '油脂' },
  { id: '52', name: '猪油', calories: 897, protein: 0, carbs: 0, fat: 100, category: '油脂' },
  { id: '53', name: '黄油', calories: 717, protein: 0.9, carbs: 0.1, fat: 81, category: '油脂' },
  { id: '54', name: '酱油', calories: 53, protein: 8, carbs: 5, fat: 0, category: '调料' },
  { id: '55', name: '蚝油', calories: 115, protein: 4, carbs: 25, fat: 0, category: '调料' },
  { id: '56', name: '料酒', calories: 80, protein: 0, carbs: 5, fat: 0, category: '调料' },
  { id: '57', name: '白糖', calories: 400, protein: 0, carbs: 100, fat: 0, category: '调料' },
  { id: '58', name: '醋', calories: 30, protein: 0, carbs: 3, fat: 0, category: '调料' },

  // --- 新增扩展食材库 (Grains, Leafy/Root Vegetables, various Meats/Seafood, Soy Products, Nuts, Condiments) ---
  // 谷薯类
  { id: '59', name: '糙米', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, category: '谷薯' },
  { id: '60', name: '小米', calories: 358, protein: 9, carbs: 75, fat: 3.1, category: '谷薯' },
  { id: '61', name: '紫薯', calories: 132, protein: 1.6, carbs: 30, fat: 0.4, category: '谷薯' },
  { id: '62', name: '山药', calories: 57, protein: 1.9, carbs: 12, fat: 0.2, category: '谷薯' },
  { id: '63', name: '全麦粉', calories: 340, protein: 13, carbs: 72, fat: 2.5, category: '谷薯' },
  { id: '64', name: '荞麦面', calories: 335, protein: 9, carbs: 73, fat: 2, category: '谷薯' },
  { id: '65', name: '乌冬面', calories: 126, protein: 2.5, carbs: 27, fat: 0.4, category: '谷薯' },
  { id: '66', name: '馒头', calories: 221, protein: 7, carbs: 47, fat: 1.1, category: '谷薯' },
  { id: '67', name: '花卷', calories: 211, protein: 6.4, carbs: 45, fat: 1, category: '谷薯' },
  { id: '68', name: '红豆', calories: 329, protein: 19, carbs: 63, fat: 0.5, category: '谷薯' },
  { id: '69', name: '绿豆', calories: 329, protein: 21, carbs: 62, fat: 1, category: '谷薯' },
  { id: '70', name: '芋头', calories: 56, protein: 1.5, carbs: 12, fat: 0.2, category: '谷薯' },

  // 蔬菜类
  { id: '71', name: '油麦菜', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.4, category: '蔬菜' },
  { id: '72', name: '空心菜', calories: 20, protein: 2.2, carbs: 3.6, fat: 0.3, category: '蔬菜' },
  { id: '73', name: '娃娃菜', calories: 13, protein: 1.5, carbs: 2.4, fat: 0.1, category: '蔬菜' },
  { id: '74', name: '韭菜', calories: 26, protein: 2.4, carbs: 4.2, fat: 0.4, category: '蔬菜' },
  { id: '75', name: '莲藕', calories: 73, protein: 1.9, carbs: 16, fat: 0.2, category: '蔬菜' },
  { id: '76', name: '竹笋', calories: 23, protein: 2.6, carbs: 3.6, fat: 0.2, category: '蔬菜' },
  { id: '77', name: '金针菇', calories: 32, protein: 2.4, carbs: 6, fat: 0.4, category: '蔬菜' },
  { id: '78', name: '木耳', calories: 265, protein: 12, carbs: 65, fat: 1.5, category: '蔬菜' },
  { id: '79', name: '海带', calories: 13, protein: 1.2, carbs: 2.1, fat: 0.1, category: '蔬菜' },
  { id: '80', name: '紫菜', calories: 264, protein: 24, carbs: 43, fat: 0.9, category: '蔬菜' },
  { id: '81', name: '苦瓜', calories: 22, protein: 1, carbs: 4.9, fat: 0.1, category: '蔬菜' },
  { id: '82', name: '丝瓜', calories: 20, protein: 1, carbs: 4.2, fat: 0.2, category: '蔬菜' },
  { id: '83', name: '芦笋', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1, category: '蔬菜' },
  { id: '84', name: '菜花', calories: 25, protein: 1.9, carbs: 4.9, fat: 0.3, category: '蔬菜' },
  { id: '85', name: '豆芽', calories: 12, protein: 1.3, carbs: 2.1, fat: 0.1, category: '蔬菜' },

  // 水果类
  { id: '86', name: '芒果', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, category: '水果' },
  { id: '87', name: '菠萝', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, category: '水果' },
  { id: '88', name: '樱桃', calories: 63, protein: 1.1, carbs: 16, fat: 0.2, category: '水果' },
  { id: '89', name: '柚子', calories: 42, protein: 0.8, carbs: 10, fat: 0.1, category: '水果' },
  { id: '90', name: '柠檬', calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3, category: '水果' },
  { id: '91', name: '木瓜', calories: 43, protein: 0.5, carbs: 11, fat: 0.3, category: '水果' },
  { id: '92', name: '哈密瓜', calories: 34, protein: 0.8, carbs: 8.2, fat: 0.2, category: '水果' },
  { id: '93', name: '荔枝', calories: 66, protein: 0.8, carbs: 16, fat: 0.4, category: '水果' },
  { id: '94', name: '桂圆', calories: 71, protein: 1.2, carbs: 16, fat: 0.1, category: '水果' },
  { id: '95', name: '山竹', calories: 73, protein: 0.4, carbs: 18, fat: 0.6, category: '水果' },

  // 肉禽蛋奶
  { id: '96', name: '牛腩', calories: 332, protein: 16, carbs: 0, fat: 29, category: '肉禽蛋' },
  { id: '97', name: '牛腱子', calories: 106, protein: 22, carbs: 0, fat: 1.8, category: '肉禽蛋' },
  { id: '98', name: '羊排', calories: 203, protein: 19, carbs: 0, fat: 14, category: '肉禽蛋' },
  { id: '99', name: '排骨', calories: 277, protein: 17, carbs: 0, fat: 23, category: '肉禽蛋' },
  { id: '100', name: '鸭腿', calories: 213, protein: 16, carbs: 0, fat: 16, category: '肉禽蛋' },
  { id: '101', name: '鹅肉', calories: 251, protein: 17, carbs: 0, fat: 19, category: '肉禽蛋' },
  { id: '102', name: '鹌鹑蛋', calories: 160, protein: 13, carbs: 2, fat: 11, category: '肉禽蛋' },
  { id: '103', name: '牛奶', calories: 54, protein: 3, carbs: 4.8, fat: 3.2, category: '肉禽蛋' },
  { id: '104', name: '酸奶', calories: 70, protein: 3.2, carbs: 9.8, fat: 2.7, category: '肉禽蛋' },
  { id: '105', name: '奶酪', calories: 328, protein: 25, carbs: 3, fat: 24, category: '肉禽蛋' },

  // 水产海鲜
  { id: '106', name: '鲫鱼', calories: 108, protein: 17, carbs: 0, fat: 4, category: '肉禽蛋' },
  { id: '107', name: '草鱼', calories: 113, protein: 16, carbs: 0, fat: 5.2, category: '肉禽蛋' },
  { id: '108', name: '带鱼', calories: 127, protein: 17, carbs: 0, fat: 4.9, category: '肉禽蛋' },
  { id: '109', name: '鱿鱼', calories: 75, protein: 15, carbs: 0, fat: 1.3, category: '肉禽蛋' },
  { id: '110', name: '蛤蜊', calories: 62, protein: 10, carbs: 3, fat: 1, category: '肉禽蛋' },
  { id: '111', name: '扇贝', calories: 60, protein: 11, carbs: 2, fat: 0.8, category: '肉禽蛋' },
  { id: '112', name: '蟹肉', calories: 103, protein: 17, carbs: 0, fat: 2.6, category: '肉禽蛋' },

  // 豆制品
  { id: '113', name: '豆浆', calories: 14, protein: 1.8, carbs: 1.1, fat: 0.7, category: '肉禽蛋' },
  { id: '114', name: '豆干', calories: 140, protein: 16, carbs: 4, fat: 7, category: '肉禽蛋' },
  { id: '115', name: '腐竹', calories: 459, protein: 44, carbs: 22, fat: 21, category: '肉禽蛋' },
  { id: '116', name: '油豆腐', calories: 244, protein: 17, carbs: 4, fat: 17, category: '肉禽蛋' },

  // 坚果/零食
  { id: '117', name: '核桃', calories: 654, protein: 15, carbs: 13, fat: 65, category: '油脂' },
  { id: '118', name: '杏仁', calories: 579, protein: 21, carbs: 21, fat: 49, category: '油脂' },
  { id: '119', name: '腰果', calories: 553, protein: 18, carbs: 30, fat: 43, category: '油脂' },
  { id: '120', name: '瓜子', calories: 584, protein: 20, carbs: 20, fat: 50, category: '油脂' },
  { id: '121', name: '黑巧克力', calories: 546, protein: 5, carbs: 61, fat: 31, category: '油脂' },

  // 调料/酱汁
  { id: '122', name: '豆瓣酱', calories: 89, protein: 6, carbs: 12, fat: 2, category: '调料' },
  { id: '123', name: '辣椒酱', calories: 80, protein: 2, carbs: 8, fat: 5, category: '调料' },
  { id: '124', name: '芝麻酱', calories: 618, protein: 20, carbs: 22, fat: 52, category: '调料' },
  { id: '125', name: '番茄酱', calories: 80, protein: 1.5, carbs: 18, fat: 0, category: '调料' },
  { id: '126', name: '咖喱块', calories: 500, protein: 5, carbs: 40, fat: 35, category: '调料' },
  { id: '127', name: '花椒油', calories: 890, protein: 0, carbs: 0, fat: 99, category: '油脂' },
];

export const GOAL_CONFIG = {
  [Goal.BUILD_MUSCLE]: {
    label: '增肌',
    description: '科学盈余热量，助力肌肉生长',
    icon: 'fitness_center',
    proteinRatio: 0.3,
    carbsRatio: 0.5,
    fatRatio: 0.2,
  },
  [Goal.FAT_LOSS]: {
    label: '减脂',
    description: '制造热量缺口，高效燃烧脂肪',
    icon: 'local_fire_department',
    proteinRatio: 0.4,
    carbsRatio: 0.35,
    fatRatio: 0.25,
  },
  [Goal.MAINTAIN]: {
    label: '保持',
    description: '均衡营养摄入，维持身体最佳状态',
    icon: 'favorite',
    proteinRatio: 0.25,
    carbsRatio: 0.5,
    fatRatio: 0.25,
  }
};
