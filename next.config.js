// const webpack = require("webpack");
const withSass = require("@zeit/next-sass");

module.exports = withSass({
  // ---- DISABLE NEXT's FIle System Routing ---
  useFileSystemPublicRoutes: true,
  assetPrefix: "",
  //---- END ---

  // --- SASS START ---
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: ["sass"]
    }
  },
  // --- SASS END ---

  // --- NEXT CONFIG START ---
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    SECRET_KEY : process.env.SECRET_KEY,
    SIGNATURE: process.env.SIGNATURE,
    SUB_USER_UUID: process.env.SUB_USER_UUID

  }

  // --- NEXT CONFIG END ---
});
