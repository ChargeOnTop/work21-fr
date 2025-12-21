'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MessageCircle, Github } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <Mail className="w-16 h-16 text-accent-green mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-white mb-4">Контакты</h1>
        <p className="text-gray-400 mb-8">
          Свяжитесь с нами любым удобным способом:
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 text-accent-green" />
            <a href="mailto:hello@work21.ru" className="text-accent-green hover:underline">
              hello@work21.ru
            </a>
          </div>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-work21-card border border-work21-border flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-green/50 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-work21-card border border-work21-border flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-green/50 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
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

