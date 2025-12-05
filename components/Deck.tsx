import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from '../constants';
import SlideRenderer from './SlideRenderer';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import JSZip from 'jszip';

const Deck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // @ts-ignore
      const zip = new JSZip();

      // 1. Add README
      zip.file("README.md", `# CasTo Cosmic Pitch Deck Kit 🚀

This kit contains the assets and scripts needed to generate your investor-ready PowerPoint deck.

## Files Included
- **generate_ppt.py**: The Python script to generate the .pptx file.
- **slide_data.json**: The raw data used in the web deck.
- **requirements.txt**: Python dependencies needed.

## Quick Start
1. Install dependencies:
   \`pip install -r requirements.txt\`

2. Run the generator:
   \`python generate_ppt.py\`

3. Open \`CasTo_Cosmic_Ultra_Deck.pptx\` in PowerPoint!

## Assets
The script expects images in \`assets/comic_characters/\`.
`);

      // 2. Add Python Script (Ultra Advanced Version)
      const pythonScript = `from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
import os

# Initialize presentation
prs = Presentation()

# Config for cosmic theme
cosmic_font = 'Orbitron'
colors = {
    "neon_cyan": RGBColor(0, 255, 255),
    "neon_pink": RGBColor(255, 0, 255),
    "white": RGBColor(255, 255, 255),
    "soft_blue": RGBColor(173, 216, 230)
}

# Slide data structure
slides_data = [
    {
        "title": "🌌 CasTo Cosmic Distributor ⚡",
        "subtitle": "World-Class Digital Creator & AI Gaming Visionary",
        "characters": ["assets/comic_characters/character1.png"]
    },
    {
        "title": "About CasTo 🌟",
        "content": (
            "• World-Class Digital Creator & AI Gaming Visionary\\n"
            "• Creator & AI Gaming Specialist — TikTok innovator, Clash Royale strategist, turning gameplay into viral content with AI-powered precision.\\n"
            "• Marketing & Sales Maestro — driving engagement, community growth, and digital brand domination.\\n"
            "• AI & Semiotics Expert — crafting cosmic-level content and decoding social signals.\\n"
            "• Proven Reach & Authority — over 586K hours of live streaming, 20K+ active Discord community members."
        ),
        "characters": ["assets/comic_characters/character2.png"]
    },
    {
        "title": "Why CasTo?",
        "content": (
            "• Cosmic Digital Branding — uniquely blends creativity, strategy, and AI innovation.\\n"
            "• Viral-First Approach — turning TikTok trends and gaming content into market-leading sensations.\\n"
            "• Trusted & Influential — recognized across social, gaming, and AI creator communities."
        ),
        "characters": ["assets/comic_characters/character4.png"]
    },
    {
        "title": "🌌 Connect with CasTo",
        "content": "📩 Email: Ecastoo@icloud.com | 📞 +20 102 213 4445\\n✨ Reach out for collaborations, partnerships, or cosmic guidance!",
        "characters": ["assets/comic_characters/character3.png"]
    }
]

# Helper functions
def add_text(slide, text, left, top, width, height, font_size=32, font_color=colors["white"], bold=False, italic=False):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.color.rgb = font_color
    p.font.bold = bold
    p.font.italic = italic
    p.font.name = cosmic_font
    return box

def add_character(slide, img_path, left, top, width, height):
    if os.path.exists(img_path):
        slide.shapes.add_picture(img_path, left, top, width=width, height=height)

# Generate slides
for sdata in slides_data:
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = RGBColor(11, 0, 51)
    
    # Add title
    add_text(slide, sdata["title"], Inches(0.5), Inches(0.5), Inches(9), Inches(1.5), 48, colors["neon_cyan"], bold=True)
    
    # Add content/subtitle
    if "subtitle" in sdata:
        add_text(slide, sdata["subtitle"], Inches(0.5), Inches(2), Inches(9), Inches(1), 36, colors["neon_pink"])
    if "content" in sdata:
        add_text(slide, sdata["content"], Inches(0.5), Inches(2), Inches(9), Inches(4.5), 24, colors["white"])
    
    # Add comic characters dynamically
    for idx, char_img in enumerate(sdata.get("characters", [])):
        add_character(slide, char_img, Inches(7), Inches(1 + idx), Inches(2), Inches(2))

# Save final deck
deck_file = "CasTo_Cosmic_Ultra_Deck.pptx"
prs.save(deck_file)
print(f"Ultra cosmic deck generated successfully: {deck_file}")
`;
      zip.file("generate_ppt.py", pythonScript);

      // 3. Add JSON Data
      zip.file("slide_data.json", JSON.stringify(SLIDES, null, 2));

      // 4. Add Requirements
      zip.file("requirements.txt", "python-pptx>=0.6.21");

      // Generate Blob
      const content = await zip.generateAsync({ type: "blob" });
      
      // Trigger Download
      const url = window.URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CasTo_Cosmic_Deck_Kit.zip";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Failed to generate ZIP:", error);
      alert("Oops! The cosmic engine stuttered. Could not generate the ZIP file.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = SLIDES[currentIndex];
  const progress = ((currentIndex + 1) / SLIDES.length) * 100;

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Slide Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto h-full flex flex-col">
        <SlideRenderer key={currentSlide.id} slide={currentSlide} />
      </main>

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 pointer-events-none">
        <div className="text-xs text-gray-500 font-mono pointer-events-auto flex items-center gap-4">
           <span>{currentIndex + 1} / {SLIDES.length}</span>
           <button 
             onClick={handleDownload}
             disabled={isDownloading}
             className="flex items-center gap-2 text-cosmic-cyan hover:text-white transition-colors disabled:opacity-50 border border-cosmic-cyan/30 px-3 py-1 rounded hover:bg-cosmic-cyan/10"
             title="Download Assets (ZIP)"
           >
             <Download size={14} className={isDownloading ? "animate-bounce" : ""} />
             <span className="hidden md:inline">{isDownloading ? "Packing..." : "Download Investor Kit (ZIP)"}</span>
           </button>
        </div>
        
        <div className="flex space-x-4 pointer-events-auto">
           <button 
             onClick={prevSlide}
             disabled={currentIndex === 0}
             className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur disabled:opacity-30 transition-all"
           >
             <ChevronLeft />
           </button>
           <button 
             onClick={nextSlide}
             disabled={currentIndex === SLIDES.length - 1}
             className="p-3 rounded-full bg-cosmic-pink hover:bg-pink-600 shadow-[0_0_15px_rgba(255,0,255,0.4)] disabled:opacity-30 transition-all"
           >
             <ChevronRight />
           </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div 
           className="h-full bg-gradient-to-r from-cosmic-purple to-cosmic-cyan transition-all duration-300"
           style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Deck;