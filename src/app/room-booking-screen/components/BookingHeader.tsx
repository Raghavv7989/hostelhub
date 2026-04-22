'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingHeaderProps {
  studentName: string;
}

export default function BookingHeader({ studentName }: BookingHeaderProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hostelhub_user');
    }
    // TODO: Supabase auth.signOut()
    router.push('/sign-up-login-screen');
  };

  const initials = studentName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="11" width="18" height="9" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="4" y="7" width="14" height="5" rx="1" fill="white" fillOpacity="0.7"/>
              <rect x="7" y="3" width="8" height="5" rx="1" fill="white" fillOpacity="0.5"/>
              <rect x="9" y="14" width="4" height="6" rx="0.5" fill="white" fillOpacity="0.5"/>
            </svg>
          </div>
          <div>
            <span className="font-display font-700 text-slate-800 text-lg">HostelHub</span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-body">University Housing Portal</span>
          </div>
        </div>

        {/* Center breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm font-body">
          <span className="text-slate-400">Semester</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-300">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <span className="text-slate-600 font-600">July–November 2026</span>
          <span className="ml-2 badge-green text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-display font-600">Booking Open</span>
        </div>

        {/* Right: user menu */}
        <div className="relative flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1.5 text-slate-500 hover:text-slate-700 text-sm font-body transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Notifications
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 pl-3 border-l border-slate-200 hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-display font-700">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-display font-600 text-slate-700">{studentName.split(' ')[0]}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-modal border border-slate-100 py-2 z-50 animate-scale-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-display font-700 text-sm text-slate-800">{studentName}</p>
                <p className="text-xs text-slate-500 font-body">Student Account</p>
              </div>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-body">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                My Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-body">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                My Bookings
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-body"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}