import { NewsItem, NewsCategory, NewsImportance, NewsSentiment } from '@/types/news';
import { Decision, DecisionOption, DecisionResult } from '@/types/decision';
import { GameEvent } from '@/types/event';
import { GameTime } from '@/types/game';

/**
 * Pure Handcrafted News Engine Service
 */

/**
 * Formats game time object into readable timestamp string
 */
export function formatNewsTimestamp(time: GameTime): string {
  return `${time.month}, Week ${time.week}, ${time.year}`;
}

/**
 * Generates a handcrafted NewsItem after a policy/decision execution
 */
export function generateNewsFromDecision(
  decision: Decision,
  selectedOption: DecisionOption,
  result: DecisionResult,
  time: GameTime
): NewsItem {
  const timestamp = formatNewsTimestamp(time);
  const optionId = selectedOption.id;

  let headline = `Government Enacts Directive: "${selectedOption.title}"`;
  let summary = `The Prime Minister's office has formally passed executive measures regarding ${decision.title.toLowerCase()}.`;
  let category: NewsCategory = 'National';
  let sentiment: NewsSentiment = 'Positive';
  let importance: NewsImportance = 'Important';

  // Handcrafted templates for specific decisions
  if (decision.id === 'assam_flood_crisis') {
    if (optionId === 'opt_a') {
      headline = 'Centre Announces Emergency Relief Package for Assam';
      summary = 'The government has approved emergency funding and deployed NDRF forces following severe flooding across Assam.';
      category = 'National';
      sentiment = 'Positive';
      importance = 'Breaking';
    } else if (optionId === 'opt_b') {
      headline = 'Centre and Assam State Launch Joint Flood Relief Taskforce';
      summary = 'State and central authorities have established a joint operational budget to coordinate emergency flood relief.';
      category = 'Politics';
      sentiment = 'Neutral';
      importance = 'Important';
    } else {
      headline = 'Opposition Questions Government\'s Delayed Response to Assam Floods';
      summary = 'Opposition leaders have criticized the government\'s decision to delay major relief spending pending assessment.';
      category = 'Politics';
      sentiment = 'Negative';
      importance = 'Important';
    }
  } else if (decision.id === 'economic_stimulus') {
    if (optionId === 'opt_large_stimulus') {
      headline = 'Government Announces Major Economic Stimulus Package';
      summary = 'Public spending in manufacturing and infrastructure gets a massive capital injection to accelerate national growth.';
      category = 'Economy';
      sentiment = 'Positive';
      importance = 'Breaking';
    } else if (optionId === 'opt_mod_stimulus') {
      headline = 'PMO Unveils Targeted Credit Scheme for MSMEs';
      summary = 'Targeted tax rebates and credit guarantees aim to steady industrial output without overextending treasury reserves.';
      category = 'Economy';
      sentiment = 'Positive';
      importance = 'Important';
    } else {
      headline = 'Government Maintains Budget Discipline, Declines Stimulus';
      summary = 'Finance officials confirm existing budget caps will remain, relying on private market forces for economic recovery.';
      category = 'Economy';
      sentiment = 'Neutral';
      importance = 'Normal';
    }
  } else if (decision.id === 'national_education_reform') {
    headline = `PM Announces ${selectedOption.title}`;
    summary = 'Educational institutions nationwide will see structural improvements as the new reform bill comes into effect.';
    category = 'Education';
    sentiment = 'Positive';
    importance = 'Important';
  } else if (decision.id === 'healthcare_expansion') {
    headline = `National Healthcare Expansion: ${selectedOption.title} Approved`;
    summary = 'Public healthcare funding increases to expand hospital capacity and diagnostic access across rural districts.';
    category = 'Healthcare';
    sentiment = 'Positive';
    importance = 'Important';
  } else if (decision.id === 'agricultural_support_package') {
    headline = `Government Delivers Agricultural Aid: ${selectedOption.title}`;
    summary = 'Financial support measures reach farming communities to protect rural incomes and stabilize food supplies.';
    category = 'Agriculture';
    sentiment = 'Positive';
    importance = 'Important';
  } else if (decision.id === 'national_infrastructure_push') {
    headline = `Mega Infrastructure Push: ${selectedOption.title} Launched`;
    summary = 'Capital investments in transport and logistics corridors aim to boost industrial competitiveness.';
    category = 'Infrastructure';
    sentiment = 'Positive';
    importance = 'Breaking';
  }

  return {
    id: `news_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    headline,
    summary,
    category,
    timestamp,
    importance,
    sentiment,
    relatedDecisionId: decision.id,
  };
}

/**
 * Generates a handcrafted NewsItem after a Random Event resolution
 */
export function generateNewsFromEvent(
  event: GameEvent,
  selectedOption: DecisionOption,
  result: DecisionResult,
  time: GameTime
): NewsItem {
  const timestamp = formatNewsTimestamp(time);
  const eventId = event.id;
  const optionId = selectedOption.id;

  let headline = `Government Responds to ${event.title}`;
  let summary = `Prime Minister announces executive action "${selectedOption.title}" to resolve national event.`;
  let category: NewsCategory = 'National';
  let sentiment: NewsSentiment = 'Neutral';
  let importance: NewsImportance = 'Important';

  if (eventId === 'oil_price_shock_event') {
    category = 'Economy';
    if (optionId === 'opt_oil_subsidy') {
      headline = 'Government Absorbs Global Crude Surge with Fuel Subsidies';
      summary = 'Central treasury allocates funds to shield retail petrol prices from soaring international oil markets.';
      sentiment = 'Positive';
      importance = 'Breaking';
    } else if (optionId === 'opt_oil_market_pass') {
      headline = 'Fuel Prices Reach Record Highs Following Global Crude Surge';
      summary = 'Retail petrol prices rise nationwide as central government allows market pricing to reflect global shock.';
      sentiment = 'Negative';
      importance = 'Breaking';
    } else {
      headline = 'Government Cuts Fuel Taxes Amid Global Oil Shock';
      summary = 'Excise duty reductions offer partial relief to consumers and transport operators across India.';
      sentiment = 'Positive';
      importance = 'Important';
    }
  } else if (eventId === 'farmers_protest_event') {
    category = 'Agriculture';
    if (optionId === 'opt_protest_msp_increase') {
      headline = 'PM Announces MSP Rate Hike; Farmers End Highway Blockade';
      summary = 'Mass agricultural demonstrations conclude after government approves higher support prices for crops.';
      sentiment = 'Positive';
      importance = 'Breaking';
    } else if (optionId === 'opt_protest_panel') {
      headline = 'Government Invites Farmer Unions for PMO Mediation Talks';
      summary = 'High-level committee established to review agricultural demands while peaceful negotiations begin.';
      sentiment = 'Neutral';
      importance = 'Important';
    } else {
      headline = 'Police Clear Highway Blockades Following PMO Order';
      summary = 'Security forces enforce public order to reopen vital trade corridors as agricultural protests spark debate.';
      sentiment = 'Negative';
      importance = 'Important';
    }
  } else if (eventId === 'stock_market_crash_event') {
    category = 'Economy';
    headline = 'Government Measures Stabilize Stock Indices After Market Jitters';
    summary = 'Central financial intervention brings confidence back to domestic capital markets.';
    sentiment = selectedOption.effects.popularity && selectedOption.effects.popularity > 0 ? 'Positive' : 'Neutral';
    importance = 'Breaking';
  } else if (eventId === 'disease_outbreak_event') {
    category = 'Healthcare';
    headline = 'Health Ministry Deploys Emergency Measures Against Regional Outbreak';
    summary = 'Medical teams and containment protocols take effect across affected coastal districts.';
    sentiment = 'Positive';
    importance = 'Breaking';
  } else if (eventId === 'isro_mission_success_event') {
    category = 'National';
    headline = 'ISRO Space Mission Triumph Celebrated Nationwide';
    summary = 'India marks another major technological milestone as satellite enters lunar orbit successfully.';
    sentiment = 'Positive';
    importance = 'Breaking';
  } else if (eventId === 'foreign_investment_event') {
    category = 'Economy';
    headline = 'Major Multi-Billion Tech Manufacturing Deal Finalized';
    summary = 'Global semiconductor conglomerate signs agreement to construct semiconductor mega-fab in India.';
    sentiment = 'Positive';
    importance = 'Breaking';
  } else if (eventId === 'cricket_victory_event') {
    category = 'Public';
    headline = 'India Celebrates Historic World Championship Victory';
    summary = 'Millions celebrate as national cricket team lifts the international championship trophy.';
    sentiment = 'Positive';
    importance = 'Important';
  } else if (eventId === 'severe_heatwave_event') {
    category = 'National';
    headline = 'Government Deploys Emergency Relief Across Heatwave Zones';
    summary = 'Central water supply tankers and cooling centers assist millions affected by extreme summer weather.';
    sentiment = 'Neutral';
    importance = 'Important';
  } else if (eventId === 'infrastructure_failure_event') {
    category = 'Infrastructure';
    headline = 'Emergency Transport Plan Mobilized Following Highway Bridge Failure';
    summary = 'Engineers and logistics teams initiate rapid repair and rerouting plans on freight corridors.';
    sentiment = 'Neutral';
    importance = 'Important';
  }

  return {
    id: `news_evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    headline,
    summary,
    category,
    timestamp,
    importance,
    sentiment,
    relatedEventId: event.id,
  };
}

