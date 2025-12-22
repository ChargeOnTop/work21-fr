/**
 * Feature Flags для WORK21
 * 
 * Настройка в BroJS админке → вкладка "Фичи"
 * 
 * Формат в BroJS:
 *   features["work21-fr"]["features.dark_mode"] = {on: true, value: "false"}
 */

// Имя пакета из package.json
const PKG_NAME = "work21-fr";

export type FeatureFlag = 
  | 'ai_estimation'
  | 'dark_mode'
  | 'registration'
  | 'new_dashboard'
  | 'page_login'
  | 'page_register'
  | 'page_dashboard'
  | 'page_projects'
  | 'page_profile';

const DEFAULT_FEATURES: Record<FeatureFlag, boolean> = {
  ai_estimation: true,
  dark_mode: false,      // По умолчанию выключено, включается через фичу
  registration: true,
  new_dashboard: false,
  page_login: true,
  page_register: true,
  page_dashboard: true,
  page_projects: true,
  page_profile: true,
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
    
    // DEBUG
    console.log(`[isFeatureEnabled] feature=${feature}, key=${featureKey}, data=`, featureData);
    
    if (featureData && typeof featureData === 'object') {
      // Структура: {on: boolean, value: string}
      // value может быть "true" или "false" как строка
      const value = featureData.value;
      
      if (typeof value === 'string') {
        const lower = value.toLowerCase().trim();
        const result = lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on';
        console.log(`[isFeatureEnabled] value="${value}" -> result=${result}`);
        return result;
      }
      
      if (typeof value === 'boolean') {
        console.log(`[isFeatureEnabled] value=${value} (boolean)`);
        return value;
      }
    }
  } else {
    console.log('[isFeatureEnabled] broModule not available, using default');
  }
  
  // Дефолтное значение если BroJS недоступен
  console.log(`[isFeatureEnabled] using default: ${DEFAULT_FEATURES[feature]}`);
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

export function isPageEnabled(page: string): boolean {
  const pageFeature = `page_${page}` as FeatureFlag;
  if (pageFeature in DEFAULT_FEATURES) {
    return isFeatureEnabled(pageFeature);
  }
  return true;
}

export interface FeatureGateProps {
  feature: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
