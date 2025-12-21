const pkg = require("./package");
const path = require("path");

module.exports = {
  apiPath: "stubs/api",
  webpackConfig: {
    output: {
      publicPath: `/static/${pkg.name}/${process.env.VERSION || pkg.version}/`,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
  },
  /* use https://admin.brojs.ru/ to create config, navigations and features */
  navigations: {
    "work21-fr.main": "/work21-fr",
  },
  features: {
    "work21-fr": {
      // add your features here in the format [featureName]: { value: string }
    },
  },
  config: {
    "work21-fr.api": process.env.API_URL || "http://localhost:8000",
    "work21-fr.api.estimator": process.env.ESTIMATOR_API_URL || "http://localhost:8080"
  },
  // Укажите путь к кастомному HTML-шаблону для prom-режима или оставьте undefined
  htmlTemplatePath: undefined,
};
