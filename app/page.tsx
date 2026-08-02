'use client';

import { useState } from 'react';
import { geetaDatabase } from '@/data/geetaDatabase';

// Color-coded mapping based on your exact specifications
const categoryStyles: Record<string, { bg: string; border: string; text: string; badge: string; slipBg: string; accent: string }> = {
  "Anxiety & Overthinking": { 
    bg: "bg-[#5C6BC0] hover:bg-[#4E5AB0] text-white", border: "border-[#4E5AB0]", text: "text-white", badge: "bg-[#5C6BC0] text-white", 
    slipBg: "bg-gradient-to-br from-[#5C6BC0] to-[#3F51B5] text-white border-[#3F51B5]", accent: "bg-[#5C6BC0]" 
  },
  "Grief & Loss": { 
    bg: "bg-[#607D8B] hover:bg-[#546E7A] text-white", border: "border-[#546E7A]", text: "text-white", badge: "bg-[#607D8B] text-white", 
    slipBg: "bg-gradient-to-br from-[#607D8B] to-[#455A64] text-white border-[#455A64]", accent: "bg-[#607D8B]" 
  },
  "Purpose & Dharma": { 
    bg: "bg-[#F57C00] hover:bg-[#E65100] text-white", border: "border-[#E65100]", text: "text-white", badge: "bg-[#F57C00] text-white", 
    slipBg: "bg-gradient-to-br from-[#F57C00] to-[#E65100] text-white border-[#E65100]", accent: "bg-[#F57C00]" 
  },
  "Anger": { 
    bg: "bg-[#C65D3B] hover:bg-[#B54E2D] text-white", border: "border-[#B54E2D]", text: "text-white", badge: "bg-[#C65D3B] text-white", 
    slipBg: "bg-gradient-to-br from-[#C65D3B] to-[#A34B2D] text-white border-[#A34B2D]", accent: "bg-[#C65D3B]" 
  },
  "Confusion & Doubt": { 
    bg: "bg-[#7E57C2] hover:bg-[#673AB7] text-white", border: "border-[#673AB7]", text: "text-white", badge: "bg-[#7E57C2] text-white", 
    slipBg: "bg-gradient-to-br from-[#7E57C2] to-[#512DA8] text-white border-[#512DA8]", accent: "bg-[#7E57C2]" 
  },
  "Courage & Motivation": { 
    bg: "bg-[#FB8C00] hover:bg-[#F57C00] text-white", border: "border-[#F57C00]", text: "text-white", badge: "bg-[#FB8C00] text-white", 
    slipBg: "bg-gradient-to-br from-[#FB8C00] to-[#EF6C00] text-white border-[#EF6C00]", accent: "bg-[#FB8C00]" 
  },
  "Peace & Calm": { 
    bg: "bg-[#81C784] hover:bg-[#66BB6A] text-stone-900", border: "border-[#66BB6A]", text: "text-stone-900", badge: "bg-[#81C784] text-stone-900", 
    slipBg: "bg-gradient-to-br from-[#81C784] to-[#4CAF50] text-stone-900 border-[#4CAF50]", accent: "bg-[#81C784]" 
  },
  "Love & Compassion": { 
    bg: "bg-[#E91E63] hover:bg-[#D81B60] text-white", border: "border-[#D81B60]", text: "text-white", badge: "bg-[#E91E63] text-white", 
    slipBg: "bg-gradient-to-br from-[#E91E63] to-[#C2185B] text-white border-[#C2185B]", accent: "bg-[#E91E63]" 
  },
  "Hope & Healing": { 
    bg: "bg-[#43A047] hover:bg-[#388E3C] text-white", border: "border-[#388E3C]", text: "text-white", badge: "bg-[#43A047] text-white", 
    slipBg: "bg-gradient-to-br from-[#43A047] to-[#2E7D32] text-white border-[#2E7D32]", accent: "bg-[#43A047]" 
  },
  "Gratitude & Joy": { 
    bg: "bg-[#FBC02D] hover:bg-[#F9A825] text-stone-900", border: "border-[#F9A825]", text: "text-stone-900", badge: "bg-[#FBC02D] text-stone-900", 
    slipBg: "bg-gradient-to-br from-[#FBC02D] to-[#F57F17] text-stone-900 border-[#F57F17]", accent: "bg-[#FBC02D]" 
  },
  "Faith & Surrender": { 
    bg: "bg-[#6A1B9A] hover:bg-[#4A148C] text-white", border: "border-[#4A148C]", text: "text-white", badge: "bg-[#6A1B9A] text-white", 
    slipBg: "bg-gradient-to-br from-[#6A1B9A] to-[#38006B] text-white border-[#38006B]", accent: "bg-[#6A1B9A]" 
  },
  "Self-Realization & Wisdom": { 
    bg: "bg-[#00695C] hover:bg-[#004D40] text-white", border: "border-[#004D40]", text: "text-white", badge: "bg-[#00695C] text-white", 
    slipBg: "bg-gradient-to-br from-[#00695C] to-[#00332C] text-white border-[#00332C]", accent: "bg-[#00695C]" 
  }
};

