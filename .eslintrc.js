module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true
    },
    "rules": {
      "no-underscore-dangle": "off",
      "react/no-array-index-key": "off",
      "jsx-a11y/label-has-for": "off",
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "jsx-a11y/anchor-is-valid": [ "error", {
        "specialLink": [ "hrefLeft", "hrefRight" ],
        "aspects": [ "noHref", "invalidHref", "preferButton" ]
      }]
    },
};