module.exports = {
    roots: [
      "<rootDir>"
    ],
    testMatch: [
      "**/__tests__/**/*.+(ts|ts|js)",
      "**/?(*.)+(spec|test).+(ts|ts|js)"
    ],
    transform: {
      "^.+\\.(ts|ts)$": "ts-jest"
    },
  }