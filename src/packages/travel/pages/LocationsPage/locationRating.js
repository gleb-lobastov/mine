const RATING_RATIO = {
  [RATING.PLACE_TO_LIVE]: 1 / 365,
  [RATING.FEW_PER_YEAR]: 1 / 3,
  [RATING.ONCE_PER_YEAR]: 1,
  [RATING.ONCE_PER_TWO_YEARS]: 2,
  [RATING.ONCE_PER_FIVE_YEARS]: 5,
  [RATING.ONCE_PER_DECADE]: 10,
  [RATING.TWICE_PER_LIVE]: 50,
  [RATING.ONCE_PER_LIVE]: 100,
  [RATING.NEVER]: Infinity,
};

function averageRating(ratings) {
  if (!ratings.length) {
    return Infinity;
  }
  return (
    ratings.length / ratings.map(rating => 1 / rating).reduce((a, b) => a + b)
  );
}
