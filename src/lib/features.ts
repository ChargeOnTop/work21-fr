/**
 * Feature Flags для WORK21
 * Управление функционалом через BroJS админку (раздел "Фичи")
 * 
 * Используем getFeatureValue для чтения фичей из раздела "Фичи" админки
 */
import { getFeatureValue, getConfigValue } from "@brojs/cli";

/**
 * Доступные feature flags
 */
export type FeatureFlag = 
  | 'ai_estimation'    // AI оценка проектов (GigaChat)
  | 'dark_mode'        // Тёмная тема
  | 'registration'     // Регистрация новых пользователей
  | 'new_dashboard'    // Новый дизайн дашборда
  | 'page_login'       // Страница входа
  | 'page_register'    // Страница регистрации
  | 'page_dashboard'   // Страница дашборда
  | 'page_projects'    // Страница проектов
  | 'page_profile';    // Страница профиля

/**
 * Значения по умолчанию для фичей
 */
const DEFAULT_FEATURES: Record<FeatureFlag, boolean> = {
  ai_estimation: true,
  dark_mode: true,
  registration: true,
  new_dashboard: false,
  page_login: true,
  page_register: true,
  page_dashboard: true,
  page_projects: true,
  page_profile: true,
};

/**
 * Проверить, включена ли фича
 * Использует getFeatureValue из @brojs/cli для раздела "Фичи" в админке
 * 
 * @param feature - название фичи (ключ в админке: features.{feature})
 * @returns true если фича включена
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  // Используем getFeatureValue для чтения из раздела "Фичи"
  const featureKey = `features.${feature}`;
  let featureValue = getFeatureValue(featureKey);
  
  // Fallback на getConfigValue если getFeatureValue не нашёл
  if (featureValue === undefined || featureValue === null) {
    const configKey = `work21-fr.features.${feature}`;
    featureValue = getConfigValue(configKey);
  }
  
  // Если значение не задано, используем дефолтное
  if (featureValue === undefined || featureValue === null || featureValue === '') {
    return DEFAULT_FEATURES[feature];
  }
  
  // Обрабатываем boolean
  if (typeof featureValue === 'boolean') {
    return featureValue;
  }
  
  // Преобразуем строку в boolean
  if (typeof featureValue === 'string') {
    const lower = featureValue.toLowerCase().trim();
    if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
      return false;
    }
    if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
      return true;
    }
  }
  
  return Boolean(featureValue);
}

/**
 * Получить все фичи
 */
export function getAllFeatures(): Record<FeatureFlag, boolean> {
  const features: Record<string, boolean> = {};
  for (const key of Object.keys(DEFAULT_FEATURES) as FeatureFlag[]) {
    features[key] = isFeatureEnabled(key);
  }
  return features as Record<FeatureFlag, boolean>;
}

/**
 * React хук для использования фичей
 */
export function useFeature(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

/**
 * Проверить, доступна ли страница
 */
export function isPageEnabled(page: string): boolean {
  const pageFeature = `page_${page}` as FeatureFlag;
  if (pageFeature in DEFAULT_FEATURES) {
    return isFeatureEnabled(pageFeature);
  }
  return true; // Страницы без фичи включены по умолчанию
}

export interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
