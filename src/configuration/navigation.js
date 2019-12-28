import IconCreate from '@material-ui/icons/Create';
import IconCode from '@material-ui/icons/Code';
import IconHome from '@material-ui/icons/Home';
import IconPublic from '@material-ui/icons/Public';
import Path from 'modules/utilities/routing/Path';

const createPath = ({ path, defaultRouteParams, ...meta }) =>
  Path.create(path, meta, defaultRouteParams);

export default packages => {
  const [main, travel, literature, code] = packages;
  const navigationConfig = { menu: [] };

  if (main) {
    navigationConfig.menu.push({
      route: createPath(main.routing.routesDict.entry),
      caption: 'Главная',
      icon: IconHome,
    });
  }

  if (travel) {
    navigationConfig.menu.push({
      route: createPath(travel.routing.routesDict.entry),
      caption: 'Путешествия',
      icon: IconPublic,
      menu: [
        { route: createPath(travel.routing.routesDict.entry), caption: 'Об' },
        {
          route: createPath(travel.routing.routesDict.visits),
          caption: 'По посещенным местам',
        },
        {
          route: createPath(travel.routing.routesDict.years),
          caption: 'По годам',
        },
        {
          route: createPath(travel.routing.routesDict.trips),
          caption: 'По поездкам',
        },
      ],
    });
  }

  if (literature) {
    navigationConfig.menu.push({
      route: createPath(literature.routing.routesDict.entry),
      caption: 'Литература',
      icon: IconCreate,
      menu: [
        {
          route: createPath(literature.routing.routesDict.entry),
          caption: 'Об',
        },
        {
          route: createPath(literature.routing.routesDict.articles),
          caption: 'Статьи',
        },
        {
          route: createPath(literature.routing.routesDict.books),
          caption: 'Рецензии',
        },
        // { route: literature.routing.routesDict.quotes, caption: 'Цитаты' }, -- temporarily hidden
        {
          route: createPath(literature.routing.routesDict.blog),
          caption: 'Болг',
        },
      ],
    });
  }

  if (code) {
    navigationConfig.menu.push({
      route: createPath(code.routing.routesDict.entry),
      caption: 'Код',
      icon: IconCode,
    });
  }

  return navigationConfig;
};
