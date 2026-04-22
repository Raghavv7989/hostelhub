'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room, BookingDetails } from './types';

interface BookingConfirmationProps {
  bookingId: string;
  room: Room;
  bookingDetails: BookingDetails;
  totalAmount: number;
  studentName: string;
  onClose: () => void;
}

interface ConfettiPiece {
  id: string;
  left: number;
  color: string;
  delay: number;
  size: number;
}

const confettiColors = ['#2563EB', '#F59E0B', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4'];

export default function BookingConfirmation({
  bookingId,
  room,
  bookingDetails,
  totalAmount,
  studentName,
  onClose,
}: BookingConfirmationProps) {
  const [showContent, setShowContent] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Generate confetti
    const pieces: ConfettiPiece[] = Array.from({ length: 30 }).map((_, i) => ({
      id: `confetti-piece-${i}`,
      left: Math.floor(i * 3.4),
      color: confettiColors[i % confettiColors.length],
      delay: (i * 0.06),
      size: 6 + (i % 4) * 2,
    }));
    setConfetti(pieces);

    setTimeout(() => setShowContent(true), 400);

    return () => { document.body.style.overflow = ''; };
  }, []);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const securityDeposit = 2000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-confetti"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: piece.id.includes('1') || piece.id.includes('3') ? '50%' : '2px',
              animationDelay: `${piece.delay}s`,
              animationDuration: `${1.5 + (parseInt(piece.id.split('-')[2]) % 5) * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-modal w-full max-w-md mx-4 overflow-hidden animate-bounce-in">
        {/* Success Header */}
        <div className="gradient-primary pt-10 pb-8 px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
          </div>

          {/* Animated check circle */}
          <div className="relative flex justify-center mb-5">
            {/* Pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 animate-pulse-ring" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Check circle */}
            <div className="relative w-20 h-20 animate-circle-pop">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
                <circle cx="40" cy="40" r="36" fill="white" fillOpacity="0.15"/>
                <path
                  d="M24 40 L34 50 L56 28"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{
                    strokeDasharray: 60,
                    strokeDashoffset: showContent ? 0 : 60,
                    transition: 'stroke-dashoffset 0.6s ease 0.5s',
                  }}
                />
              </svg>
            </div>
          </div>

          <h2 className="font-display font-700 text-2xl text-white mb-1">Booking Confirmed!</h2>
          <p className="text-white/80 font-body text-sm">
            {studentName.split(' ')[0]}, your room is reserved 🎉
          </p>
        </div>

        {/* Booking ID */}
        <div className="mx-6 -mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-amber-600 font-display font-600 uppercase tracking-wide">Booking ID</p>
            <p className="font-mono font-700 text-amber-800 text-lg tabular-nums">{bookingId}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
        </div>

        {/* Booking Details */}
        {showContent && (
          <div className="p-6 space-y-4 animate-fade-up">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Room', value: `Room ${room.roomNumber}` },
                { label: 'Block', value: `Block ${room.block} · Floor ${room.floor}` },
                { label: 'Type', value: `${room.sharingType}-Sharing · ${room.roomClass}` },
                { label: 'Check-in', value: formatDate(bookingDetails.checkIn) },
                { label: 'Check-out', value: formatDate(bookingDetails.checkOut) },
                { label: 'Mess', value: bookingDetails.messOption ? 'Included' : 'Not included' },
              ].map((item) => (
                <div key={`conf-detail-${item.label}`} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 font-body">{item.label}</p>
                  <p className="text-sm font-display font-600 text-slate-700 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Amount paid */}
            <div className="bg-emerald-50 rounded-xl p-4 flex items-center justify-between border border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                    <path d="M9 12l2 2 4-4"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-body">Amount Paid</p>
                  <p className="font-display font-700 text-emerald-800 tabular-nums">₹{(totalAmount + securityDeposit).toLocaleString('en-IN')}</p>
                </div>
              </div>
              <span className="badge bg-emerald-100 text-emerald-700 text-xs">Payment Success</span>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-2.5 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs text-blue-700 font-body leading-relaxed">
                A confirmation email has been sent to your registered university email. Please carry your Booking ID and Student ID on check-in day.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn-secondary flex-1 text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Book Another
              </button>
              <button
                onClick={() => router.push('/sign-up-login-screen')}
                className="btn-primary flex-1 text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                View Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}