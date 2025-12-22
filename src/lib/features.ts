/**
 * Feature Flags для WORK21
 * 
 * Настройка в BroJS админке → вкладка "Фичи"
 * 
 * Формат в BroJS:
 *   features["work21-fr"]["features.dark_mode"] = {on: true, value: "true"}
 */

// Имя пакета из package.json
const PKG_NAME = "work21-fr";

/**
 * Все доступные фичи
 * 
 * ОСНОВНЫЕ:
 * - dark_mode: Кнопка переключения темы
 * - registration: Форма регистрации
 * - ai_estimation: AI оценка проектов (GigaChat)
 * 
 * ГЛАВНАЯ СТРАНИЦА:
 * - hero_stats: Статистика на главной (9000+ студентов, 500+ проектов)
 * - cta_section: Блок призыва к действию
 * 
 * ВХОД (LOGIN):
 * - forgot_password: Ссылка "Забыли пароль?"
 * - quick_role_select: Быстрый выбор роли (Я студент / Я заказчик)
 * 
 * РЕГИСТРАЦИЯ (REGISTER):
 * - registration: Форма регистрации (основная)
 * 
 * ДАШБОРД:
 * - dashboard_stats: Блок статистики пользователя
 * - dashboard_recommendations: Рекомендованные проекты
 * - dashboard_quick_actions: Быстрые действия
 * 
 * ПРОЕКТЫ:
 * - project_tech_stack: Отображение технологий проекта
 * - project_tasks: Отображение задач проекта
 * - project_requirements: Отображение требований
 * 
 * ПРОФИЛЬ:
 * - profile_avatar: Загрузка/отображение аватара
 * - profile_skills: Редактирование навыков
 * - profile_verification: Блок верификации
 * 
 * СОЗДАНИЕ ПРОЕКТА:
 * - ai_estimation: AI оценка времени (основная)
 * - project_deadline: Выбор дедлайна
 * - project_tech_select: Выбор технологий
 */
export type FeatureFlag = 
  // Основные
  | 'dark_mode'
  | 'registration'
  | 'ai_estimation'
  // Главная
  | 'hero_stats'
  | 'cta_section'
  // Login
  | 'forgot_password'
  | 'quick_role_select'
  // Dashboard
  | 'dashboard_stats'
  | 'dashboard_recommendations'
  | 'dashboard_quick_actions'
  // Projects
  | 'project_tech_stack'
  | 'project_tasks'
  | 'project_requirements'
  // Profile
  | 'profile_avatar'
  | 'profile_skills'
  | 'profile_verification'
  // New Project
  | 'project_deadline'
  | 'project_tech_select';

const DEFAULT_FEATURES: Record<FeatureFlag, boolean> = {
  // Основные
  dark_mode: true,
  registration: true,
  ai_estimation: true,
  // Главная
  hero_stats: true,
  cta_section: true,
  // Login
  forgot_password: true,
  quick_role_select: true,
  // Dashboard
  dashboard_stats: true,
  dashboard_recommendations: true,
  dashboard_quick_actions: true,
  // Projects
  project_tech_stack: true,
  project_tasks: true,
  project_requirements: true,
  // Profile
  profile_avatar: true,
  profile_skills: true,
  profile_verification: true,
  // New Project
  project_deadline: true,
  project_tech_select: true,
};

/**
 * Получить модуль BroJS через System.get
 */
function getBroModule(): any {
  if (typeof window === 'undefined') return null;
  try {
    if (typeof (window as any).System !== 'undefined') {
      return (window as any).System.get('https://brojs.ru/virtual-module.js');
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Проверить, включена ли фича
 * Читает из BroJS админки через System.get
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  const broModule = getBroModule();
  
  if (broModule && broModule.getFeatures) {
    const features = broModule.getFeatures(PKG_NAME);
    
    // Ключ в формате "features.dark_mode"
    const featureKey = `features.${feature}`;
    const featureData = features?.[featureKey];
    
    if (featureData && typeof featureData === 'object') {
      // Структура: {on: boolean, value: string}
      const value = featureData.value;
      
      if (typeof value === 'string') {
        const lower = value.toLowerCase().trim();
        return lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on';
      }
      
      if (typeof value === 'boolean') {
        return value;
      }
    }
  }
  
  // Дефолтное значение если BroJS недоступен
  return DEFAULT_FEATURES[feature];
}

export function getAllFeatures(): Record<FeatureFlag, boolean> {
  const features: Record<string, boolean> = {};
  for (const key of Object.keys(DEFAULT_FEATURES) as FeatureFlag[]) {
    features[key] = isFeatureEnabled(key);
  }
  return features as Record<FeatureFlag, boolean>;
}

export function useFeature(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

export interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
