'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { rememberMe: false },
  });

  const handleDemoFill = () => {
    setValue('email', 'arjun.mehta@university.edu.in');
    setValue('password', 'Hostel@2026');
    toast.info('Demo credentials filled!');
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // TODO: Replace with Supabase auth.signInWithPassword({ email: data.email, password: data.password })
    await new Promise((r) => setTimeout(r, 1500));

    const validEmail = 'arjun.mehta@university.edu.in';
    const validPassword = 'Hostel@2026';

    if (data.email === validEmail && data.password === validPassword) {
      // TODO: Store session via Supabase session management
      if (typeof window !== 'undefined') {
        localStorage.setItem('hostelhub_user', JSON.stringify({
          id: 'student-001',
          name: 'Arjun Mehta',
          email: data.email,
          studentId: 'CSE2024001',
          department: 'Computer Science & Engineering',
        }));
      }
      toast.success('Welcome back, Arjun! 👋');
      setTimeout(() => router.push('/room-booking-screen'), 800);
    } else {
      setIsLoading(false);
      toast.error('Invalid credentials — use the demo accounts below to sign in');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-up">
      <div>
        <h2 className="font-display font-700 text-2xl text-slate-800 mb-1">Welcome back</h2>
        <p className="text-slate-500 text-sm font-body">Sign in to your student account</p>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">
          University Email
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <input
            type="email"
            placeholder="yourname@university.edu.in"
            className={`input-field pl-10 ${errors.email ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
            })}
          />
        </div>
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-display font-600 text-slate-700">
            Password
          </label>
          <button type="button" className="text-xs text-blue-600 font-display font-600 hover:text-blue-700 transition-colors">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className={`input-field pl-10 pr-11 ${errors.password ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          id="rememberMe"
          className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600"
          {...register('rememberMe')}
        />
        <label htmlFor="rememberMe" className="text-sm text-slate-600 font-body cursor-pointer">
          Keep me signed in for 30 days
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full text-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        style={{ minHeight: '48px' }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Signing in...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Sign In to HostelHub
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-500 font-body">
        New student?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-600 font-display font-600 hover:text-blue-700 transition-colors"
        >
          Create your account
        </button>
      </p>

      {/* Quick demo fill */}
      <button
        type="button"
        onClick={handleDemoFill}
        className="w-full py-2 text-xs text-blue-500 font-body hover:text-blue-700 transition-colors flex items-center justify-center gap-1"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Auto-fill demo credentials
      </button>
    </form>
  );
}