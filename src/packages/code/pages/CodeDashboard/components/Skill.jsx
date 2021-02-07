import React from 'react';
import { Flipped, spring } from 'react-flip-toolkit';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import SkillLogo from './SkillLogo';

const useStyles = makeStyles({
  popper: {
    // set lower zIndex than AppBar's https://material-ui.com/ru/customization/z-index/
    // otherwise, on mobile devices tooltip will be showed over AppBar, while chip is hidden under it
    zIndex: 1000,
  },
});

// Immediately show tooltip on touch (on mobile devices)
// Otherwise, it is difficult to guess that you need to wait a long time and it is inconvenient
const TOOLTIP_ENTER_TOUCH_DELAY = 0;

// Prevent automatic hide of tooltip after some delay
// Tooltip can contain a detailed explanation of the skill, so user will need time to read it
const TOOLTIP_LEAVE_TOUCH_DELAY = 0;

export default function Skill({
  title,
  flipId,
  icon: { type: iconType, ref } = {},
  description,
  isPrimary,
  isOutdated,
  className,
}) {
  const classes = useStyles();

  const chipNode = (
    <Flipped
      flipId={flipId}
      onAppear={onElementAppear}
      onExit={onElementDisappear}
    >
      {/*  wrap in div to preserve original opacity on chip */}
      <div>
        <Chip
          className={className}
          size="small"
          label={title}
          icon={
            iconType === 'sprite' ? (
              <SkillLogo title={title} spriteRef={ref} />
            ) : null
          }
          disabled={isOutdated}
          color={isPrimary ? 'primary' : undefined}
          onDelete={description ? () => {} : undefined}
          deleteIcon={
            description ? (
              <InfoIcon style={{ pointerEvents: 'none' }} />
            ) : (
              undefined
            )
          }
        />
      </div>
    </Flipped>
  );

  const actualDescription = isOutdated
    ? `Неактуальный навык${description ? `. ${description}` : ''}`
    : description;

  if (!actualDescription) {
    return chipNode;
  }

  return (
    <Tooltip
      classes={{ popper: classes.popper }}
      title={actualDescription}
      arrow={true}
      enterTouchDelay={TOOLTIP_ENTER_TOUCH_DELAY}
      leaveTouchDelay={TOOLTIP_LEAVE_TOUCH_DELAY}
    >
      {/*  wrap in div to always catch a pointer event, even for disabled chip */}
      <div>{chipNode}</div>
    </Tooltip>
  );
}

function onElementAppear(el, index) {
  return spring({
    values: {
      translateX: [window.innerWidth * (index % 2 ? 1 : -1), 0],
      opacity: [0, 1],
    },
    onUpdate: createUpdateHandler(el),
  });
}

function onElementDisappear(el, index, removeElement) {
  spring({
    values: {
      translateX: [0, window.innerWidth * (index % 2 ? 1 : -1)],
      opacity: [1, 0],
    },
    onUpdate: createUpdateHandler(el),
    onComplete: removeElement,
  });

  return () => {
    // eslint-disable-next-line no-param-reassign
    el.style.opacity = '';
    removeElement();
  };
}

function createUpdateHandler(el) {
  return function handleUpdate({ translateX, opacity }) {
    /* eslint-disable no-param-reassign */
    el.style.opacity = opacity;
    el.style.transform = `translateX(${translateX}px)`;
    /* eslint-enable no-param-reassign */
  };
}
