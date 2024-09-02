/* eslint-disable import/no-extraneous-dependencies */
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment:
    process.env.REACT_APP_ROLLBAR_ENV === 'production'
      ? 'production'
      : 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
