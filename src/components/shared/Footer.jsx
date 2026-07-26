import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/60 py-3.5 px-6 md:px-8 mt-auto select-none print:hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-500">
        
        {/* Left Side: Copyright + Links */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 text-center sm:text-left">
          <span className="text-slate-800 font-extrabold">Copyright © 2025 Peterdraw</span>
          <div className="flex items-center gap-5 text-slate-400 font-semibold">
            <a href="#" className="hover:text-[#6366F1] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#6366F1] transition-colors">Term and conditions</a>
            <a href="#" className="hover:text-[#6366F1] transition-colors">Contact</a>
          </div>
        </div>

        {/* Right Side: Circular Social Outlines */}
        <div className="flex items-center gap-2.5">
          {[
            { 
              Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              ), 
              href: "https://facebook.com" 
            },
            { 
              Icon: () => (
                <span className="font-black text-[10px] h-3 w-3 flex items-center justify-center leading-none">𝕏</span>
              ), 
              href: "https://x.com" 
            },
            { 
              Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              ), 
              href: "https://instagram.com" 
            },
            { 
              Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              ), 
              href: "https://youtube.com" 
            },
            { 
              Icon: (props) => (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              ), 
              href: "https://linkedin.com" 
            }
          ].map((social, idx) => {
            const SocialIcon = social.Icon;
            return (
              <a 
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="h-6 w-6 rounded-full border border-slate-200 text-slate-400 hover:text-slate-800 hover:border-slate-400 flex items-center justify-center transition-all bg-white shadow-xs shrink-0"
              >
                <SocialIcon className="h-3 w-3" />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}
