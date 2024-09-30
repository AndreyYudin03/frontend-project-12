const ru = {
  translation: {
    header: {
      title: 'Hexlet Chat',
      logout: 'Выход',
    },
    loginPage: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUp: 'Регистрация',
      error: {
        401: 'Неверные имя пользователя или пароль',
        default: 'Произошла неизвестная ошибка авторизации, попробуйте еще раз',
      },
    },
    signUpPage: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      repeatPassword: 'Подтвердите пароль',
      submit: 'Зарегистрироваться',
      alreadyAccount: 'Уже есть аккаунт?',
      validation: {
        userAlreadyExist: 'Такой пользователь уже существует',
        required: 'Обязательное поле',
        username: {
          limit: 'От 3 до 20 символов',
        },
        password: {
          limit: 'Не менее 6 символов',
          notMatch: 'Пароли должны совпадать',
        },
      },
    },
    chatPage: {
      channels: 'Каналы',
      messages: {
        placeholder: 'Введите сообщение...',
        submit: 'Отправить',
      },
      modal: {
        cancel: 'Отменить',
        required: 'Обязательное поле',
        uniqueName: 'Должно быть уникальным',
        addChannel: {
          title: 'Добавить канал',
          cancel: 'Отменить',
          submit: 'Добавить',
          placeholder: 'Введите название канала',
          label: 'Имя канала',
          validation: {
            limit: 'От 3 до 20 символов',
          },
        },
        renameChannel: {
          title: 'Переименовать канал',
          cancel: 'Отменить',
          submit: 'Отправить',
          placeholder: 'Введите новое название канала',
          label: 'Имя канала',
          validation: {
            limit: 'От 3 до 20 символов',
          },
        },
        removeChannel: {
          title: 'Удалить канал',
          question: 'Уверены?',
          cancel: 'Отменить',
          submit: 'Удалить',
        },
      },
      notifications: {
        addChannel: 'Канал создан',
        addChannelError: 'Ошибка при создании канала',
        removeChannel: 'Канал удалён',
        removeChannelError: 'Ошибка при удалении канала',
        renameChannel: 'Канал переименован',
        renameChannelError: 'Ошибка при переименовании канала',
        loadingChannelsError: 'Произошла ошибка при загрузке каналов',
        loadingMessagesError: 'Произошла ошибка при загрузке сообщений',
        connectionError: 'Ошибка соединения',
      },
      dropdown: {
        delete: 'Удалить',
        rename: 'Переименовать',
      },
    },
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти на',
      text_chatLink: 'главную страницу',
    },
  },
};

export default ru;
