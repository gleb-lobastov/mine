import React, {
  useContext,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { withRouter } from 'react-router';
import qs from 'query-string';

const QueryFilterContext = React.createContext({});

function FilterContextProvider({ children, history, location }) {
  const { pathname, search } = location;

  const searchRef = useRef(search);
  const pathnameRef = useRef(pathname);
  useEffect(
    () => {
      searchRef.current = search;
      pathnameRef.current = pathname;
    },
    [pathname, search],
  );

  const setQueryFilter = useCallback(updates => {
    history.push({
      pathname: pathnameRef.current,
      search: `?${qs.stringify({
        ...qs.parse(searchRef.current),
        ...updates,
      })}`,
    });
  }, []);

  const queryFilterContext = useMemo(
    () => ({ setQueryFilter, queryFilter: qs.parse(search) }),
    [search],
  );

  return (
    <QueryFilterContext.Provider value={queryFilterContext}>
      {children}
    </QueryFilterContext.Provider>
  );
}

export default withRouter(FilterContextProvider);

export const useQueryFilter = () => useContext(QueryFilterContext);

export const withFilterContext = Component => props => (
  <QueryFilterContext.Consumer>
    {filterContext => <Component {...props} {...filterContext} />}
  </QueryFilterContext.Consumer>
);
