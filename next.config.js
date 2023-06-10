const envsConfig = require('./envs')


const envs = envsConfig[process.env.MODE]
if (envs) {
  console.log(`process.env.MODE: ${process.env.MODE}`);
  Object.keys(envs).forEach((key) => {
    process.env[key] = envs[key]
  })
}
console.log(process.env.NEXT_PUBLIC_MARKETPLACE_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
    
    ],
  },
};

module.exports = nextConfig;
