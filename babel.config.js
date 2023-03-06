module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["@babel/preset-typescript", 'babel-preset-expo', "module:metro-react-native-babel-preset"],
    plugins: [
      [
          "module:react-native-dotenv",
          {
              moduleName: "@env",
              path: ".env",
          },
      ],
  ],
  };
};

