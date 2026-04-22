'use client';

import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import BookingHeader from './BookingHeader';
import RoomFilters from './RoomFilters';
import RoomGrid from './RoomGrid';
import BookingSummaryPanel from './BookingSummaryPanel';
import PaymentModal from './PaymentModal';
import BookingConfirmation from './BookingConfirmation';
import { Room, RoomFiltersState, BookingDetails } from './types';
import { mockRooms } from './mockData';

export default function BookingPage() {
  const [filters, setFilters] = useState<RoomFiltersState>({
    block: 'all',
    floor: 'all',
    sharingType: 'all',
    priceRange: 'all',
    messIncluded: false,
    availability: 'available',
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: '2026-07-15',
    checkOut: '2026-11-30',
    messOption: false,
    bedsRequired: 1,
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [studentName, setStudentName] = useState('Student');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hostelhub_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setStudentName(parsed?.name || 'Student');
      }
    }
  }, []);

  const filteredRooms = mockRooms?.filter((room) => {
    if (filters?.block !== 'all' && room?.block !== filters?.block) return false;
    if (filters?.floor !== 'all' && room?.floor !== filters?.floor) return false;
    if (filters?.sharingType !== 'all' && room?.sharingType !== parseInt(filters?.sharingType)) return false;
    if (filters?.priceRange !== 'all') {
      const [min, max] = filters?.priceRange?.split('-')?.map(Number);
      if (max ? room?.pricePerSemester < min || room?.pricePerSemester > max : room?.pricePerSemester < min) return false;
    }
    if (filters?.availability === 'available' && room?.availableBeds === 0) return false;
    return true;
  });

  const totalAmount = selectedRoom
    ? selectedRoom?.pricePerSemester + (bookingDetails?.messOption ? 12000 : 0)
    : 0;

  const handlePaymentSuccess = () => {
    const id = `HH-${new Date()?.getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingId(id);
    setShowPaymentModal(false);

    // TODO: Insert booking record into Supabase bookings table
    if (typeof window !== 'undefined' && selectedRoom) {
      const existingBookings = JSON.parse(localStorage.getItem('hostelhub_bookings') || '[]');
      existingBookings?.push({
        bookingId: id,
        roomId: selectedRoom?.id,
        roomNumber: selectedRoom?.roomNumber,
        block: selectedRoom?.block,
        floor: selectedRoom?.floor,
        sharingType: selectedRoom?.sharingType,
        roomClass: selectedRoom?.roomClass,
        checkIn: bookingDetails?.checkIn,
        checkOut: bookingDetails?.checkOut,
        messOption: bookingDetails?.messOption,
        totalAmount: totalAmount,
        bookedAt: new Date()?.toISOString(),
      });
      localStorage.setItem('hostelhub_bookings', JSON.stringify(existingBookings));
    }

    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" richColors />
      <BookingHeader studentName={studentName} />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
        {/* Page Title */}
        <div className="mb-6 animate-fade-up">
          <h1 className="font-display font-700 text-2xl text-slate-800">Browse Available Rooms</h1>
          <p className="text-slate-500 text-sm font-body mt-1">
            {filteredRooms?.length} rooms available · Semester July–November 2026
          </p>
        </div>

        <div className="flex gap-6 items-start">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <RoomFilters filters={filters} onChange={setFilters} totalCount={filteredRooms?.length} />
            <RoomGrid
              rooms={filteredRooms}
              selectedRoom={selectedRoom}
              onSelectRoom={setSelectedRoom}
            />
          </div>

          {/* Booking Summary Sidebar */}
          <div className="hidden xl:block w-80 2xl:w-96 flex-shrink-0 sticky top-6">
            <BookingSummaryPanel
              selectedRoom={selectedRoom}
              bookingDetails={bookingDetails}
              onBookingDetailsChange={setBookingDetails}
              totalAmount={totalAmount}
              onProceedToPayment={() => setShowPaymentModal(true)}
            />
          </div>
        </div>

        {/* Mobile booking bar */}
        {selectedRoom && (
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40 animate-slide-up shadow-modal">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display font-700 text-slate-800">
                  Room {selectedRoom?.roomNumber}
                </p>
                <p className="text-slate-500 text-xs font-body">
                  {selectedRoom?.sharingType}-Sharing · {selectedRoom?.roomClass} · Block {selectedRoom?.block}
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-700 text-blue-700 text-lg tabular-nums">₹{totalAmount?.toLocaleString('en-IN')}</p>
                <p className="text-slate-400 text-xs">per semester</p>
              </div>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="btn-primary w-full text-sm"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </main>
      {/* Payment Modal */}
      {showPaymentModal && selectedRoom && (
        <PaymentModal
          room={selectedRoom}
          bookingDetails={bookingDetails}
          totalAmount={totalAmount}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {/* Booking Confirmation Overlay */}
      {showConfirmation && selectedRoom && (
        <BookingConfirmation
          bookingId={bookingId}
          room={selectedRoom}
          bookingDetails={bookingDetails}
          totalAmount={totalAmount}
          studentName={studentName}
          onClose={() => {
            setShowConfirmation(false);
            setSelectedRoom(null);
          }}
        />
      )}
    </div>
  );
}