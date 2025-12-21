'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Headphones } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <Headphones className="w-16 h-16 text-accent-green mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Поддержка</h1>
        <p className="text-gray-400 mb-8">
          Наша служба поддержки работает 24/7. Если у вас возникли вопросы или проблемы, 
          свяжитесь с нами:
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <span className="text-accent-green">Email:</span>
            <a href="mailto:support@work21.ru" className="text-accent-green hover:underline">
              support@work21.ru
            </a>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-green text-white hover:bg-accent-green/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

