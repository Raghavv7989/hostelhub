'use client';

import React, { useState } from 'react';
import { Room, RoomClass } from './types';

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onSelect: () => void;
}

const classColors: Record<RoomClass, { bg: string; text: string; border: string }> = {
  Economy: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  Standard: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  Premium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
};

const sharingLabels: Record<number, string> = { 1: 'Single', 2: 'Double', 3: 'Triple', 4: 'Quad' };

const amenityIcons: Record<string, React.ReactNode> = {
  'Study Table': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="2" rx="1"/><path d="M5 9v10M19 9v10"/>
    </svg>
  ),
  'Wardrobe': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2"/><line x1="12" y1="2" x2="12" y2="22"/>
    </svg>
  ),
  'Fan': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/>
    </svg>
  ),
  'Wi-Fi': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
    </svg>
  ),
  'Power Backup': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  'Bookshelf': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  'Attached Bathroom': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 6 L9 2 C9 2 15 2 15 6"/><rect x="2" y="6" width="20" height="4" rx="1"/>
      <path d="M4 10v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
    </svg>
  ),
  'Mini Fridge': (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/>
    </svg>
  ),
};

export default function RoomCard({ room, isSelected, onSelect }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cls = classColors[room.roomClass];
  const isFull = room.availableBeds === 0;

  const statusConfig = {
    available: { label: 'Available', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    limited: { label: `${room.availableBeds} bed${room.availableBeds === 1 ? '' : 's'} left`, bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
    full: { label: 'Fully Booked', bg: 'bg-red-100', text: 'text-red-600', dot: 'bg-red-500' },
  };
  const status = statusConfig[room.status];

  return (
    <div
      onClick={() => !isFull && onSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
        isFull
          ? 'opacity-60 cursor-not-allowed border-slate-100'
          : isSelected
          ? 'border-blue-500 shadow-card-hover ring-4 ring-blue-100'
          : isHovered
          ? 'border-blue-200 shadow-card-hover -translate-y-1.5'
          : 'border-slate-100 shadow-card'
      }`}
      style={{
        transform: isHovered && !isFull && !isSelected ? 'translateY(-6px) rotateX(1deg)' : isSelected ? 'scale(1.01)' : undefined,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-2xl" />
      )}

      {/* Room illustration / color band */}
      <div
        className={`h-28 relative overflow-hidden flex items-center justify-center ${
          room.roomClass === 'Premium' ?'bg-gradient-to-br from-amber-50 to-orange-100'
            : room.roomClass === 'Standard' ?'bg-gradient-to-br from-blue-50 to-indigo-100' :'bg-gradient-to-br from-slate-50 to-slate-100'
        }`}
      >
        {/* Room visual */}
        <RoomVisual sharingType={room.sharingType} roomClass={room.roomClass} />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`badge ${cls.bg} ${cls.text} text-xs`}>
            {room.roomClass}
          </span>
          {room.attachedBathroom && (
            <span className="badge bg-blue-100 text-blue-700 text-xs">Attached Bath</span>
          )}
        </div>

        {/* Status badge */}
        <div className="absolute top-3 right-3">
          <span className={`badge ${status.bg} ${status.text} text-xs flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Room number and block */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display font-700 text-slate-800 text-lg leading-tight">
              Room {room.roomNumber}
            </h3>
            <p className="text-slate-500 text-xs font-body mt-0.5">
              Block {room.block} · Floor {room.floor} · {room.floorArea} sq ft
            </p>
          </div>
          <div className="text-right">
            <p className="font-display font-700 text-blue-700 text-xl tabular-nums">
              ₹{room.pricePerSemester.toLocaleString('en-IN')}
            </p>
            <p className="text-slate-400 text-xs font-body">per semester</p>
          </div>
        </div>

        {/* Sharing info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: room.totalBeds }).map((_, i) => (
                <div
                  key={`bed-${room.id}-${i}`}
                  className={`w-5 h-3 rounded-sm border ${
                    i < room.availableBeds
                      ? 'bg-emerald-400 border-emerald-500' :'bg-slate-200 border-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-body text-slate-600">
              {sharingLabels[room.sharingType]}-sharing
            </span>
          </div>
          <span className="text-slate-200">·</span>
          <span className="text-xs font-body text-slate-500">
            {room.windowFacing} facing
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 font-body leading-relaxed mb-3 line-clamp-2">
          {room.description}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 5).map((amenity) => (
            <span
              key={`amenity-${room.id}-${amenity}`}
              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded-lg border border-slate-100 font-body"
            >
              <span className="text-slate-400">{amenityIcons[amenity]}</span>
              {amenity}
            </span>
          ))}
          {room.amenities.length > 5 && (
            <span className="inline-flex items-center px-2 py-1 bg-slate-50 text-slate-400 text-xs rounded-lg border border-slate-100 font-body">
              +{room.amenities.length - 5} more
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          disabled={isFull}
          onClick={(e) => { e.stopPropagation(); if (!isFull) onSelect(); }}
          className={`w-full py-2.5 rounded-xl text-sm font-display font-600 transition-all duration-200 active:scale-95 ${
            isFull
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : isSelected
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
          }`}
        >
          {isFull ? 'Room Fully Booked' : isSelected ? '✓ Selected' : 'Select This Room'}
        </button>
      </div>
    </div>
  );
}

function RoomVisual({ sharingType, roomClass }: { sharingType: number; roomClass: string }) {
  const bedColor = roomClass === 'Premium' ? '#F59E0B' : roomClass === 'Standard' ? '#3B82F6' : '#94A3B8';
  const bedCount = sharingType;

  return (
    <svg width="140" height="80" viewBox="0 0 140 80" fill="none" opacity="0.6">
      {/* Floor */}
      <rect x="10" y="65" width="120" height="4" rx="1" fill={bedColor} fillOpacity="0.3"/>

      {/* Beds */}
      {Array.from({ length: Math.min(bedCount, 4) }).map((_, i) => {
        const totalWidth = Math.min(bedCount, 4) * 28 + (Math.min(bedCount, 4) - 1) * 6;
        const startX = (140 - totalWidth) / 2;
        const x = startX + i * 34;
        return (
          <g key={`vis-bed-${i}`}>
            <rect x={x} y="30" width="26" height="34" rx="3" fill={bedColor} fillOpacity="0.25" stroke={bedColor} strokeOpacity="0.4" strokeWidth="1"/>
            <rect x={x + 2} y="30" width="22" height="10" rx="2" fill={bedColor} fillOpacity="0.5"/>
            <rect x={x + 4} y="43" width="8" height="6" rx="1" fill="white" fillOpacity="0.5"/>
          </g>
        );
      })}

      {/* Study table */}
      <rect x="15" y="15" width="30" height="14" rx="2" fill={bedColor} fillOpacity="0.2" stroke={bedColor} strokeOpacity="0.3" strokeWidth="1"/>
      <rect x="17" y="29" width="4" height="8" rx="1" fill={bedColor} fillOpacity="0.3"/>
      <rect x="39" y="29" width="4" height="8" rx="1" fill={bedColor} fillOpacity="0.3"/>
    </svg>
  );
}