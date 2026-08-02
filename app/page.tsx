'use client';

import { useState } from 'react';
import { geetaDatabase } from '@/data/geetaDatabase';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chosenShloka, setChosenShloka] = useState<any | null>(null);

  const drawShloka = () => {
    let filtered = geetaDatabase;
    if (selectedCategory !== 'all') {
      filtered = geetaDatabase.filter((item) => item.category === selectedCategory);
    }

    if (filtered.length === 0) {
      alert('Shlokas for this category are being added soon!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    setChosenShloka(filtered[randomIndex]);
  };

  return (
    <>
      {/* Header */}
      <header className="text-center my-6">
        <h1 className="title-font text-3xl md:text-5xl font-bold text-amber-800 tracking-wide">
          The Geeta Jar
        </h1>
        <p className="text-stone-600 mt-2 text-sm md:text-base">
          Draw wisdom for what your heart seeks today.
        </p>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-amber-100 flex flex-col items-center">
        
        {/* Category Selector */}
        <div className="w-full mb-6">
          <label htmlFor="categorySelect" className="block text-sm font-semibold text-stone-700 mb-2">
            Select your current state of mind:
          </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-amber-200 rounded-xl bg-amber-50/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-700 font-medium cursor-pointer"
          >
            <option value="all">🌟 Random Wisdom (All 120 Shlokas)</option>
            <optgroup label="Emotions & Challenges">
              <option value="Anxiety & Overthinking">Anxiety & Overthinking (13)</option>
              <option value="Grief & Loss">Grief & Loss (13)</option>
              <option value="Purpose & Dharma">Purpose & Dharma (13)</option>
              <option value="Anger">Anger (9)</option>
              <option value="Confusion & Doubt">Confusion & Doubt (9)</option>
              <option value="Courage & Motivation">Courage & Motivation (9)</option>
            </optgroup>
            <optgroup label="Growth & Spirit">
              <option value="Peace & Calm">Peace & Calm (9)</option>
              <option value="Love & Compassion">Love & Compassion (9)</option>
              <option value="Hope & Healing">Hope & Healing (9)</option>
              <option value="Gratitude & Joy">Gratitude & Joy (9)</option>
              <option value="Faith & Surrender">Faith & Surrender (9)</option>
              <option value="Self-Realization & Wisdom">Self-Realization & Wisdom (9)</option>
            </optgroup>
          </select>
        </div>

        {/* Jar Interactive Graphic / Button */}
        <div className="relative cursor-pointer group my-4 text-center">
          <div 
            onClick={drawShloka}
            className="w-40 h-52 mx-auto bg-amber-100/60 border-4 border-amber-300 rounded-b-3xl rounded-t-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300 relative overflow-hidden"
          >
            <div className="absolute -top-3 w-28 h-4 bg-amber-700 rounded-md"></div>
            <div className="text-6xl select-none">📜</div>
          </div>
          <button
            onClick={drawShloka}
            className="mt-6 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all transform active:scale-95"
          >
            Pick a Slip
          </button>
        </div>

        {/* Result Card */}
        {chosenShloka && (
          <div className="w-full mt-6 p-6 bg-amber-50/80 border border-amber-200 rounded-xl text-center animate-fadeIn">
            <div className="mb-4 text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
                {chosenShloka.reference} • {chosenShloka.category}
              </span>
            </div>
            
            <div className="space-y-4 text-left">
              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Sanskrit</p>
                <p className="text-lg font-medium text-stone-900 whitespace-pre-line italic mt-1">
                  {chosenShloka.sanskrit}
                </p>
              </div>

              {chosenShloka.iast && (
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">IAST Pronunciation</p>
                  <p className="text-sm text-stone-600 italic mt-1 whitespace-pre-line">{chosenShloka.iast}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">English Translation</p>
                <p className="text-stone-800 text-base leading-relaxed mt-1 font-medium">
                  {chosenShloka.english}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-amber-200/60 text-sm">
                <div className="bg-white/60 p-3 rounded-lg border border-amber-100">
                  <span className="font-bold text-amber-900 block text-xs uppercase">Why it helps</span>
                  <p className="text-stone-700 mt-1">{chosenShloka.whyItHelps || chosenShloka.context}</p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-amber-100">
                  <span className="font-bold text-amber-900 block text-xs uppercase">Core Teaching</span>
                  <p className="text-stone-700 mt-1">{chosenShloka.coreTeaching}</p>
                </div>
              </div>

              <div className="bg-amber-100/40 p-4 rounded-xl border border-amber-200 space-y-2 text-sm">
                <div><strong className="text-amber-900">Reflection:</strong> <span className="text-stone-700">{chosenShloka.reflection}</span></div>
                <div><strong className="text-amber-900">Today's Practice:</strong> <span className="text-stone-700">{chosenShloka.practice}</span></div>
                <div><strong className="text-amber-900">Affirmation:</strong> <em className="text-amber-950 font-medium">&quot;{chosenShloka.affirmation}&quot;</em></div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-8 text-xs text-stone-500 text-center">
        Made with ❤️ for inner peace • Bhagavad Gita Wisdom
      </footer>
    </>
  );
}