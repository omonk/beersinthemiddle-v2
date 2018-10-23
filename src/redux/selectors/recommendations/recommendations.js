import { createSelector } from 'reselect';

export const recommendationsSelector = state => state.recommendations;

export const hasRecommendationsSelector = createSelector(
  recommendationsSelector,
  recommendations => recommendations.length
);
