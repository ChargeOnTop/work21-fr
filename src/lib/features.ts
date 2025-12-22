/**
 * Feature Flags для WORK21
 * Управление функционалом через BroJS админку
 */
import { getFeatureValue, getConfigValue } from "@brojs/cli";

/**
 * Доступные feature flags
 */
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

/**
 * Значения по умолчанию
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
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  // Пробуем разные варианты ключей
  const keys = [
    `features.${feature}`,
    feature,
    `work21-fr.features.${feature}`,
    `work21-fr.${feature}`,
  ];
  
  let value: any = undefined;
  let usedKey = '';
  
  // Пробуем getFeatureValue
  for (const key of keys) {
    const v = getFeatureValue(key);
    if (v !== undefined && v !== null) {
      value = v;
      usedKey = `getFeatureValue("${key}")`;
      break;
    }
  }
  
  // Если не нашли через getFeatureValue, пробуем getConfigValue
  if (value === undefined || value === null) {
    for (const key of keys) {
      const v = getConfigValue(key);
      if (v !== undefined && v !== null) {
        value = v;
        usedKey = `getConfigValue("${key}")`;
        break;
      }
    }
  }
  
  // Логируем для отладки
  console.log(`[Feature] ${feature}:`, {
    value,
    type: typeof value,
    usedKey: usedKey || 'DEFAULT',
  });
  
  // Если не нашли - используем дефолт
  if (value === undefined || value === null || value === '') {
    return DEFAULT_FEATURES[feature];
  }
  
  // Boolean
  if (typeof value === 'boolean') {
    return value;
  }
  
  // String -> Boolean
  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'false' || lower === '0' || lower === 'no' || lower === 'off') {
      return false;
    }
    if (lower === 'true' || lower === '1' || lower === 'yes' || lower === 'on') {
      return true;
    }
  }
  
  return Boolean(value);
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
