import React from 'react';
import Markdown from 'modules/components/Markdown';
import Button from '@material-ui/core/Button';
import { withPaths } from 'core/context/AppContext';

export default withPaths(({ namedPaths }) => (
  <div>
    <Markdown
      source={`
Статистика по моим путешествиям.

В идеале здесь будет красивая инфографика, рассказы и фотки про 250 стран и
территорий. В реальности же я побывал только в
[40 странах](${namedPaths.travel.countries.toUrl()}),
а раз так, то и на инфографику забил.
  `}
    />
    <div>
      <Button
        component="a"
        target="_blank"
        rel="nofollow noopener"
        href="https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5"
      >
        Про путешествия в ЖЖ
      </Button>
    </div>
    <a href="https://my.flightradar24.com/lobastov">
      <img
        src="https://banners-my.flightradar24.com/lobastov.png"
        alt="My Flightdiary.net profile"
      />
    </a>
  </div>
));
