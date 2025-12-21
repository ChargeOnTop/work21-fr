import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './app/globals.css'
import { Providers } from './app/providers'
import Page from './app/page'
import LoginPage from './app/login/page'
import RegisterPage from './app/register/page'
import StudentsPage from './app/students/page'
import CustomersPage from './app/customers/page'
import HowItWorksPage from './app/how-it-works/page'
import DashboardPage from './app/dashboard/page'
import DashboardLayout from './app/dashboard/layout'
import ProjectsPage from './app/dashboard/projects/page'
import ProjectPage from './app/dashboard/projects/[id]/page'
import ApplyPage from './app/dashboard/projects/[id]/apply/page'
import NewProjectPage from './app/dashboard/projects/new/page'
import ApplicationsPage from './app/dashboard/applications/page'
import RatingPage from './app/dashboard/rating/page'
import ProfilePage from './app/dashboard/profile/page'
import SettingsPage from './app/dashboard/settings/page'
import StudentsDashboardPage from './app/dashboard/students/page'
import UserPage from './app/dashboard/users/[id]/page'
import JobsPage from './app/jobs/page'
import DocsPage from './app/docs/page'
import FAQPage from './app/faq/page'
import ContactsPage from './app/contacts/page'
import SupportPage from './app/support/page'
import TermsPage from './app/terms/page'
import PrivacyPage from './app/privacy/page'
import OfferPage from './app/offer/page'
import ForgotPasswordPage from './app/forgot-password/page'

const App = () => {
  useEffect(() => {
    // Применяем dark класс к document.documentElement
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    // По умолчанию тёмная тема
    if (!savedTheme || savedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else if (savedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    
    // Применяем стили к body
    document.body.className = 'min-h-screen antialiased transition-colors duration-300';
    document.body.style.background = 'var(--color-bg)';
    document.body.style.color = 'var(--color-text)';
  }, []);
  
  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/offer" element={<OfferPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/new" element={<NewProjectPage />} />
          <Route path="projects/:id/apply" element={<ApplyPage />} />
          <Route path="projects/:id" element={<ProjectPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="rating" element={<RatingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="students" element={<StudentsDashboardPage />} />
          <Route path="users/:id" element={<UserPage />} />
        </Route>
      </Routes>
    </Providers>
  );
};

export default App;
