/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

// module.exports = {
//     webpack: (config, { isServer }) => {
//         if (!isServer) {
//             config.node = {
//                 net: 'empty'
//             };
//         }

//         return config;
//     }
// }