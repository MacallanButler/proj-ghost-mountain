/**
 * Google Analytics 4 (GA4) Event Tracking Utility
 * Standardized to snake_case naming conventions per analytics brief.
 */

declare global {
    interface Window {
        gtag?: (command: string, ...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export interface AnalyticsEventParamsMap {
    scroll_depth: { depth_percent: 25 | 50 | 75 | 100 };
    section_view: { section_name: string };
    nav_click: { destination_section: string };
    external_link_click: { destination_url: string };
    culture_region_expand: { region_name: string };
    country_card_click: { country_name: string };
    range_map_marker_click: { country_name: string };
    game_start: Record<string, never>;
    game_scene_complete: { scene_number: number; difficulty: string; time_seconds: number };
    game_scene_skip: { scene_number: number; difficulty: string };
    game_completed: { total_time_seconds: number; difficulty: string };
    timeline_milestone_click: { milestone_year: string; milestone_label: string };
    quiz_start: Record<string, never>;
    quiz_question_answered: { question_number: number; is_correct: boolean };
    quiz_completed: { score: number; total_questions: number };
    how_to_help_link_click: { organization_name: string; link_type: string };
    fact_sheet_download: Record<string, never>;
    donate_click: { source_location: string; amount?: number; program?: string; currency?: string; [key: string]: unknown };
}

export type AnalyticsEventName = keyof AnalyticsEventParamsMap;

export function trackEvent<E extends AnalyticsEventName>(
    eventName: E,
    params?: AnalyticsEventParamsMap[E]
): void;
export function trackEvent(eventName: string, params?: Record<string, unknown>): void;
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
        console.log(`[Analytics Event Fired] ${eventName}`, params);
    } else {
        console.log(`[Analytics Mock] Event: ${eventName}`, params);
    }
}

// Dedicated typed helper functions

export const trackScrollDepth = (depth_percent: 25 | 50 | 75 | 100) => {
    trackEvent("scroll_depth", { depth_percent });
};

export const trackSectionView = (section_name: string) => {
    trackEvent("section_view", { section_name });
};

export const trackNavClick = (destination_section: string) => {
    trackEvent("nav_click", { destination_section });
};

export const trackExternalLinkClick = (destination_url: string) => {
    trackEvent("external_link_click", { destination_url });
};

export const trackCultureRegionExpand = (region_name: string) => {
    trackEvent("culture_region_expand", { region_name });
};

export const trackCountryCardClick = (country_name: string) => {
    trackEvent("country_card_click", { country_name });
};

export const trackRangeMapMarkerClick = (country_name: string) => {
    trackEvent("range_map_marker_click", { country_name });
};

export const trackGameStart = () => {
    trackEvent("game_start", {});
};

export const trackGameSceneComplete = (scene_number: number, difficulty: string, time_seconds: number) => {
    trackEvent("game_scene_complete", { scene_number, difficulty, time_seconds });
};

export const trackGameSceneSkip = (scene_number: number, difficulty: string) => {
    trackEvent("game_scene_skip", { scene_number, difficulty });
};

export const trackGameCompleted = (total_time_seconds: number, difficulty: string) => {
    trackEvent("game_completed", { total_time_seconds, difficulty });
};

export const trackTimelineMilestoneClick = (milestone_year: string, milestone_label: string) => {
    trackEvent("timeline_milestone_click", { milestone_year, milestone_label });
};

export const trackQuizStart = () => {
    trackEvent("quiz_start", {});
};

export const trackQuizQuestionAnswered = (question_number: number, is_correct: boolean) => {
    trackEvent("quiz_question_answered", { question_number, is_correct });
};

export const trackQuizCompleted = (score: number, total_questions: number) => {
    trackEvent("quiz_completed", { score, total_questions });
};

export const trackHowToHelpLinkClick = (organization_name: string, link_type: string) => {
    trackEvent("how_to_help_link_click", { organization_name, link_type });
};

export const trackFactSheetDownload = () => {
    trackEvent("fact_sheet_download", {});
};

export const trackDonateClick = (source_location: string, extra?: Record<string, unknown>) => {
    trackEvent("donate_click", { source_location, ...extra });
};
