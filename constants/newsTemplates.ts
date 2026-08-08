import { NewsItem } from '@/types/news';
import { GameTime } from '@/types/game';

/**
 * Initial News Catalog items to display on fresh game load
 */
export const INITIAL_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news_init_1',
    headline: 'Prime Minister Outlines 5-Year Vision for National Development',
    summary: 'The government has released its strategic roadmap focusing on economic growth, infrastructure expansion, and digital governance.',
    category: 'National',
    timestamp: 'May, Week 2, 2029',
    importance: 'Breaking',
    sentiment: 'Positive',
  },
  {
    id: 'news_init_2',
    headline: 'Reserve Bank Reports Stable Inflation Rates',
    summary: 'Retail inflation remains steady at 4.1% as central economic indicators show resilient consumer sentiment.',
    category: 'Economy',
    timestamp: 'May, Week 1, 2029',
    importance: 'Important',
    sentiment: 'Neutral',
  },
  {
    id: 'news_init_3',
    headline: 'Monsoon Preparedness Reviewed in PMO High-Level Meeting',
    summary: 'Ministers and disaster management officials evaluated flood defense systems across vulnerable coastal and eastern districts.',
    category: 'Public',
    timestamp: 'May, Week 1, 2029',
    importance: 'Normal',
    sentiment: 'Positive',
  },
];
