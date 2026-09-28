export type TrendStatus = 'RISING' | 'NEW' | 'DECLINING' | 'MIXED' | 'INSUFFICIENT_DATA';
export type EvidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'REVIEW' | 'NO_COVERAGE';

export interface GameRecord {
  rank: number;
  entity: string;
  trend_status: TrendStatus;
  evidence_level: EvidenceLevel;
  evidence_score: number;
  entity_score: number;
  recent_videos: number;
  previous_videos: number;
  recent_channels: number;
  previous_channels: number;
  recent_comments: number;
  previous_comments: number;
  comment_growth_pct: number | null;
  comment_growth_status: string;
  recent_views: number;
  previous_views: number;
  view_growth_pct: number | null;
  breadth_growth_pct: number | null;
  recent_like_rate: number;
  recent_comment_rate: number;
  discussion_intensity_recent: number;
  discussion_growth_pct: number | null;
  growth_signal: string;
  trend_rank_score: number;
  popularity_score: number;
  momentum_score: number | null;
  engagement_score: number;
  opportunity_score: number;
  analysis_label: string;
  view_reach_score?: number;
  breadth_reach_score?: number;
  avg_views_per_video: number;
  avg_comments_per_video: number;
}

export interface KpiSummary {
  totalGames: number;
  risingGames: number;
  newGames: number;
  decliningGames: number;
  totalRecentViews: number;
  totalPreviousViews: number;
  topOpportunityGame: string;
  topOpportunityScore: number;
  maxAvgViewsPerVideoGame?: string;
  maxAvgViewsPerVideo?: number;
}

export interface MethodologyItem {
  topic: string;
  explanation: string;
}

export interface GamingDataset {
  version: string;
  lastUpdated: string;
  final: GameRecord[];
  rankable: GameRecord[];
  kpi: KpiSummary;
  methodology: MethodologyItem[];
}
