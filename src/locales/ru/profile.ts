export const profileContent = {
  profile: {
    header: {
      title: 'Профиль',
      tabs: {
        overview: 'Обзор',
        settings: 'Настройки',
      },
    },
    overview: {
      labels: {
        fullName: 'Полное имя',
        company: 'Компания',
        phone: 'Телефон',
        site: 'Сайт',
        country: 'Страна',
        language: 'Язык',
        timezone: 'Часовой пояс',
        email: 'Email',
      },
      placeholders: {
        notSpecified: '-',
      },
      headers: {
        details: 'Детали профиля',
      },
    },
    form: {
      labels: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        company: 'Компания',
        site: 'Сайт',
        phone: 'Телефон',
        country: 'Страна',
        language: 'Язык',
        timezone: 'Часовой пояс',
      },
      headers: {
        settings: 'Редактировать профиль',
      },
      buttons: {
        save: 'Сохранить',
        cancel: 'Отмена',
        back: 'Назад',
      },
    },
    notifications: {
      success: 'Профиль успешно обновлен!',
      error: 'Не удалось сохранить профиль. Пожалуйста, попробуйте снова.',
    },
    errors: {
      fetchFailed: 'Не удалось загрузить данные профиля',
      saveFailed: '[Профиль] ошибка при сохранении данных',
      invalidPhone: 'Неверный формат номера телефона',
      invalidUrl: 'Пожалуйста, введите корректный URL',
      required: (label: string): string => `Поле "${label}" обязательно для заполнения`,
    },
  },
};
