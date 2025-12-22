'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, Home } from 'lucide-react';

interface PageDisabledProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

/**
 * Компонент-заглушка для отключенных страниц
 * Показывается когда page_* фича выключена в BroJS админке
 */
export default function PageDisabled({
  title = 'Страница недоступна',
  message = 'Эта страница временно отключена. Пожалуйста, попробуйте позже.',
  showBackButton = true,
  showHomeButton = true,
}: PageDisabledProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-gray-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>

        {/* Message */}
        <p className="text-gray-400 mb-8">{message}</p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg bg-work21-card border border-work21-border text-gray-300 hover:text-white hover:border-gray-500 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
          )}
          {showHomeButton && (
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-accent-green hover:bg-accent-green-dark text-white transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              На главную
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

