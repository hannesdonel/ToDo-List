module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true
  },
  extends: [ "airbnb-base", "jquery" ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {
    quotes: [ "error", "double" ],
    "no-use-before-define": "off",
    "func-names": [ "error", "never" ],
    "no-alert": "off",
    "no-console": "off",
    "no-plusplus": [ "error", { allowForLoopAfterthoughts: true } ],
    "lines-around-comment": "off",
    "padded-blocks": "off"
  }
};
