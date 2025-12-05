export enum SlideType {
  COVER = 'COVER',
  PROBLEM = 'PROBLEM',
  SOLUTION = 'SOLUTION',
  DEMO = 'DEMO',
  MARKET = 'MARKET',
  BUSINESS = 'BUSINESS',
  TECH_STACK = 'TECH_STACK',
  COMPETITION = 'COMPETITION',
  TRACTION = 'TRACTION',
  FUNDING = 'FUNDING',
  ROADMAP = 'ROADMAP',
  TEAM = 'TEAM',
  CTA = 'CTA',
}

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content: any; // Flexible content based on type
}

export interface MarketData {
  name: string;
  value: number;
}