const categories = Object.keys(categoryStyles);

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chosenShloka, setChosenShloka] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'jar' | 'slips'>('jar');

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setActiveTab('slips');
    setChosenShloka(null);
  };

  const drawRandomFromJar = () => {
    const filtered = selectedCategory 
      ? geetaDatabase.filter(item => item.category === selectedCategory) 
      : geetaDatabase;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    setChosenShloka(filtered[randomIndex]);
  };

  const handleFlipSlip = (shloka: any) => {
    setChosenShloka(shloka);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const currentSlips = selectedCategory 
    ? geetaDatabase.filter(item => item.category === selectedCategory) 
    : geetaDatabase;

  return (
    <div className="min-h-screen bg-[#FDFBF6] py-10 px-4 font-sans text-[#2C2C2C] flex flex-col items-center">
      
      {/* Header */}
      <header className="text-center mb-8 max-w-2xl">
        <span className="bg-[#C9A227] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-md">
          ✨ Bhagavad Gita Wisdom Sanctuary ✨
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-[#2C2C2C] mt-4 tracking-wide font-serif drop-shadow-sm">
          The Online Geeta Jar
        </h1>
        <p className="text-[#6B7280] mt-2 text-base md:text-lg font-medium">
          Select an emotional theme tile to focus, flip a color-coded inverted slip, and uncover divine clarity.
        </p>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl bg-[#FFFFFF] shadow-2xl rounded-3xl p-6 md:p-10 border-2 border-[#E8E3D9] flex flex-col items-center">
        
        {/* Step 1: Strictly 6 columns per row (6x2 matrix) with compact, spaced boxes */}
        <div className="w-full mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#2C2C2C]">
              {selectedCategory ? 'Selected State of Mind:' : '1. Choose a Color-Coded Theme:'}
            </h2>
            {selectedCategory && (
              <button 
                onClick={() => { setSelectedCategory(null); setChosenShloka(null); }}
                className="text-xs text-white font-bold bg-[#C9A227] px-4 py-1.5 rounded-full shadow-md hover:bg-[#b08e20] transition"
              >
                Show All Categories ↺
              </button>
            )}
          </div>
          
          {/* grid-cols-6 ensures exactly 6 items per row across wider screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories
              .filter(cat => !selectedCategory || selectedCategory === cat)
              .map((cat) => {
                const style = categoryStyles[cat];
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`p-2.5 rounded-xl text-[11px] font-bold transition-all border text-left flex flex-col justify-between shadow-sm relative overflow-hidden group ${style.bg} ${style.border} ${
                      isSelected ? 'ring-4 ring-[#C9A227] scale-102 shadow-md w-full' : 'hover:scale-101 hover:shadow'
                    }`}
                    style={{ minHeight: '65px', maxHeight: '75px' }}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 ${style.accent}`}></div>
                    <span className="leading-tight drop-shadow-xs line-clamp-2">{cat}</span>
                    <span className="text-[9px] font-semibold bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm self-start mt-1">
                      {geetaDatabase.filter(i => i.category === cat).length}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Padding Separator / Divider */}
        <div className="w-full border-t-2 border-[#E5E0D5] my-4"></div>

        {/* Mode Switcher Tabs */}
        <div className="flex bg-[#FDFBF6] p-1.5 rounded-2xl mb-8 border border-[#E8E3D9] w-full max-w-xs shadow-inner">
          <button
            onClick={() => setActiveTab('jar')}
            className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'jar' ? 'bg-[#C9A227] text-white shadow-md' : 'text-[#6B7280] hover:text-[#2C2C2C]'
            }`}
          >
            🏺 Draw From Jar
          </button>
          <button
            onClick={() => setActiveTab('slips')}
            className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'slips' ? 'bg-[#C9A227] text-white shadow-md' : 'text-[#6B7280] hover:text-[#2C2C2C]'
            }`}
          >
            Inverted Slips {selectedCategory ? `(${selectedCategory})` : ''}
          </button>
        </div>

        {/* TAB 1: JAR EXPERIENCE */}
        {activeTab === 'jar' && (
          <div className="flex flex-col items-center my-6">
            <div 
              onClick={drawRandomFromJar}
              className="relative cursor-pointer group text-center"
            >
              <div className="w-48 h-60 mx-auto bg-gradient-to-b from-[#FDFBF6] via-[#E8E3D9] to-[#E5E0D5] border-4 border-[#C9A227] rounded-b-3xl rounded-t-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -top-3 w-32 h-6 bg-[#2C2C2C] rounded-md shadow-md"></div>
                <div className="text-7xl select-none animate-bounce duration-1000">📜</div>
              </div>
            </div>
            <button
              onClick={drawRandomFromJar}
              className="mt-6 bg-[#C9A227] hover:bg-[#b08e20] text-white font-bold text-base px-10 py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 tracking-wide"
            >
              ✨ Pick a Random Slip {selectedCategory ? `from ${selectedCategory}` : ''}
            </button>
          </div>
        )}

        {/* TAB 2: COLOR-CODED INVERTED SLIPS */}
        {activeTab === 'slips' && (
          <div className="w-full">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2C2C2C] bg-[#FDFBF6] px-4 py-1.5 rounded-full border border-[#E8E3D9] shadow-xs">
                {selectedCategory ? `Showing Slips for: ${selectedCategory}` : 'All Inverted Slips — Tap any color-coded card to flip'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[450px] overflow-y-auto p-4 border-2 border-[#E8E3D9] rounded-2xl bg-[#FDFBF6] shadow-inner">
              {currentSlips.map((item: any, idx: number) => {
                const style = categoryStyles[item.category] || { slipBg: "bg-gradient-to-br from-[#2C2C2C] to-[#6B7280] text-white border-[#E8E3D9]" };
                return (
                  <div
                    key={idx}
                    onClick={() => handleFlipSlip(item)}
                    className={`${style.slipBg} p-4 rounded-2xl shadow-lg cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center group relative overflow-hidden border-2`}
                    style={{ minHeight: '125px' }}
                  >
                    <div className="absolute top-2 left-2 text-[10px] bg-black/40 px-2 py-0.5 rounded text-white font-mono tracking-wider">
                      #{idx + 1}
                    </div>
                    <div className="text-3xl my-2 group-hover:scale-125 transition-transform duration-300">
                      
                    </div>
                    <span className="text-xs font-bold tracking-wide bg-white/20 px-3 py-1 rounded-lg w-full truncate shadow-xs">
                      Flip Slip ✨
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT DISPLAY CARD */}
        {chosenShloka && (
          <div className="w-full mt-12 p-6 md:p-10 bg-[#FFFFFF] border-2 border-[#C9A227] rounded-3xl text-center shadow-2xl relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 right-0 bg-[#C9A227] text-white text-xs font-extrabold px-5 py-2 rounded-bl-2xl shadow-md uppercase tracking-wider">
              {chosenShloka.reference}
            </div>

            <div className="mb-4 text-left">
              <span className={`inline-block text-xs font-extrabold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-sm ${categoryStyles[chosenShloka.category]?.badge || 'bg-[#E8E3D9] text-[#2C2C2C]'}`}>
                {chosenShloka.category}
              </span>
            </div>
            
            <div className="space-y-6 text-left mt-3">
              <div>
                <p className="text-xs font-extrabold text-[#6B7280] uppercase tracking-widest">Sanskrit Verse</p>
                <p className="text-xl md:text-2xl font-bold text-[#2C2C2C] whitespace-pre-line italic mt-1.5 leading-relaxed font-serif">
                  {chosenShloka.sanskrit}
                </p>
              </div>

              {chosenShloka.iast && (
                <div className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#E8E3D9] shadow-xs">
                  <p className="text-xs font-extrabold text-[#6B7280] uppercase tracking-widest">IAST Pronunciation</p>
                  <p className="text-sm text-[#2C2C2C] italic mt-1 whitespace-pre-line font-medium">{chosenShloka.iast}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-extrabold text-[#6B7280] uppercase tracking-widest">English Translation</p>
                <p className="text-[#2C2C2C] text-base md:text-lg leading-relaxed mt-1 font-semibold">
                  {chosenShloka.english}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t-2 border-[#E5E0D5] text-sm">
                <div className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#E8E3D9] shadow-sm">
                  <span className="font-extrabold text-[#2C2C2C] block text-xs uppercase tracking-wider mb-1">💡 Why it helps</span>
                  <p className="text-[#6B7280] leading-relaxed font-medium">{chosenShloka.whyItHelps || chosenShloka.context}</p>
                </div>
                <div className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#E8E3D9] shadow-sm">
                  <span className="font-extrabold text-[#2C2C2C] block text-xs uppercase tracking-wider mb-1">🎯 Core Teaching</span>
                  <p className="text-[#6B7280] leading-relaxed font-medium">{chosenShloka.coreTeaching}</p>
                </div>
              </div>

              <div className="bg-[#FDFBF6] p-5 rounded-2xl border-2 border-[#E8E3D9] space-y-3 text-sm shadow-inner">
                <div><strong className="text-[#2C2C2C] block text-xs uppercase tracking-wider">🌿 Reflection:</strong> <span className="text-[#6B7280] font-semibold">{chosenShloka.reflection}</span></div>
                <div><strong className="text-[#2C2C2C] block text-xs uppercase tracking-wider">🧘 Today's Practice:</strong> <span className="text-[#6B7280] font-semibold">{chosenShloka.practice}</span></div>
                <div><strong className="text-[#2C2C2C] block text-xs uppercase tracking-wider">✨ Affirmation:</strong> <em className="text-[#2C2C2C] font-bold block mt-1 text-base">&quot;{chosenShloka.affirmation}&quot;</em></div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="mt-8 text-xs font-semibold text-[#6B7280] text-center tracking-wide">
        Made with ❤️ for inner peace • Bhagavad Gita Wisdom
      </footer>
    </div>
  );
}