/**
 * Feature Flags для WORK21
 * Управление функционалом через BroJS админку (раздел "Конфиг")
 * 
 * В админке добавляйте ключи в формате:
 *   features.dark_mode = false
 *   features.ai_estimation = true
 */
import { getConfigValue } from "@brojs/cli";

/**
 * Доступные feature flags
 */
export type FeatureFlag = 
  | 'ai_estimation'    // AI оценка проектов (GigaChat)
  | 'dark_mode'        // Тёмная тема
  | 'registration'     // Регистрация новых пользователей
  | 'new_dashboard';   // Новый дизайн дашборда

/**
 * Значения по умолчанию для фичей
 */
const DEFAULT_FEATURES: Record<FeatureFlag, boolean> = {
  ai_estimation: true,
  dark_mode: true,
  registration: true,
  new_dashboard: false,
};

/**
 * Проверить, включена ли фича
 * @param feature - название фичи
 * @returns true если фича включена
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  // Ключ в формате: work21-fr.features.dark_mode
  const key = `work21-fr.features.${feature}`;
  const configValue = getConfigValue(key);
  
  // Если значение не задано в конфиге, используем дефолтное
  if (configValue === undefined || configValue === null || configValue === '') {
    return DEFAULT_FEATURES[feature];
  }
  
  // Обрабатываем boolean
  if (typeof configValue === 'boolean') {
    return configValue;
  }
  
  // Преобразуем строку в boolean
  if (typeof configValue === 'string') {
    const lower = configValue.toLowerCase().trim();
    if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
      return false;
    }
    if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
      return true;
    }
  }
  
  return Boolean(configValue);
}

/**
 * Получить все фичи
 */
export function getAllFeatures(): Record<FeatureFlag, boolean> {
  return {
    ai_estimation: isFeatureEnabled('ai_estimation'),
    dark_mode: isFeatureEnabled('dark_mode'),
    registration: isFeatureEnabled('registration'),
    new_dashboard: isFeatureEnabled('new_dashboard'),
  };
}

/**
 * React хук для использования фичей
 */
export function useFeature(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

export interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
