'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Room, BookingDetails } from './types';

interface PaymentModalProps {
  room: Room;
  bookingDetails: BookingDetails;
  totalAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'upi' | 'netbanking' | 'card';

const upiApps = [
  { id: 'gpay', name: 'Google Pay', color: '#4285F4' },
  { id: 'phonepe', name: 'PhonePe', color: '#5F259F' },
  { id: 'paytm', name: 'Paytm', color: '#00B9F1' },
  { id: 'bhim', name: 'BHIM UPI', color: '#00693E' },
];

const banks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Kotak Mahindra Bank',
  'Union Bank of India',
];

export default function PaymentModal({ room, bookingDetails, totalAmount, onClose, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [selectedUpi, setSelectedUpi] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const securityDeposit = 2000;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const formatCardNumber = (val: string) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 2) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  };

  const processingSteps = [
    'Verifying payment details...',
    'Connecting to payment gateway...',
    'Processing transaction...',
    'Confirming booking...',
  ];

  const handlePayment = async () => {
    // Validation
    if (paymentMethod === 'upi' && !upiId && !selectedUpi) {
      toast.error('Please enter your UPI ID or select an app');
      return;
    }
    if (paymentMethod === 'netbanking' && !selectedBank) {
      toast.error('Please select your bank');
      return;
    }
    if (paymentMethod === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) { toast.error('Enter a valid 16-digit card number'); return; }
      if (!cardName.trim()) { toast.error('Enter the name on card'); return; }
      if (cardExpiry.length < 5) { toast.error('Enter valid expiry date (MM/YY)'); return; }
      if (cardCvv.length < 3) { toast.error('Enter valid CVV'); return; }
    }

    setIsProcessing(true);
    // TODO: Integrate with Supabase Edge Function or Razorpay/Stripe for actual payment processing
    for (let i = 0; i < processingSteps.length; i++) {
      setProcessingStep(i);
      await new Promise((r) => setTimeout(r, 700));
    }
    await new Promise((r) => setTimeout(r, 500));
    setIsProcessing(false);
    toast.success('Payment successful!');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={!isProcessing ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-modal animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="font-display font-700 text-slate-800 text-lg mb-1">Processing Payment</p>
              <p className="text-slate-500 text-sm font-body animate-pulse">{processingSteps[processingStep]}</p>
            </div>
            <div className="flex gap-2">
              {processingSteps.map((_, i) => (
                <div
                  key={`step-dot-${i}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i <= processingStep ? 'w-6 bg-blue-600' : 'w-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-700 text-xl text-slate-800">Complete Payment</h2>
              <p className="text-slate-500 text-sm font-body mt-0.5">Room {room.roomNumber} · Block {room.block}</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Amount summary */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-body">Total Amount Payable</p>
              <p className="font-display font-700 text-2xl text-blue-700 tabular-nums mt-0.5">
                ₹{(totalAmount + securityDeposit).toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-slate-400 font-body mt-0.5">Includes ₹2,000 refundable deposit</p>
            </div>
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
          </div>

          {/* Payment method tabs */}
          <div className="mb-5">
            <p className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide mb-3">Payment Method</p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'upi', label: 'UPI', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                )},
                { id: 'netbanking', label: 'Net Banking', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                )},
                { id: 'card', label: 'Card', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                )},
              ] as const).map((method) => (
                <button
                  key={`pm-${method.id}`}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-200 ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700' :'border-slate-100 bg-white text-slate-500 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {method.icon}
                  <span className="text-xs font-display font-600">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* UPI Section */}
          {paymentMethod === 'upi' && (
            <div className="space-y-4 animate-fade-up">
              <div className="grid grid-cols-2 gap-2">
                {upiApps.map((app) => (
                  <button
                    key={`upi-${app.id}`}
                    onClick={() => setSelectedUpi(app.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedUpi === app.id
                        ? 'border-blue-500 bg-blue-50' :'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-display font-700"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.name[0]}
                    </div>
                    <span className={`text-sm font-display font-600 ${selectedUpi === app.id ? 'text-blue-700' : 'text-slate-700'}`}>
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">
                  Or enter UPI ID manually
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="input-field"
                />
                <p className="text-xs text-slate-400 font-body mt-1">e.g. arjun@okaxis, 9876543210@paytm</p>
              </div>
            </div>
          )}

          {/* Net Banking Section */}
          {paymentMethod === 'netbanking' && (
            <div className="animate-fade-up">
              <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Select Your Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="input-field"
              >
                <option value="">Choose your bank</option>
                {banks.map((bank) => (
                  <option key={`bank-${bank}`} value={bank}>{bank}</option>
                ))}
              </select>
              {selectedBank && (
                <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100 animate-fade-up">
                  <p className="text-xs text-blue-700 font-body">
                    You will be redirected to <strong>{selectedBank}</strong> secure net banking portal to complete the payment.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Card Section */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 animate-fade-up">
              {/* Card Preview */}
              <div className="h-36 gradient-primary rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                <div className="absolute -bottom-8 -right-2 w-36 h-36 rounded-full bg-white/5" />
                <div className="flex justify-between items-start mb-6">
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                    <rect width="32" height="24" rx="4" fill="white" fillOpacity="0.2"/>
                    <circle cx="12" cy="12" r="7" fill="white" fillOpacity="0.4"/>
                    <circle cx="20" cy="12" r="7" fill="white" fillOpacity="0.3"/>
                  </svg>
                  <span className="text-white/60 text-xs font-body">DEBIT / CREDIT</span>
                </div>
                <p className="font-mono text-white text-sm tracking-widest tabular-nums">
                  {cardNumber || '•••• •••• •••• ••••'}
                </p>
                <div className="flex justify-between items-end mt-2">
                  <p className="text-white/80 text-xs font-body uppercase">{cardName || 'CARD HOLDER NAME'}</p>
                  <p className="text-white/80 text-xs font-mono">{cardExpiry || 'MM/YY'}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  className="input-field font-mono tracking-wider"
                  maxLength={19}
                />
              </div>
              <div>
                <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Name on Card</label>
                <input
                  type="text"
                  placeholder="As printed on your card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    className="input-field font-mono"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-display font-600 text-slate-700 mb-1.5">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="input-field font-mono"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn-primary w-full text-sm mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ minHeight: '52px' }}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Pay ₹{(totalAmount + securityDeposit).toLocaleString('en-IN')} Securely
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-4 mt-4">
            {['SSL Secured', '256-bit Encrypted', 'PCI DSS Compliant'].map((badge) => (
              <span key={`security-${badge}`} className="text-xs text-slate-400 font-body flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}