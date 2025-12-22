/**
 * FeatureGate - компонент для условного рендеринга на основе feature flags
 */
import React from 'react';
import { isFeatureEnabled, FeatureFlag } from '../lib/features';

interface FeatureGateProps {
  /** Название фичи */
  feature: FeatureFlag;
  /** Контент, который показывается если фича включена */
  children: React.ReactNode;
  /** Контент, который показывается если фича выключена (опционально) */
  fallback?: React.ReactNode;
}

/**
 * Компонент-обёртка для условного рендеринга на основе feature flags
 * 
 * @example
 * // Показать только если AI оценка включена
 * <FeatureGate feature="ai_estimation">
 *   <AIEstimationButton />
 * </FeatureGate>
 * 
 * @example
 * // Показать альтернативный контент если фича выключена
 * <FeatureGate 
 *   feature="registration" 
 *   fallback={<p>Регистрация временно недоступна</p>}
 * >
 *   <RegisterForm />
 * </FeatureGate>
 */
export function FeatureGate({ feature, children, fallback = null }: FeatureGateProps): React.ReactElement | null {
  const isEnabled = isFeatureEnabled(feature);
  
  if (isEnabled) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}

/**
 * HOC для оборачивания компонентов с feature flag
 */
export function withFeature<P extends object>(
  Component: React.ComponentType<P>,
  feature: FeatureFlag,
  FallbackComponent?: React.ComponentType<P>
): React.FC<P> {
  return function WrappedComponent(props: P) {
    const isEnabled = isFeatureEnabled(feature);
    
    if (isEnabled) {
      return <Component {...props} />;
    }
    
    if (FallbackComponent) {
      return <FallbackComponent {...props} />;
    }
    
    return null;
  };
}

export default FeatureGate;

