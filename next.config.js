/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental_disabled: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

module.exports = nextConfig;
