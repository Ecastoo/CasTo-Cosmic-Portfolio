import React from 'react';
import { SlideType, SlideData } from './types';
import { 
  Zap, 
  Video, 
  Smartphone, 
  TrendingUp, 
  DollarSign, 
  Code, 
  Shield, 
  Award, 
  Rocket, 
  Users, 
  Globe 
} from 'lucide-react';

export const SLIDES: SlideData[] = [
  {
    id: 'cover',
    type: SlideType.COVER,
    title: 'CasTo Cosmic Distributor ⚡',
    subtitle: 'World-Class Digital Creator & AI Gaming Visionary',
    content: {
      tags: ['#Viral', '#Gaming', '#AI'],
    }
  },
  {
    id: 'problem',
    type: SlideType.PROBLEM,
    title: 'The Editing Black Hole',
    content: {
      bullets: [
        'Hours wasted cutting dead air',
        'Complex software learning curve',
        'Missed viral trends due to delay',
        'Inconsistent subtitle quality'
      ],
      icon: <Video size={64} className="text-red-500" />
    }
  },
  {
    id: 'solution',
    type: SlideType.SOLUTION,
    title: 'Warp Speed Virality',
    content: {
      features: [
        { title: 'Auto-Trim', desc: 'AI detects highlights', icon: <Zap /> },
        { title: 'Instant VFX', desc: 'Cosmic particle effects', icon: <Smartphone /> },
        { title: 'Smart Captions', desc: 'Automated kinetic text', icon: <Code /> },
      ]
    }
  },
  {
    id: 'demo',
    type: SlideType.DEMO,
    title: 'CasTo AI In Action',
    subtitle: 'Live Gemini-Powered Hook Generator',
    content: {
      placeholderText: "Upload raw footage -> AI Magic -> Viral Clip"
    }
  },
  {
    id: 'market',
    type: SlideType.MARKET,
    title: 'A Universe of Creators',
    content: {
      stats: [
        { label: 'TikTok Users', value: '1B+' },
        { label: 'Gaming Creators', value: '50M+' },
        { label: 'Daily Uploads', value: '34M' },
      ],
      chartData: [
        { name: '2022', value: 20 },
        { name: '2023', value: 45 },
        { name: '2024', value: 75 },
        { name: '2025', value: 120 },
      ]
    }
  },
  {
    id: 'business',
    type: SlideType.BUSINESS,
    title: 'Monetization Orbit',
    content: {
      tiers: [
        { name: 'Creator', price: '$9/mo', features: ['100 Mins/mo', '720p Export', 'Basic VFX'] },
        { name: 'Pro', price: '$29/mo', features: ['Unlimited Mins', '4K Export', 'Custom Branding'] },
        { name: 'Enterprise', price: 'Custom', features: ['API Access', 'Dedicated Support', 'White Label'] },
      ]
    }
  },
  {
    id: 'tech',
    type: SlideType.TECH_STACK,
    title: 'Powered by Gemini',
    content: {
      stack: ['Input Stream', 'Gemini Multimodal', 'FFmpeg Processing', 'TikTok API']
    }
  },
  {
    id: 'competition',
    type: SlideType.COMPETITION,
    title: 'Lightyears Ahead',
    content: {
      competitors: [
        { name: 'Manual Editing', speed: 'Slow', quality: 'High', effort: 'High' },
        { name: 'Generic AI', speed: 'Fast', quality: 'Low', effort: 'Low' },
        { name: 'CasTo AI', speed: 'Instant', quality: 'Viral', effort: 'Zero' },
      ]
    }
  },
  {
    id: 'traction',
    type: SlideType.TRACTION,
    title: 'Why CasTo?',
    content: {
      testimonials: [
        "Cosmic Digital Branding — uniquely blends creativity, strategy, and AI innovation.",
        "Viral-First Approach — turning TikTok trends and gaming content into market-leading sensations.",
        "Trusted & Influential — recognized across social, gaming, and AI creator communities."
      ]
    }
  },
  {
    id: 'funding',
    type: SlideType.FUNDING,
    title: 'Fuel Our Rocket',
    content: {
      amount: '$1.5M',
      allocation: [
        { label: 'Engineering', percentage: 50 },
        { label: 'Marketing', percentage: 30 },
        { label: 'Ops', percentage: 20 },
      ]
    }
  },
  {
    id: 'roadmap',
    type: SlideType.ROADMAP,
    title: 'The Galaxy Map',
    content: {
      milestones: [
        { q: 'Q1 2024', goal: 'Mobile App Launch' },
        { q: 'Q2 2024', goal: '1M Users' },
        { q: 'Q3 2024', goal: 'Enterprise API' },
        { q: 'Q4 2024', goal: 'CasTo Live Studio' },
      ]
    }
  },
  {
    id: 'team',
    type: SlideType.TEAM,
    title: 'Mission Control',
    content: {
      name: 'CasTo',
      role: 'World-Class Digital Creator & AI Gaming Visionary',
      bio: 'Creator & AI Gaming Specialist — TikTok innovator, Clash Royale strategist, turning gameplay into viral content with AI-powered precision.\n\nMarketing & Sales Maestro — driving engagement, community growth, and digital brand domination across multiple platforms.\n\nAI & Semiotics Expert — crafting cosmic-level content, decoding social signals, and transforming ordinary interactions into viral experiences.\n\nProven Reach & Authority — over 586K hours of live streaming, 20K+ active Discord community members, and a growing global creator network.',
      // Using a placeholder that resembles the user's description (Man in hat) to maintain aesthetic until upload
      imageUrl: 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    id: 'cta',
    type: SlideType.CTA,
    title: 'Join the Revolution',
    content: {
      text: 'Connect with CasTo',
      email: 'Ecastoo@icloud.com',
      phone: '+20 102 213 4445'
    }
  }
];