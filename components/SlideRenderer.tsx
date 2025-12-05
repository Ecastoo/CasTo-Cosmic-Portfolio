import React, { useState, useRef, useEffect } from 'react';
import { SlideType, SlideData } from '../types';
import { generateViralHook } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, XCircle, ArrowRight, Loader2, Sparkles, Upload } from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
}

const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const [customTeamImage, setCustomTeamImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Reset custom image when slide changes, unless we want to persist it globally (for now, per session)
    // Actually, let's keep it if it's the team slide to prevent reset on re-render
  }, [slide.id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomTeamImage(imageUrl);
    }
  };

  const renderContent = () => {
    switch (slide.type) {
      case SlideType.COVER:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-7xl md:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cosmic-pink via-white to-cosmic-cyan animate-neon-pulse-text"
            >
              {slide.title}
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl text-gray-300 font-light"
            >
              {slide.subtitle}
            </motion.p>
            <div className="flex space-x-4 mt-8">
              {slide.content.tags.map((tag: string, i: number) => (
                <span key={i} className="px-4 py-2 rounded-full border border-cosmic-cyan text-cosmic-cyan bg-cosmic-cyan/10 animate-pulse-glow">
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-20 animate-bounce">
                <span className="text-gray-500 text-sm">Press Space or Arrow Right to Start</span>
            </div>
          </div>
        );

      case SlideType.PROBLEM:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
            <div className="flex flex-col items-center justify-center p-8 border-4 border-red-500/30 rounded-3xl bg-red-900/10 backdrop-blur-sm">
               <div className="mb-6 animate-pulse text-red-500">
                 {slide.content.icon}
               </div>
               <h3 className="text-3xl font-orbitron text-red-400 mb-4">The Editing Grind</h3>
               <p className="text-center text-gray-300">Traditional editing is slow, painful, and kills creativity.</p>
            </div>
            <div className="space-y-6">
              {slide.content.bullets.map((point: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border-l-4 border-cosmic-pink"
                >
                  <XCircle className="text-red-500 shrink-0" />
                  <span className="text-xl">{point}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case SlideType.SOLUTION:
        return (
           <div className="flex flex-col items-center justify-around h-full">
             <div className="flex flex-wrap justify-center gap-8 w-full">
               {slide.content.features.map((feature: any, i: number) => (
                 <motion.div
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="w-full md:w-1/4 p-6 bg-gradient-to-br from-cosmic-purple/20 to-cosmic-bg border border-cosmic-cyan/30 rounded-2xl flex flex-col items-center text-center hover:border-cosmic-cyan transition-colors"
                 >
                    <div className="mb-4 text-cosmic-cyan p-4 bg-cosmic-cyan/10 rounded-full">
                      {React.cloneElement(feature.icon, { size: 32 })}
                    </div>
                    <h3 className="text-xl font-bold font-orbitron mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                 </motion.div>
               ))}
             </div>
             <div className="mt-12 flex items-center space-x-4 text-cosmic-pink">
                <span className="text-2xl font-orbitron">Raw Clip</span>
                <ArrowRight className="animate-pulse" />
                <span className="text-3xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cosmic-pink to-cosmic-cyan">VIRAL GOLD</span>
             </div>
           </div>
        );

      case SlideType.DEMO:
        // Gemini Interactive Demo
        return <GeminiDemo title={slide.subtitle} placeholder={slide.content.placeholderText} />;

      case SlideType.MARKET:
        return (
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-3 gap-6 mb-12">
               {slide.content.stats.map((stat: any, i: number) => (
                 <div key={i} className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                   <div className="text-4xl font-black font-orbitron text-cosmic-cyan mb-2">{stat.value}</div>
                   <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                 </div>
               ))}
            </div>
            <div className="flex-grow bg-white/5 p-8 rounded-2xl border border-white/10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slide.content.chartData}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                   <XAxis dataKey="name" stroke="#ffffff80" />
                   <YAxis stroke="#ffffff80" />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#0B0033', borderColor: '#FF00FF' }} 
                      itemStyle={{ color: '#00FFFF' }}
                   />
                   <Bar dataKey="value" fill="url(#colorGradient)" />
                   <defs>
                     <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#FF00FF" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#6A0DAD" stopOpacity={0.8}/>
                     </linearGradient>
                   </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case SlideType.BUSINESS:
         return (
           <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 h-full pt-10">
             {slide.content.tiers.map((tier: any, i: number) => (
               <motion.div
                 key={i}
                 whileHover={{ scale: 1.05 }}
                 className={`flex-1 p-8 rounded-2xl border flex flex-col ${i === 1 ? 'border-cosmic-pink bg-cosmic-pink/10 shadow-[0_0_30px_rgba(255,0,255,0.2)]' : 'border-white/20 bg-white/5'}`}
               >
                 <h3 className="text-2xl font-orbitron mb-2">{tier.name}</h3>
                 <div className="text-4xl font-bold mb-8 text-cosmic-cyan">{tier.price}</div>
                 <ul className="space-y-4 flex-grow">
                   {tier.features.map((feat: string, j: number) => (
                     <li key={j} className="flex items-center space-x-2 text-sm">
                       <CheckCircle size={16} className="text-green-400" />
                       <span>{feat}</span>
                     </li>
                   ))}
                 </ul>
                 <button className={`w-full py-3 mt-8 rounded-lg font-bold transition-all ${i === 1 ? 'bg-cosmic-pink text-white hover:bg-pink-600' : 'bg-white/10 hover:bg-white/20'}`}>
                   Select
                 </button>
               </motion.div>
             ))}
           </div>
         );
      
      case SlideType.TECH_STACK:
        return (
          <div className="flex items-center justify-center h-full">
             <div className="flex space-x-4 items-center overflow-x-auto p-8">
               {slide.content.stack.map((item: string, i: number) => (
                 <React.Fragment key={i}>
                   <div className="w-48 h-32 flex items-center justify-center p-4 bg-gradient-to-b from-gray-800 to-black border border-cosmic-cyan/50 rounded-xl text-center font-orbitron text-sm shadow-[0_0_15px_rgba(0,255,255,0.15)]">
                     {item}
                   </div>
                   {i < slide.content.stack.length - 1 && (
                     <ArrowRight className="text-cosmic-pink animate-pulse" size={32} />
                   )}
                 </React.Fragment>
               ))}
             </div>
          </div>
        );

      case SlideType.COMPETITION:
         return (
            <div className="h-full overflow-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b border-white/20">
                     <th className="p-4 font-orbitron text-gray-400">Solution</th>
                     <th className="p-4 font-orbitron text-gray-400">Speed</th>
                     <th className="p-4 font-orbitron text-gray-400">Quality</th>
                     <th className="p-4 font-orbitron text-gray-400">Effort</th>
                   </tr>
                 </thead>
                 <tbody>
                   {slide.content.competitors.map((comp: any, i: number) => (
                     <tr key={i} className={`border-b border-white/5 ${comp.name === 'CasTo AI' ? 'bg-cosmic-pink/10' : ''}`}>
                       <td className="p-6 font-bold text-xl">{comp.name}</td>
                       <td className="p-6">{comp.speed}</td>
                       <td className="p-6">{comp.quality}</td>
                       <td className="p-6">{comp.effort}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         );

      case SlideType.TRACTION:
         return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full content-center">
              {slide.content.testimonials.map((text: string, i: number) => (
                 <div key={i} className="bg-white/5 p-8 rounded-tr-3xl rounded-bl-3xl border border-cosmic-purple relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-cosmic-purple/50">"</span>
                    <p className="text-lg italic">{text}</p>
                    <div className="mt-4 flex items-center space-x-2">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                       <span className="text-xs text-gray-400">Verified Creator</span>
                    </div>
                 </div>
              ))}
            </div>
         );
      
      case SlideType.FUNDING:
         return (
            <div className="flex flex-col items-center justify-center h-full">
               <div className="text-center mb-16">
                  <h2 className="text-2xl text-cosmic-cyan mb-2">SEEKING</h2>
                  <div className="text-8xl font-black font-orbitron text-white drop-shadow-[0_0_20px_#FF00FF]">{slide.content.amount}</div>
               </div>
               <div className="flex w-full max-w-4xl space-x-1 h-12 rounded-full overflow-hidden bg-white/10">
                  {slide.content.allocation.map((alloc: any, i: number) => (
                     <div 
                        key={i} 
                        style={{ width: `${alloc.percentage}%` }}
                        className={`h-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-cosmic-pink' : i === 1 ? 'bg-cosmic-purple' : 'bg-cosmic-cyan'}`}
                     >
                        {alloc.label} {alloc.percentage}%
                     </div>
                  ))}
               </div>
               <div className="flex justify-between w-full max-w-4xl mt-4 px-2">
                  {slide.content.allocation.map((alloc: any, i: number) => (
                     <div key={i} className="text-sm text-gray-400 flex items-center space-x-2">
                       <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-cosmic-pink' : i === 1 ? 'bg-cosmic-purple' : 'bg-cosmic-cyan'}`}></div>
                       <span>{alloc.label}</span>
                     </div>
                  ))}
               </div>
            </div>
         );

      case SlideType.ROADMAP:
         return (
            <div className="flex flex-col justify-center h-full relative">
               <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cosmic-purple to-cosmic-cyan -translate-y-1/2 z-0"></div>
               <div className="flex justify-between z-10">
                  {slide.content.milestones.map((mile: any, i: number) => (
                     <div key={i} className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full border-4 border-black mb-4 ${i < 2 ? 'bg-cosmic-cyan' : 'bg-gray-600'}`}></div>
                        <div className="bg-black/80 p-4 border border-white/20 rounded-lg text-center w-40">
                           <div className="text-cosmic-pink font-bold">{mile.q}</div>
                           <div className="text-sm">{mile.goal}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         );

      case SlideType.TEAM:
         return (
            <div className="flex items-center justify-center h-full">
               <div className="flex items-center space-x-12 bg-white/5 p-12 rounded-3xl border border-cosmic-cyan/30 max-w-5xl">
                  {/* Clickable Image Container */}
                  <div 
                    className="w-64 h-64 shrink-0 rounded-full bg-gradient-to-br from-cosmic-purple via-cosmic-pink to-cosmic-cyan p-1.5 shadow-[0_0_30px_rgba(255,0,255,0.4)] cursor-pointer group relative"
                    onClick={() => fileInputRef.current?.click()}
                    title="Click to upload your profile picture"
                  >
                     <input 
                       type="file" 
                       ref={fileInputRef}
                       onChange={handleImageUpload}
                       accept="image/*"
                       className="hidden"
                     />
                     <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden relative">
                        <img 
                          src={customTeamImage || slide.content.imageUrl || "https://picsum.photos/200"} 
                          alt="Founder" 
                          className="w-full h-full object-cover object-top opacity-100 transition-transform group-hover:scale-110 duration-500" 
                        />
                        {/* Overlay instruction */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <Upload className="text-white" />
                           <span className="text-xs text-white ml-2">Upload Photo</span>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h2 className="text-5xl font-orbitron mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-cosmic-cyan">{slide.content.name}</h2>
                     <h3 className="text-2xl text-cosmic-pink mb-6 uppercase tracking-wider">{slide.content.role}</h3>
                     <p className="text-gray-300 text-xl leading-relaxed">{slide.content.bio}</p>
                  </div>
               </div>
            </div>
         );

      case SlideType.CTA:
         return (
            <div className="flex flex-col items-center justify-center h-full text-center">
               <h2 className="text-5xl md:text-7xl font-orbitron font-black mb-8 leading-tight">
                  {slide.content.text}
               </h2>
               <div className="space-y-4">
                  <a 
                     href={`mailto:${slide.content.email}`}
                     className="block px-12 py-6 bg-cosmic-pink hover:bg-pink-600 text-white text-2xl font-bold rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,0,255,0.6)]"
                  >
                     Contact Us
                  </a>
                  <div className="text-gray-400 space-y-2 text-xl">
                     <div>{slide.content.email}</div>
                     {slide.content.phone && <div className="text-cosmic-cyan">{slide.content.phone}</div>}
                  </div>
               </div>
            </div>
         );

      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full p-8 md:p-16 flex flex-col relative z-10"
    >
       {/* Slide Header (except Cover/CTA) */}
       {slide.type !== SlideType.COVER && slide.type !== SlideType.CTA && (
         <div className="mb-12 border-b border-white/10 pb-4 flex justify-between items-end">
           <div>
             <h2 className="text-4xl font-orbitron text-white">{slide.title}</h2>
             {slide.subtitle && <p className="text-cosmic-cyan mt-1">{slide.subtitle}</p>}
           </div>
           <div className="text-xs text-gray-500 font-mono">CONFIDENTIAL</div>
         </div>
       )}
       
       <div className="flex-grow relative">
         {renderContent()}
       </div>
    </motion.div>
  );
};

// Sub-component for the Gemini Demo to keep main file clean
const GeminiDemo: React.FC<{ title: string, placeholder: string }> = ({ title, placeholder }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);
    const result = await generateViralHook(input);
    setOutput(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-8">
      <div className="flex-1 flex flex-col">
        <label className="text-sm text-cosmic-cyan mb-2 font-bold uppercase tracking-wider">Video Context</label>
        <textarea 
          className="w-full h-40 bg-black/40 border border-white/20 rounded-lg p-4 text-white placeholder-gray-600 focus:border-cosmic-pink outline-none transition-colors resize-none"
          placeholder="e.g. A clash royale king tower activation with 1hp left..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 py-3 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          <span>Generate Viral Hook</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        <label className="text-sm text-cosmic-cyan mb-2 font-bold uppercase tracking-wider">AI Output</label>
        <div className="flex-grow bg-gradient-to-br from-white/10 to-transparent rounded-lg border border-white/10 p-6 flex items-center justify-center relative overflow-hidden group">
          {output ? (
             <div className="text-center">
               <p className="text-2xl font-bold font-orbitron mb-4 text-white drop-shadow-md whitespace-pre-wrap">{output}</p>
             </div>
          ) : (
            <div className="text-gray-600 text-center italic">
              AI output will appear here...
            </div>
          )}
          {loading && (
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
               <div className="text-cosmic-pink font-mono animate-pulse">Thinking...</div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SlideRenderer;