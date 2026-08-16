import { Link } from 'react-router-dom';

export default function UIPolish() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center py-16 px-6 relative overflow-hidden selection:bg-brand-orange selection:text-white">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-midnight/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl w-full z-10">
        
        {/* Navigation */}
        <Link to="/" className="text-slate-400 hover:text-brand-orange transition-colors font-bold mb-12 inline-flex items-center gap-2 uppercase tracking-widest text-sm">
          &larr; Back to Hub
        </Link>
        
        <header className="mb-20">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">UI Polish.</span>
          </h1>
          <p className="text-2xl text-brand-orange font-bold uppercase tracking-widest mb-6">
            Efficiency Engineered. Growth Automated.
          </p>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Showcasing crisp, lightweight component interactions powered entirely by native CSS and Tailwind utility classes. Zero JavaScript required. High-performance rendering.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Feature 1: The Glowing Glass Card */}
          <div className="group relative rounded-2xl bg-slate-900/50 p-1 border border-slate-800 hover:border-brand-orange/50 transition-colors duration-500 backdrop-blur-md cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 via-brand-orange/0 to-brand-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative bg-slate-950 p-8 rounded-xl h-full flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-midnight rounded-full blur-[50px] group-hover:bg-brand-orange transition-colors duration-700"></div>
              
              <div>
                <div className="w-14 h-14 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-orange transition-all duration-300">
                  <svg className="w-7 h-7 text-slate-400 group-hover:text-brand-orange transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors duration-300 mb-3">Speed & Precision</h3>
                <p className="text-slate-400 leading-relaxed">
                  Hover to engage complex nested style reactions using Tailwind's <code className="text-brand-orange bg-brand-orange/10 px-2 py-1 rounded">group-hover</code>. The glow, the scale, and the border react simultaneously.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2: Dark Mode Smart Forms */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-midnight to-brand-orange"></div>
            <h2 className="text-2xl font-bold text-white mb-8">Smart Input Architecture</h2>
            
            <div className="relative mb-8">
              <input 
                type="text" 
                id="clientName" 
                className="peer w-full border-b-2 border-slate-700 bg-transparent py-3 text-white focus:border-brand-orange focus:outline-none placeholder-transparent transition-colors"
                placeholder="Client Name"
              />
              <label 
                htmlFor="clientName" 
                className="absolute left-0 -top-3.5 text-sm text-brand-orange font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:font-normal peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-brand-orange peer-focus:font-bold cursor-text"
              >
                Enter Company Name
              </label>
            </div>

            <button className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg hover:bg-brand-orange hover:shadow-[0_0_20px_rgba(255,95,31,0.4)] focus:ring-4 focus:ring-brand-orange/50 transition-all duration-300 uppercase tracking-widest text-sm">
              Initialize Workflow
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}