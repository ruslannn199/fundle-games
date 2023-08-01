'use strict';

module.exports = {
  types: [
    { value: 'feat', name: 'feat:      Добавление нового функционала' },
    { value: 'fix', name: 'fix:       Исправление ошибок' },
    {
      value: 'init',
      name: 'init:      Используется для начала проекта'
    },
    {
      value: 'build',
      name: 'build:     Сборка проекта или изменения внешних зависимостей'
    },
    {
      value: 'refactor',
      name:
      'refactor:  Правки кода без исправления ошибок или добавления новых функций'
    },
    { value: 'docs', name: 'docs:      Обновление документации' },
    { value: 'ci', name: 'ci:        Настройка CI и работа со скриптами' },
    {
      value: 'perf',
      name: 'perf:      Изменения направленные на улучшение производительности'
    },
    { value: 'revert', name: 'revert:    Откат на предыдущие коммиты' },
    {
      value: 'style',
      name:
        'style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)'
    },
    { value: 'test', name: 'test:      Добавление тестов' }
  ],

  scopes: [
    { name: 'assets' },
    { name: 'components' },
    { name: 'tutorial' },
    { name: 'catalog' },
    { name: 'product' }
  ],
  
  scopeOverrides: {
    test: [
      { name: 'unitTest' },
      { name: 'integrationTest' },
      { name: 'e2eTest' },
    ]
  },

  messages: {
    type: 'Какие изменения вы вносите?',
    scope: '\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):',
    // Спросим если allowCustomScopes в true
    customScope: 'Укажите свою ОБЛАСТЬ:',
    subject: 'Напишите КОРОТКОЕ описание в ПОВЕЛИТЕЛЬНОМ наклонении:\n',
    body: `Напишите ПОДРОБНОЕ описание (опционально). Используйте '|' для новой строки:\n`,
    breaking: 'Список BREAKING CHANGES (опционально):\n',
    footer:
      'Место для мета данных (тикетов, ссылок и остального). Например: SECRETMRKT-700, SECRETMRKT-800:\n',
    confirmCommit: 'Вас устраивает получившийся коммит?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: false,
  footerPrefix: 'МЕТА ДАННЫЕ:',
  subjectLimit: 72
};