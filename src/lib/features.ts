/**
 * Feature Flags для WORK21
 * 
 * Настройка:
 *   1. В bro.config.js → секция features
 *   2. В BroJS админке → вкладка "Фичи"
 * 
 * Ключи: ai_estimation, dark_mode, registration, new_dashboard, page_*
 */
import { getFeatureValue } from "@brojs/cli";

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
 * Использует getFeatureValue из @brojs/cli
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  // Читаем из секции features в bro.config.js или BroJS админки
  const value = getFeatureValue(feature);
  
  // Если не задано - используем дефолт
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
    return !(lower === 'false' || lower === '0' || lower === 'no' || lower === 'off');
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
