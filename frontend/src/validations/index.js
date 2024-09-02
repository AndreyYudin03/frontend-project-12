import * as Yup from 'yup';

const usernameValidation = (t) => Yup.string()
  .min(3, t('signUpPage.validation.username.limit'))
  .max(20, t('signUpPage.validation.username.limit'))
  .required(t('signUpPage.validation.required'));

const passwordValidation = (t) => Yup.string()
  .min(6, t('signUpPage.validation.password.limit'))
  .required(t('signUpPage.validation.required'));

const isUniqueChannelName = (value, channels, initialName = '') => value === initialName || !channels.some((channel) => channel.name === value);

export const signUpValidationSchema = (t) => Yup.object().shape({
  username: usernameValidation(t),
  password: passwordValidation(t),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      t('signUpPage.validation.password.notMatch'),
    )
    .required(t('signUpPage.validation.required')),
});

export const addChannelValidationSchema = (t, channels) => Yup.object().shape({
  channelName: Yup.string()
    .min(3, t('chatPage.modal.addChannel.validation.limit'))
    .max(20, t('chatPage.modal.addChannel.validation.limit'))
    .required(t('chatPage.modal.required'))
    .test('unique-name', t('chatPage.modal.uniqueName'), (value) => isUniqueChannelName(value, channels)),
});

export const renameChannelValidationSchema = (t, channels, initialName) => Yup.object().shape({
  newChannelName: Yup.string()
    .min(3, t('chatPage.modal.renameChannel.validation.limit'))
    .max(20, t('chatPage.modal.renameChannel.validation.limit'))
    .required(t('chatPage.modal.required'))
    .test('unique-name', t('chatPage.modal.uniqueName'), (value) => isUniqueChannelName(value, channels, initialName)),
});
