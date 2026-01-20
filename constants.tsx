
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
