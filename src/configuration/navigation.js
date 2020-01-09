import IconCreate from '@material-ui/icons/Create';
import IconCode from '@material-ui/icons/Code';
import IconHome from '@material-ui/icons/Home';
import IconPublic from '@material-ui/icons/Public';
import Path from 'modules/utilities/routing/Path';

const createPath = ({ path, defaultRouteParams, ...meta }, mountPath = '/') =>
  Path.create(`${mountPath}${path}`, meta, defaultRouteParams);

export default (packages = {}) => {
  console.log('nav', Object.keys(packages));
  const { main, travel, literature, code } = packages;
  const navigationConfig = { menu: [] };

  if (main) {
    navigationConfig.menu.push({
      route: createPath(main.routes.entry, main.mountPath),
      caption: 'Главная',
      icon: IconHome,
    });
  }

  if (travel) {
    navigationConfig.menu.push({
      route: createPath(travel.routes.entry, travel.mountPath),
      caption: 'Путешествия',
      icon: IconPublic,
      menu: [
        {
          route: createPath(travel.routes.entry, travel.mountPath),
          caption: 'Об',
        },
        {
          route: createPath(travel.routes.visits, travel.mountPath),
          caption: 'По посещенным местам',
        },
        {
          route: createPath(travel.routes.years, travel.mountPath),
          caption: 'По годам',
        },
        {
          route: createPath(travel.routes.trips, travel.mountPath),
          caption: 'По поездкам',
        },
      ],
    });
  }

  if (literature) {
    navigationConfig.menu.push({
      route: createPath(literature.routes.entry, literature.mountPath),
      caption: 'Литература',
      icon: IconCreate,
      menu: [
        {
          route: createPath(literature.routes.entry, literature.mountPath),
          caption: 'Об',
        },
        {
          route: createPath(literature.routes.articles, literature.mountPath),
          caption: 'Статьи',
        },
        {
          route: createPath(literature.routes.books, literature.mountPath),
          caption: 'Рецензии',
        },
        // { route: literature.routes.quotes, caption: 'Цитаты' }, -- temporarily hidden
        {
          route: createPath(literature.routes.blog, literature.mountPath),
          caption: 'Болг',
        },
      ],
    });
  }

  if (code) {
    navigationConfig.menu.push({
      route: createPath(code.routes.entry, code.mountPath),
      caption: 'Код',
      icon: IconCode,
    });
  }

  return navigationConfig;
};
