/**
 * Feature Flags для WORK21
 * 
 * Настройка:
 *   1. В bro.config.js → секция features["work21-fr"]
 *   2. В BroJS админке → вкладка "Фичи"
 * 
 * API: getFeatureValue(pkg, featureName, defaultValue)
 */
import { getFeatureValue, getFeatures, getAllFeatures as getBroFeatures } from "@brojs/cli";

// Имя пакета из package.json
const PKG_NAME = "work21-fr";

// DEBUG: Посмотреть что приходит от BroJS
if (typeof window !== 'undefined') {
  console.log('[FEATURES DEBUG] window.__BROJS_CONFIG__:', (window as any).__BROJS_CONFIG__);
  console.log('[FEATURES DEBUG] getFeatures("work21-fr"):', getFeatures(PKG_NAME));
  console.log('[FEATURES DEBUG] getBroFeatures():', getBroFeatures());
}

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
 * Использует getFeatureValue(pkg, featureName, defaultValue) из @brojs/cli
 */
export function isFeatureEnabled(feature: FeatureFlag): boolean {
  // getFeatureValue(pkg, featureName, defaultValue)
  // Возвращает features[pkg][featureName] ?? defaultValue
  const value = getFeatureValue(PKG_NAME, feature, DEFAULT_FEATURES[feature]);
  
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
