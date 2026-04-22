'use client';

import React from 'react';
import { Room } from './types';
import RoomCard from './RoomCard';

interface RoomGridProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onSelectRoom: (room: Room) => void;
}

export default function RoomGrid({ rooms, selectedRoom, onSelectRoom }: RoomGridProps) {
  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-100 animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <h3 className="font-display font-700 text-slate-700 text-lg mb-2">No rooms match your filters</h3>
        <p className="text-slate-400 text-sm font-body text-center max-w-xs">
          Try adjusting your filters — change the block, sharing type, or price range to see more options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      {rooms.map((room, idx) => (
        <div
          key={room.id}
          className="animate-fade-up"
          style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: 'both' }}
        >
          <RoomCard
            room={room}
            isSelected={selectedRoom?.id === room.id}
            onSelect={() => onSelectRoom(room)}
          />
        </div>
      ))}
    </div>
  );
}