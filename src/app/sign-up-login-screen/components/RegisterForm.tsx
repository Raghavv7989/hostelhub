'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface RegisterFormData {
  fullName: string;
  studentId: string;
  email: string;
  department: string;
  yearOfStudy: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const departments = [
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Chemical Engineering',
  'Biotechnology',
  'Physics',
  'Mathematics',
  'MBA',
  'Other',
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'PG 1st Year', 'PG 2nd Year', 'PhD'];

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // TODO: Replace with Supabase auth.signUp({ email, password }) + insert into students table
    await new Promise((r) => setTimeout(r, 1800));

    if (typeof window !== 'undefined') {
      localStorage.setItem('hostelhub_user', JSON.stringify({
        id: `student-${Date.now()}`,
        name: data.fullName,
        email: data.email,
        studentId: data.studentId,
        department: data.department,
        yearOfStudy: data.yearOfStudy,
        gender: data.gender,
        phone: data.phone,
      }));
    }

    toast.success(`Account created! Welcome to HostelHub, ${data.fullName.split(' ')[0]}! 🎉`);
    setTimeout(() => router.push('/room-booking-screen'), 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-up">
      <div>
        <h2 className="font-display font-700 text-2xl text-slate-800 mb-1">Create account</h2>
        <p className="text-slate-500 text-sm font-body">Register with your university details</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Full Name</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="e.g. Arjun Mehta"
            className={`input-field pl-10 ${errors.fullName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 3, message: 'Name must be at least 3 characters' },
            })}
          />
        </div>
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
      </div>

      {/* Student ID + Phone in a row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Student ID</label>
          <input
            type="text"
            placeholder="CSE2024001"
            className={`input-field ${errors.studentId ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('studentId', {
              required: 'Student ID required',
              pattern: { value: /^[A-Z]{2,4}\d{6,8}$/, message: 'Invalid format (e.g. CSE2024001)' },
            })}
          />
          {errors.studentId && <p className="mt-1 text-xs text-red-500">{errors.studentId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Phone</label>
          <input
            type="tel"
            placeholder="+91 98765 43210"
            className={`input-field ${errors.phone ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('phone', {
              required: 'Phone required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit mobile' },
            })}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">University Email</label>
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
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      {/* Department + Year */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Department</label>
          <select
            className={`input-field ${errors.department ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('department', { required: 'Select your department' })}
          >
            <option value="">Select dept.</option>
            {departments.map((d) => (
              <option key={`dept-${d}`} value={d}>{d}</option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Year of Study</label>
          <select
            className={`input-field ${errors.yearOfStudy ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('yearOfStudy', { required: 'Select year' })}
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={`year-${y}`} value={y}>{y}</option>
            ))}
          </select>
          {errors.yearOfStudy && <p className="mt-1 text-xs text-red-500">{errors.yearOfStudy.message}</p>}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Gender</label>
        <div className="flex gap-3">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={`gender-${g}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 cursor-pointer text-sm font-body transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
              <input type="radio" value={g} className="accent-blue-600" {...register('gender', { required: 'Select gender' })} />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Password</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimum 8 characters"
            className={`input-field pl-10 pr-11 ${errors.password ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
              pattern: { value: /^(?=.*[A-Z])(?=.*\d)/, message: 'Include at least one uppercase letter and number' },
            })}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Confirm Password</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter password"
            className={`input-field pl-10 pr-11 ${errors.confirmPassword ? 'border-red-400 ring-2 ring-red-100' : ''}`}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === password || 'Passwords do not match',
            })}
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {showConfirm ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="agreeTerms"
          className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-blue-600"
          {...register('agreeTerms', { required: 'You must agree to the terms' })}
        />
        <label htmlFor="agreeTerms" className="text-sm text-slate-600 font-body cursor-pointer leading-snug">
          I agree to the{' '}
          <span className="text-blue-600 font-600 hover:underline cursor-pointer">Terms of Service</span>
          {' '}and{' '}
          <span className="text-blue-600 font-600 hover:underline cursor-pointer">Privacy Policy</span>
        </label>
      </div>
      {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full text-sm disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ minHeight: '48px' }}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Creating your account...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Create My Account
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-500 font-body">
        Already registered?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-600 font-display font-600 hover:text-blue-700 transition-colors"
        >
          Sign in here
        </button>
      </p>
    </form>
  );
}