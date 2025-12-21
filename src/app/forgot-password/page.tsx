'use client';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки запроса
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться к входу
        </Link>

        <div className="glass-card rounded-2xl border border-work21-border p-8">
          <div className="text-center mb-8">
            <Mail className="w-12 h-12 text-accent-green mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Восстановление пароля</h1>
            <p className="text-gray-400 text-sm">
              Введите ваш email, и мы отправим инструкции по восстановлению пароля
            </p>
          </div>

          {success ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-accent-green" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Письмо отправлено!</h2>
              <p className="text-gray-400 text-sm mb-6">
                Проверьте вашу почту и следуйте инструкциям для восстановления пароля
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 rounded-lg bg-accent-green text-white hover:bg-accent-green/90 transition-colors"
              >
                Вернуться к входу
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-work21-dark border border-work21-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-green transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg bg-accent-green text-white hover:bg-accent-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  'Отправить инструкции'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

