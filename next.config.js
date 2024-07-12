/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['warn'],
          }
        : false,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'foysawsbucket.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
