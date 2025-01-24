module.exports = function (config) {
  config.set({
    // ... autres configurations ...
    customLaunchers: {
      ChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'], // Assurez-vous que cette ligne est présente
      },
    },
    browsers: ['ChromeHeadless'], // Utilisez le launcher avec l'option
    // ... autres configurations ...
  });
};
