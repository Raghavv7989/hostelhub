'use client';

import React, { useEffect, useState } from 'react';

const features = [
  { icon: '🏠', title: 'Choose Your Room', desc: 'Single, Double, Triple or Quad sharing' },
  { icon: '❄️', title: 'Non-AC Comfort', desc: 'Economy, Standard & Premium classes' },
  { icon: '💳', title: 'Instant Payment', desc: 'UPI, Net Banking, Card — all in one' },
  { icon: '📋', title: 'Digital Booking', desc: 'Paperless confirmation in seconds' },
];

export default function AuthLeftPanel() {
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-[480px] xl:w-[520px] 2xl:w-[600px] gradient-primary text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-5" />
        <div className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-white opacity-5" />
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-amber-400 opacity-10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white opacity-10" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col h-full px-12 py-14">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="11" width="18" height="9" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="4" y="7" width="14" height="5" rx="1" fill="white" fillOpacity="0.7"/>
              <rect x="7" y="3" width="8" height="5" rx="1" fill="white" fillOpacity="0.5"/>
              <rect x="9" y="14" width="4" height="6" rx="0.5" fill="white" fillOpacity="0.5"/>
              <rect x="5" y="9" width="2" height="2" rx="0.25" fill="white" fillOpacity="0.8"/>
              <rect x="15" y="9" width="2" height="2" rx="0.25" fill="white" fillOpacity="0.8"/>
            </svg>
          </div>
          <div>
            <h1 className="font-display font-700 text-xl leading-tight">HostelHub</h1>
            <p className="text-white/60 text-xs font-body">University Housing Portal</p>
          </div>
        </div>

        {/* 3D Building Illustration */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="animate-float mb-10">
            <BuildingIllustration />
          </div>

          <h2 className="font-display font-700 text-3xl xl:text-4xl leading-tight mb-4">
            Your home away<br />
            <span className="text-amber-300">from home.</span>
          </h2>
          <p className="text-white/70 font-body text-base leading-relaxed mb-10">
            Book your hostel room in minutes. Choose your sharing preference, pick your class, and confirm your stay — all online.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3">
            {features?.map((f) => (
              <div key={`feature-${f?.title}`} className="flex items-start gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-lg">{f?.icon}</span>
                <div>
                  <p className="font-display font-600 text-sm text-white">{f?.title}</p>
                  <p className="text-white/60 text-xs font-body mt-0.5">{f?.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-white/40 text-xs font-body">
            © {currentYear} HostelHub · Trusted by 50+ universities across India
          </p>
        </div>
      </div>
    </div>
  );
}

function BuildingIllustration() {
  return (
    <div className="relative w-full flex justify-center">
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="140" cy="192" rx="80" ry="6" fill="rgba(0,0,0,0.2)"/>

        {/* Main Building Body */}
        <rect x="60" y="60" width="160" height="130" rx="4" fill="white" fillOpacity="0.15"/>
        <rect x="60" y="60" width="160" height="130" rx="4" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>

        {/* Roof */}
        <polygon points="50,62 140,20 230,62" fill="white" fillOpacity="0.25"/>
        <polygon points="50,62 140,20 230,62" stroke="white" strokeOpacity="0.4" strokeWidth="1"/>

        {/* Chimney */}
        <rect x="155" y="30" width="10" height="20" rx="2" fill="white" fillOpacity="0.3"/>

        {/* Windows Row 1 */}
        {[80, 110, 140, 170, 200]?.map((x, i) => (
          <rect key={`win-r1-${i}`} x={x} y="75" width="18" height="16" rx="2" fill="white" fillOpacity={i % 2 === 0 ? "0.6" : "0.3"}/>
        ))}

        {/* Windows Row 2 */}
        {[80, 110, 140, 170, 200]?.map((x, i) => (
          <rect key={`win-r2-${i}`} x={x} y="105" width="18" height="16" rx="2" fill="white" fillOpacity={i % 3 === 0 ? "0.6" : "0.3"}/>
        ))}

        {/* Windows Row 3 */}
        {[80, 110, 140, 170, 200]?.map((x, i) => (
          <rect key={`win-r3-${i}`} x={x} y="135" width="18" height="16" rx="2" fill="amber" fillOpacity="0.5"
            style={{ fill: i === 2 ? '#F59E0B' : 'white', fillOpacity: i === 2 ? 0.7 : 0.3 }}
          />
        ))}

        {/* Door */}
        <rect x="122" y="158" width="36" height="32" rx="3" fill="white" fillOpacity="0.4"/>
        <rect x="124" y="160" width="15" height="28" rx="2" fill="white" fillOpacity="0.5"/>
        <rect x="141" y="160" width="15" height="28" rx="2" fill="white" fillOpacity="0.3"/>
        <circle cx="139" cy="175" r="2" fill="white" fillOpacity="0.8"/>
        <circle cx="141" cy="175" r="2" fill="white" fillOpacity="0.8"/>

        {/* Steps */}
        <rect x="112" y="187" width="56" height="4" rx="1" fill="white" fillOpacity="0.3"/>
        <rect x="116" y="183" width="48" height="4" rx="1" fill="white" fillOpacity="0.2"/>

        {/* Trees */}
        <circle cx="35" cy="155" r="18" fill="white" fillOpacity="0.12"/>
        <rect x="33" y="168" width="4" height="20" rx="1" fill="white" fillOpacity="0.2"/>
        <circle cx="245" cy="155" r="15" fill="white" fillOpacity="0.12"/>
        <rect x="243" y="165" width="4" height="20" rx="1" fill="white" fillOpacity="0.2"/>

        {/* Amber accent dots (lights) */}
        <circle cx="98" cy="84" r="2" fill="#F59E0B" fillOpacity="0.8"/>
        <circle cx="178" cy="114" r="2" fill="#F59E0B" fillOpacity="0.8"/>
        <circle cx="148" cy="144" r="2" fill="#F59E0B" fillOpacity="0.8"/>
      </svg>
    </div>
  );
}