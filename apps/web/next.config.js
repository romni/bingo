/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  basePath: '/goombingo',
  transpilePackages: ["@repo/ui"],
  compiler: {
    styledComponents: true,
  },
};
