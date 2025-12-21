'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <Shield className="w-16 h-16 text-accent-green mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Политика конфиденциальности</h1>
        <p className="text-gray-400 mb-8">
          Раздел с политикой конфиденциальности находится в разработке. Скоро здесь появится 
          полный текст политики конфиденциальности платформы WORK21.
        </p>
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