/**
 * Generates news for cabinet appointment / resignation
 */
export function generateNewsFromCabinet(
  ministerName: string,
  ministry: string,
  action: 'appointed' | 'resigned',
  time: GameTime
): NewsItem {
  const timestamp = formatNewsTimestamp(time);

  if (action === 'resigned') {
    return {
      id: `news_cab_${Date.now()}`,
      headline: `${ministerName} Resigns as ${ministry} Minister`,
      summary: `Relations with the Prime Minister have deteriorated, leading to an immediate vacancy in the ${ministry} portfolio.`,
      category: 'Politics',
      timestamp,
      importance: 'Breaking',
      sentiment: 'Negative',
    };
  }

  return {
    id: `news_cab_${Date.now()}`,
    headline: `New ${ministry} Minister Inducted into Cabinet`,
    summary: `${ministerName} has been officially appointed by the Prime Minister to head the ${ministry} ministry.`,
    category: 'Politics',
    timestamp,
    importance: 'Important',
    sentiment: 'Positive',
  };
}

/**
 * Adds a news item to history, enforcing maximum 50 stored news items (newest first).
 */
export function addNewsToHistory(
  currentHistory: NewsItem[],
  newItem: NewsItem,
  maxLimit = 50
): NewsItem[] {
  const updatedList = [newItem, ...currentHistory];
  return updatedList.slice(0, maxLimit);
}
