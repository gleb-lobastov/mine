export default function definePackages() {
  const match = window.location.pathname.match(
    /^\/mine\/_([a-zA-Z]*)(?:$|\/.*)/,
  );
  const mode = match && match[1];
  switch (mode) {
    case 'code':
      return { code: { mountPath: '/_code', alias: 'code' } };
    case 'travel':
      return {
        travel: { mountPath: '/_travel' },
        auth: { mountPath: '/hello' },
      };
    default:
      return {
        main: { mountPath: '' },
        travel: { mountPath: '/travel' },
        literature: { mountPath: '/liter' },
        code: { mountPath: '/code' },
        auth: { mountPath: '/hello' },
      };
  }
}
