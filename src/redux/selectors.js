import { createSelector } from "@reduxjs/toolkit";

// Jobs selectors
export const selectJobs = (state) => state.jobs.jobs || [];
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
export const selectSearchQuery = (state) => state.jobs.searchQuery;
export const selectCategory = (state) => state.jobs.selectedCategory;

// Favorites selectors
export const selectFavorites = (state) => state.favorites.favorites || [];
export const selectFavLoading = (state) => state.favorites.loading;

// Memoized filtered jobs
export const selectFilteredJobs = createSelector(
  [selectJobs, selectSearchQuery, selectCategory],
  (jobs, searchQuery, selectedCategory) =>
    jobs.filter((job) => {
      const matchesCategory =
        selectedCategory === "All Categories" || job.category === selectedCategory;
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
);
