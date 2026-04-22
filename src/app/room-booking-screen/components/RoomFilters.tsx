'use client';

import React from 'react';
import { RoomFiltersState } from './types';
import { blocks, floors } from './mockData';

interface RoomFiltersProps {
  filters: RoomFiltersState;
  onChange: (filters: RoomFiltersState) => void;
  totalCount: number;
}

const sharingOptions = [
  { value: 'all', label: 'All Sharing' },
  { value: '1', label: 'Single' },
  { value: '2', label: 'Double' },
  { value: '3', label: 'Triple' },
  { value: '4', label: 'Quad' },
];

const priceRanges = [
  { value: 'all', label: 'Any Price' },
  { value: '0-12000', label: 'Under ₹12K' },
  { value: '12000-18000', label: '₹12K–18K' },
  { value: '18000-25000', label: '₹18K–25K' },
  { value: '25000', label: 'Above ₹25K' },
];

const availabilityOptions = [
  { value: 'all', label: 'All Rooms' },
  { value: 'available', label: 'Available Only' },
];

export default function RoomFilters({ filters, onChange, totalCount }: RoomFiltersProps) {
  const update = (key: keyof RoomFiltersState, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = [
    filters.block !== 'all',
    filters.floor !== 'all',
    filters.sharingType !== 'all',
    filters.priceRange !== 'all',
    filters.availability !== 'available',
  ].filter(Boolean).length;

  const resetFilters = () => {
    onChange({
      block: 'all',
      floor: 'all',
      sharingType: 'all',
      priceRange: 'all',
      messIncluded: false,
      availability: 'available',
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm animate-fade-up">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Block Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide whitespace-nowrap">Block</label>
          <div className="flex gap-1">
            <button
              onClick={() => update('block', 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                filters.block === 'all' ?'bg-blue-600 text-white shadow-sm' :'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {blocks.map((b) => (
              <button
                key={`block-btn-${b}`}
                onClick={() => update('block', b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                  filters.block === b
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* Floor Filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide whitespace-nowrap">Floor</label>
          <div className="flex gap-1">
            <button
              onClick={() => update('floor', 'all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                filters.floor === 'all' ?'bg-blue-600 text-white shadow-sm' :'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {floors.map((f) => (
              <button
                key={`floor-btn-${f}`}
                onClick={() => update('floor', f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                  filters.floor === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                F{f}
              </button>
            ))}
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        {/* Sharing Type */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide whitespace-nowrap">Sharing</label>
          <select
            value={filters.sharingType}
            onChange={(e) => update('sharingType', e.target.value)}
            className="text-xs font-display font-600 bg-slate-100 text-slate-700 rounded-lg px-3 py-1.5 border-none outline-none cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {sharingOptions.map((o) => (
              <option key={`sharing-opt-${o.value}`} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide whitespace-nowrap">Price</label>
          <select
            value={filters.priceRange}
            onChange={(e) => update('priceRange', e.target.value)}
            className="text-xs font-display font-600 bg-slate-100 text-slate-700 rounded-lg px-3 py-1.5 border-none outline-none cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {priceRanges.map((p) => (
              <option key={`price-opt-${p.value}`} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Availability toggle */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-display font-600 text-slate-500 uppercase tracking-wide whitespace-nowrap">Show</label>
          <div className="flex gap-1">
            {availabilityOptions.map((a) => (
              <button
                key={`avail-btn-${a.value}`}
                onClick={() => update('availability', a.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-600 transition-all duration-150 ${
                  filters.availability === a.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset + count */}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-slate-500 font-body tabular-nums">
            <span className="font-display font-700 text-slate-700">{totalCount}</span> rooms
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-red-500 font-display font-600 hover:text-red-700 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Clear filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}