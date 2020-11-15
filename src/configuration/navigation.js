import IconCreate from '@material-ui/icons/Create';
import IconCode from '@material-ui/icons/Code';
import IconHome from '@material-ui/icons/Home';
import IconPublic from '@material-ui/icons/Public';

export default (packages = {}) => {
  const { main, travel, literature, code } = packages;
  const navigationConfig = { menu: [] };

  if (main) {
    navigationConfig.menu.push({
      path: main.routes.entry.path,
      caption: 'Главная',
      icon: IconHome,
    });
  }

  if (travel) {
    navigationConfig.menu.push({
      path: travel.routes.entry.path,
      caption: 'Путешествия',
      icon: IconPublic,
      menu: [
        {
          path: travel.routes.entry.path,
          caption: 'О разделе',
        },
        {
          path: travel.routes.visits.path,
          caption: 'Места',
          params: { section: 'locations' },
        },
        {
          path: travel.routes.visits.path,
          caption: 'Поездки',
          params: { section: 'trips' },
        },
      ],
    });
  }

  if (literature) {
    navigationConfig.menu.push({
      path: literature.routes.entry.path,
      caption: 'Контент',
      icon: IconCreate,
      menu: [
        {
          path: literature.routes.entry.path,
          caption: 'О разделе',
        },
        {
          path: literature.routes.articles.path,
          caption: 'Статьи',
        },
        {
          path: literature.routes.books.path,
          caption: 'Рецензии',
        },
        // { path: literature.routes.quotes.path, caption: 'Цитаты' }, -- temporarily hidden
        {
          path: literature.routes.blog.path,
          caption: 'Болг',
        },
      ],
    });
  }

  if (code) {
    navigationConfig.menu.push({
      path: code.routes.entry.path,
      caption: 'Работа',
      icon: IconCode,
      menu: [
        {
          path: code.routes.entry.path,
          caption: 'Обо мне',
          // if section param is just omit, this route has priority over further specified sections
          params: { section: undefined },
        },
        {
          path: code.routes.entry.path,
          caption: 'Где работал',
          params: { section: 'jobs' },
        },
        // {
        //   path: code.routes.entry.path,
        //   caption: 'Что сделал',
        //   params: { section: 'works' },
        // },
        // {
        //   path: code.routes.entry.path,
        //   caption: 'Статьи',
        //   params: { section: 'articles' },
        // },
        // {
        //   path: code.routes.entry.path,
        //   caption: 'Выспупления',
        //   params: { section: 'presentations' },
        // },
        {
          path: code.routes.entry.path,
          caption: 'Навыки',
          params: { section: 'skills' },
        },
        {
          path: code.routes.entry.path,
          caption: 'Контакты',
          params: { section: 'contacts' },
        },
      ],
    });
  }

  return navigationConfig;
};
