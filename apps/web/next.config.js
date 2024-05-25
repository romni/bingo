/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  basePath: '/bingo',
  transpilePackages: ["@repo/ui"],
  compiler: {
    styledComponents: true,
  },
};
