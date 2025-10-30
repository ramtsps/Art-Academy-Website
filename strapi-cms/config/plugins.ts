module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 1000000, // 1MB
      },
      // COMPLETELY disable image optimization
      breakpoints: false,
      responsiveDimensions: false,
    },
  },
});