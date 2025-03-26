/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    distDir: 'out',// Saves the static build in the "out" folder
    images: {
        unoptimized: true, // 👈 This disables image optimization
    },
};

export default nextConfig;