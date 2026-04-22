'use client';

import React from 'react';
import { Room, BookingDetails } from './types';

interface BookingSummaryPanelProps {
  selectedRoom: Room | null;
  bookingDetails: BookingDetails;
  onBookingDetailsChange: (details: BookingDetails) => void;
  totalAmount: number;
  onProceedToPayment: () => void;
}

export default function BookingSummaryPanel({
  selectedRoom,
  bookingDetails,
  onBookingDetailsChange,
  totalAmount,
  onProceedToPayment,
}: BookingSummaryPanelProps) {
  if (!selectedRoom) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-fade-up">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <h3 className="font-display font-700 text-slate-700 mb-2">No Room Selected</h3>
          <p className="text-slate-400 text-sm font-body leading-relaxed">
            Click on any available room card to select it and see your booking summary here.
          </p>
        </div>
      </div>
    );
  }

  const update = (key: keyof BookingDetails, value: string | boolean | number) => {
    onBookingDetailsChange({ ...bookingDetails, [key]: value });
  };

  const messAmount = 12000;
  const securityDeposit = 2000;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="gradient-primary p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="font-display font-700 text-sm">Booking Summary</span>
        </div>
        <h3 className="font-display font-700 text-2xl">Room {selectedRoom.roomNumber}</h3>
        <p className="text-white/70 text-sm font-body mt-1">
          Block {selectedRoom.block} · Floor {selectedRoom.floor} · {selectedRoom.roomClass}
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Room Details */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide">Room Details</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Sharing Type', value: `${selectedRoom.sharingType}-bed sharing` },
              { label: 'Room Class', value: selectedRoom.roomClass },
              { label: 'Floor Area', value: `${selectedRoom.floorArea} sq ft` },
              { label: 'Window', value: `${selectedRoom.windowFacing} facing` },
            ].map((item) => (
              <div key={`detail-${item.label}`} className="bg-slate-50 rounded-xl p-2.5">
                <p className="text-xs text-slate-400 font-body">{item.label}</p>
                <p className="text-sm font-display font-600 text-slate-700 mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Check-in / Check-out */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide">Stay Duration</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-display font-600 text-slate-500 mb-1 block">Check-in</label>
              <input
                type="date"
                value={bookingDetails.checkIn}
                onChange={(e) => update('checkIn', e.target.value)}
                className="w-full px-3 py-2 text-xs font-body rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-display font-600 text-slate-500 mb-1 block">Check-out</label>
              <input
                type="date"
                value={bookingDetails.checkOut}
                onChange={(e) => update('checkOut', e.target.value)}
                className="w-full px-3 py-2 text-xs font-body rounded-xl border border-slate-200 bg-white text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mess Option */}
        <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                <path d="M3 11l19-9-9 19-2-8-8-2z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-display font-600 text-slate-700">Include Mess</p>
              <p className="text-xs text-slate-500 font-body">+₹12,000/semester</p>
            </div>
          </div>
          <button
            onClick={() => update('messOption', !bookingDetails.messOption)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
              bookingDetails.messOption ? 'bg-amber-500' : 'bg-slate-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                bookingDetails.messOption ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-body">
              <span className="text-slate-600">Room rent (1 semester)</span>
              <span className="font-display font-600 text-slate-700 tabular-nums">₹{selectedRoom.pricePerSemester.toLocaleString('en-IN')}</span>
            </div>
            {bookingDetails.messOption && (
              <div className="flex justify-between text-sm font-body">
                <span className="text-slate-600">Mess charges</span>
                <span className="font-display font-600 text-slate-700 tabular-nums">₹{messAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-body">
              <span className="text-slate-600">Security deposit</span>
              <span className="font-display font-600 text-slate-700 tabular-nums">₹{securityDeposit.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 mt-2 flex justify-between">
              <span className="font-display font-700 text-slate-800">Total Payable</span>
              <span className="font-display font-700 text-blue-700 text-lg tabular-nums">
                ₹{(totalAmount + securityDeposit).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={onProceedToPayment}
          className="btn-primary w-full text-sm"
          style={{ minHeight: '48px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          Proceed to Payment
        </button>

        <p className="text-center text-xs text-slate-400 font-body flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secured by 256-bit SSL encryption
        </p>
      </div>
    </div>
  );
}