/**
 * Navigation Helper для WORK21
 * 
 * Позволяет управлять URL страниц через BroJS админку
 * без изменения кода и пересборки
 */

// Имя пакета
const PKG_NAME = "work21-fr";

// Дефолтные URL (используются если BroJS недоступен)
const DEFAULT_ROUTES = {
  main: "/work21-fr",
  login: "/work21-fr/login",
  register: "/work21-fr/register",
  dashboard: "/work21-fr/dashboard",
  "dashboard.projects": "/work21-fr/dashboard/projects",
  "dashboard.projects.new": "/work21-fr/dashboard/projects/new",
  "dashboard.applications": "/work21-fr/dashboard/applications",
  "dashboard.profile": "/work21-fr/dashboard/profile",
  "dashboard.settings": "/work21-fr/dashboard/settings",
  "dashboard.rating": "/work21-fr/dashboard/rating",
  "dashboard.students": "/work21-fr/dashboard/students",
} as const;

export type RouteKey = keyof typeof DEFAULT_ROUTES;

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
 * Получить URL для маршрута
 * Сначала пробует получить из BroJS админки, потом использует дефолт
 * 
 * @param route - ключ маршрута (например "dashboard.projects")
 * @returns URL маршрута
 */
export function getRoute(route: RouteKey): string {
  const broModule = getBroModule();
  
  if (broModule && broModule.getNavigationValue) {
    // Ключ в формате "work21-fr.dashboard.projects"
    const navKey = `${PKG_NAME}.${route}`;
    const url = broModule.getNavigationValue(navKey);
    
    if (url && typeof url === 'string') {
      return url;
    }
  }
  
  // Дефолтное значение
  return DEFAULT_ROUTES[route];
}

/**
 * Получить все маршруты
 */
export function getAllRoutes(): Record<RouteKey, string> {
  const routes: Record<string, string> = {};
  
  for (const key of Object.keys(DEFAULT_ROUTES) as RouteKey[]) {
    routes[key] = getRoute(key);
  }
  
  return routes as Record<RouteKey, string>;
}

/**
 * Проверить, доступен ли маршрут в навигации
 * Если маршрут удалён из BroJS админки — вернёт false
 */
export function isRouteAvailable(route: RouteKey): boolean {
  const broModule = getBroModule();
  
  if (broModule && broModule.getNavigationValue) {
    const navKey = `${PKG_NAME}.${route}`;
    const url = broModule.getNavigationValue(navKey);
    return url !== undefined && url !== null && url !== '';
  }
  
  // Если BroJS недоступен — считаем что все маршруты доступны
  return true;
}

/**
 * Хук-подобная функция для использования в компонентах
 * Возвращает объект с часто используемыми маршрутами
 */
export function useRoutes() {
  return {
    home: getRoute('main'),
    login: getRoute('login'),
    register: getRoute('register'),
    dashboard: getRoute('dashboard'),
    projects: getRoute('dashboard.projects'),
    newProject: getRoute('dashboard.projects.new'),
    applications: getRoute('dashboard.applications'),
    profile: getRoute('dashboard.profile'),
    settings: getRoute('dashboard.settings'),
    rating: getRoute('dashboard.rating'),
    students: getRoute('dashboard.students'),
  };
}

// Константы для удобства (статические дефолты)
export const ROUTES = DEFAULT_ROUTES;

