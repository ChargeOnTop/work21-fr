/**
 * Feature Flags для WORK21
 * Управление функционалом через BroJS админку
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
  const configValue = getConfigValue(`work21-fr.features.${feature}`);
  
  // Если значение не задано в конфиге, используем дефолтное
  if (configValue === undefined || configValue === null) {
    return DEFAULT_FEATURES[feature];
  }
  
  // Преобразуем строку в boolean
  if (typeof configValue === 'string') {
    return configValue.toLowerCase() === 'true' || configValue === '1';
  }
  
  return Boolean(configValue);
}

/**
 * Получить все фичи
 * @returns объект со всеми фичами и их состояниями
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
 * React хук для использования фичей (если нужен реактивный подход)
 */
export function useFeature(feature: FeatureFlag): boolean {
  return isFeatureEnabled(feature);
}

/**
 * Компонент-обёртка для условного рендеринга
 */
export interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Примечание: FeatureGate компонент определён в components/FeatureGate.tsx

