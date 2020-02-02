import React from 'react';
import Markdown from 'modules/components/Markdown';
import Button from '@material-ui/core/Button';
import { usePaths } from 'modules/packages';
import { useTripsStats } from 'travel/dataSource';

export default function TravelDashboard() {
  const {
    travel: { visits: visitsPaths },
  } = usePaths();

  const { countriesIds, locationsIds, isLoading } = useTripsStats({
    userAlias: 'my',
  });
  const countriesCounter = isLoading ? '...' : countriesIds.length;
  const locationsCounter = isLoading ? '...' : locationsIds.length;

  return (
    <div>
      <Markdown
        source={`
Статистика по моим путешествиям.

В идеале здесь будет красивая инфографика, рассказы и фотки про 250 стран и
территорий. В реальности же я побывал только в
[${countriesCounter} странах](${visitsPaths.toUrl()}) и 
[${locationsCounter} городах](${visitsPaths.toUrl()}),
а раз так, то и на инфографику пока забил.
  `}
      />
      <div>
        <Button
          component="a"
          target="_blank"
          rel="nofollow noreferrer noopener"
          href="https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5"
        >
          Про путешествия в ЖЖ
        </Button>
      </div>
      <a
        href="https://my.flightradar24.com/lobastov"
        target="_blank"
        rel="nofollow noreferrer noopener"
      >
        <img
          src="https://banners-my.flightradar24.com/lobastov.png"
          alt="My Flightdiary.net profile"
        />
      </a>
    </div>
  );
}
