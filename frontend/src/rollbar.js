/* eslint-disable import/no-extraneous-dependencies */
import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: 'b691f588a8d049359517ab005afc6f10',
  environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
