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
  // Пробуем разные форматы ключей
  const key1 = `work21-fr.features.${feature}`;
  const key2 = `features.${feature}`;
  
  let configValue = getConfigValue(key1);
  
  // Если не нашли с префиксом, пробуем без
  if (configValue === undefined || configValue === null) {
    configValue = getConfigValue(key2);
  }
  
  // Отладка (можно убрать в продакшене)
  if (typeof window !== 'undefined' && (window as any).__FEATURE_DEBUG__) {
    console.log(`[Feature] ${feature}:`, { key1, key2, configValue, type: typeof configValue });
  }
  
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
    // false, 0, "false", "0", "no", "off" = выключено
    if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
      return false;
    }
    // true, 1, "true", "1", "yes", "on" = включено
    if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
      return true;
    }
  }
  
  // Fallback
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
 * Включить отладку feature flags в консоли браузера
 * Вызовите в консоли: window.__FEATURE_DEBUG__ = true
 * Затем перезагрузите страницу
 */
export function enableFeatureDebug(): void {
  if (typeof window !== 'undefined') {
    (window as any).__FEATURE_DEBUG__ = true;
    console.log('[Feature] Debug enabled. Reload the page to see logs.');
  }
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
