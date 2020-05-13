function degToRad(degree) {
  const DEGREES_IN_CIRCLE = 360;
  return (degree / DEGREES_IN_CIRCLE) * 2 * Math.PI;
}

function hexToRgba(hex, alpha) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgba = match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        a: alpha,
      }
    : { r: 0, g: 0, b: 0, a: 0 };
  return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
}

const backgroundColor = '#FFF';
const STRIPLES_ANGLE_DEG = 45;
const STRIPLES_WIDTH_PX = 20;
const STRIPLES_SHIFT_PX =
  4 * STRIPLES_WIDTH_PX * Math.cos(degToRad(STRIPLES_ANGLE_DEG));

function makeStriplesBackground(color, opacity = 0.4) {
  const actualColor = hexToRgba(color, opacity);
  return {
    background: `repeating-linear-gradient(
      ${STRIPLES_ANGLE_DEG}deg,
      ${backgroundColor},
      ${backgroundColor} ${STRIPLES_WIDTH_PX}px,
      ${actualColor} ${STRIPLES_WIDTH_PX}px,
      ${actualColor} ${2 * STRIPLES_WIDTH_PX}px
    )`,
    backgroundSize: `calc(100% + ${STRIPLES_SHIFT_PX}px)`,
  };
}

export default function resolveDropzoneStyles(theme) {
  return {
    dropzoneContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      height: '100%',
      minHeight: '144px',
      padding: '0 12px',
      margin: '12px 0',
      cursor: 'pointer',
    },
    dropzoneStandby: {
      '& $dropzoneContainer': {
        border: `2px dashed ${theme.palette.primary.dark}`,
        borderRadius: '4px',
        ...makeStriplesBackground(theme.palette.primary.light, 0.2),
      },
      '& $dropzoneUpload': {
        borderColor: theme.palette.disabled.dark,
        ...makeStriplesBackground(theme.palette.disabled.main, 0.2),
        animation: '$slide 2s infinite linear forwards',
      },
    },
    dropzoneActive: {
      border: `2px dashed ${theme.palette.secondary.dark}`,
      animation: '$slide 2s infinite linear forwards',
      ...makeStriplesBackground(theme.palette.secondary.light),
      '&$dropzoneAccept': {
        borderColor: theme.palette.secondary.dark,
        ...makeStriplesBackground(theme.palette.secondary.main),
        animation: '$slide 2s infinite linear forwards',
      },
      '&$dropzoneReject': {
        borderColor: theme.palette.error.dark,
        ...makeStriplesBackground(theme.palette.error.main),
        animation: '$slide 2s infinite linear forwards',
      },
    },
    dropzoneAccept: {},
    dropzoneReject: {},
    dropzoneUpload: {},
    '@keyframes slide': {
      '0%': {
        backgroundPositionX: `-${STRIPLES_SHIFT_PX}px`,
      },
      '100%': {
        backgroundPositionX: 0,
      },
    },
  };
}
