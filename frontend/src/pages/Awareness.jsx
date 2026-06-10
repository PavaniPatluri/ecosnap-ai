import React from 'react';
import { Lightbulb, Droplets, Wind, Zap, Quote } from 'lucide-react';

const quotes = [
  {
    text: "The Earth is what we all have in common.",
    author: "Wendell Berry",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
  },
  {
    text: "Water and air, the two essential fluids on which all life depends, have become global garbage cans.",
    author: "Jacques Yves Cousteau",
    icon: <Droplets className="h-6 w-6 text-blue-500" />
  },
  {
    text: "We are the first generation to feel the impact of climate change and the last generation that can do something about it.",
    author: "Jay Inslee",
    icon: <Wind className="h-6 w-6 text-teal-500" />
  },
  {
    text: "The greatest threat to our planet is the belief that someone else will save it.",
    author: "Robert Swan",
    icon: <Zap className="h-6 w-6 text-eco-500" />
  }
];

const facts = [
  "Recycling one aluminum can saves enough energy to run a TV for three hours.",
  "Only 9% of all plastic ever produced has been recycled.",
  "A single tree can absorb up to 21 kilograms of carbon dioxide per year.",
  "Switching to LED bulbs uses 75% less energy and lasts 25 times longer than incandescent lighting."
];

export default function Awareness() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-eco-400 to-teal-400"></div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-600 to-teal-600">Awareness</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every small action counts. Discover why we need to protect our planet and get inspired to make a difference today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quotes.map((q, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
            <Quote className="absolute top-6 right-6 h-12 w-12 text-gray-50 opacity-50 transform rotate-180" />
            <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gray-50 mb-6">
              {q.icon}
            </div>
            <p className="text-xl font-medium text-gray-800 mb-4 italic">"{q.text}"</p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">— {q.author}</p>
          </div>
        ))}
      </div>

      <div className="bg-eco-50 rounded-3xl p-8 sm:p-10 border border-eco-100">
        <h2 className="text-2xl font-bold text-eco-900 mb-6 flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-eco-600" />
          Did You Know?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-eco-50 flex items-start space-x-3">
              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-eco-100 text-eco-600 font-bold">
                {idx + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
