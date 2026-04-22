'use client';

import React, { useState } from 'react';
import AuthLeftPanel from './AuthLeftPanel';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Branding Panel */}
      <AuthLeftPanel />

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md animate-fade-up">
          {/* Logo on mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="10" width="14" height="8" rx="1" fill="white" fillOpacity="0.9"/>
                <rect x="5" y="6" width="10" height="5" rx="1" fill="white" fillOpacity="0.7"/>
                <rect x="7" y="3" width="6" height="4" rx="1" fill="white" fillOpacity="0.5"/>
                <rect x="8.5" y="13" width="3" height="5" rx="0.5" fill="white" fillOpacity="0.6"/>
              </svg>
            </div>
            <span className="font-display font-700 text-xl text-slate-800">HostelHub</span>
          </div>

          {/* Tab Switcher */}
          <div className="relative bg-slate-100 rounded-2xl p-1 flex mb-8">
            <div
              className="absolute inset-y-1 rounded-xl bg-white shadow-sm transition-all duration-300 ease-in-out"
              style={{
                left: activeTab === 'login' ? '4px' : '50%',
                right: activeTab === 'login' ? '50%' : '4px',
              }}
            />
            <button
              onClick={() => setActiveTab('login')}
              className={`relative flex-1 py-2.5 text-sm font-display font-600 rounded-xl transition-colors duration-200 z-10 ${
                activeTab === 'login' ? 'text-slate-800' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`relative flex-1 py-2.5 text-sm font-display font-600 rounded-xl transition-colors duration-200 z-10 ${
                activeTab === 'register' ? 'text-slate-800' : 'text-slate-500'
              }`}
            >
              Register
            </button>
          </div>

          {/* Forms */}
          <div className="overflow-hidden">
            {activeTab === 'login' ? (
              <LoginForm key="login" onSwitchToRegister={() => setActiveTab('register')} />
            ) : (
              <RegisterForm key="register" onSwitchToLogin={() => setActiveTab('login')} />
            )}
          </div>

          {/* Demo Credentials Box */}
          {activeTab === 'login' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-fade-up">
              <p className="text-xs font-display font-600 text-blue-700 mb-2 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Demo Credentials
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-body">Email</span>
                  <span className="text-xs font-mono text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">arjun.mehta@university.edu.in</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-body">Password</span>
                  <span className="text-xs font-mono text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">Hostel@2026</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}