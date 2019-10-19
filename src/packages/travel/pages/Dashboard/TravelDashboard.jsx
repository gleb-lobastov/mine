import React from 'react';
import Markdown from 'modules/components/Markdown';
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
    <a href="https://my.flightradar24.com/lobastov">
      <img
        src="https://banners-my.flightradar24.com/lobastov.png"
        alt="My Flightdiary.net profile"
      />
    </a>
  </div>
));
