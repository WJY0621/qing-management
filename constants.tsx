
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
