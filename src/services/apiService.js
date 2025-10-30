import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API || 'https://nomad-atlas-server-delta.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// API service functions
export const dashboardAPI = {
    // Get all data collections with proper error handling
    getDestinations: () => api.get('/destinations'),
    getBookings: () => api.get('/bookings'),
    getBlogs: () => api.get('/blogs'),
    getJobs: () => api.get('/jobs'),
    getResources: () => api.get('/resources'),
    getPayments: () => api.get('/payments'),
    getReviews: () => api.get('/reviews'),

    // Get aggregated stats with better error handling
    getAggregatedStats: async () => {
        try {
            console.log('Fetching aggregated stats from backend...');

            const [
                destinationsResponse,
                bookingsResponse,
                blogsResponse,
                jobsResponse,
                paymentsResponse,
                reviewsResponse
            ] = await Promise.all([
                api.get('/destinations').catch(err => {
                    console.error('Error fetching destinations:', err);
                    return { data: [] };
                }),
                api.get('/bookings').catch(err => {
                    console.error('Error fetching bookings:', err);
                    return { data: [] };
                }),
                api.get('/blogs').catch(err => {
                    console.error('Error fetching blogs:', err);
                    return { data: [] };
                }),
                api.get('/jobs').catch(err => {
                    console.error('Error fetching jobs:', err);
                    return { data: [] };
                }),
                api.get('/payments').catch(err => {
                    console.error('Error fetching payments:', err);
                    return { data: [] };
                }),
                api.get('/reviews').catch(err => {
                    console.error('Error fetching reviews:', err);
                    return { data: [] };
                })
            ]);

            const result = {
                destinations: destinationsResponse.data || [],
                bookings: bookingsResponse.data || [],
                blogs: blogsResponse.data || [],
                jobs: jobsResponse.data || [],
                payments: paymentsResponse.data || [],
                reviews: reviewsResponse.data || []
            };

            console.log('Aggregated stats result:', {
                destinations: result.destinations.length,
                bookings: result.bookings.length,
                blogs: result.blogs.length,
                jobs: result.jobs.length,
                payments: result.payments.length,
                reviews: result.reviews.length
            });

            return result;
        } catch (error) {
            console.error('Error in getAggregatedStats:', error);
            return {
                destinations: [],
                bookings: [],
                blogs: [],
                jobs: [],
                payments: [],
                reviews: []
            };
        }
    }
};