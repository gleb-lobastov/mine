import React from 'react';

// https://www.toptal.com/developers/css/sprite-generator/
const SPRITE_URL =
  'https://res.cloudinary.com/dc2eke0gj/image/upload/v1604832878/minetravel/code/tech_sprites_f9a393.png';

const SPRITE_SIZE = 64;
const DEFAULT_LOGO_SIZE = 16;
const GAP = 10;

export default function SkillLogo({ spriteRef: [col, row] = [], size }) {
  if (!col || !row) {
    return null;
  }
  const x = GAP + (col - 1) * 2 * GAP + (col - 1) * SPRITE_SIZE;
  const y = GAP + (row - 1) * 2 * GAP + (row - 1) * SPRITE_SIZE;
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        marginLeft: '4px',
      }}
    >
      <div
        style={{
          background: `url('${SPRITE_URL}') no-repeat -${x}px -${y}px`,
          width: `64px`,
          height: `64px`,
          transformOrigin: '0 0',
          transform: 'scale(0.25)',
          borderRadius: '100%',
        }}
      />
    </div>
  );
}

SkillLogo.defaultProps = {
  size: DEFAULT_LOGO_SIZE,
};
