export const envVars = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    FLUID_TENANT_ID: import.meta.env.VITE_FLUID_TENANT_ID || '',
    FLUID_TOKEN: import.meta.env.VITE_FLUID_TOKEN || '',
    FLUID_ENDPOINT: import.meta.env.VITE_FLUID_ENDPOINT || '',
};