import React from 'react';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import SkillLogo from './SkillLogo';

// Immediately show tooltip on touch (on mobile devices)
// Otherwise, it is difficult to guess that you need to wait a long time and it is inconvenient
const TOOLTIP_ENTER_TOUCH_DELAY = 0;

// Prevent automatic hide of tooltip after some delay
// Tooltip can contain a detailed explanation of the skill, so user will need time to read it
const TOOLTIP_LEAVE_TOUCH_DELAY = 0;

export default function Skill({
  title,
  icon: { type: iconType, ref } = {},
  description,
  isPrimary,
  isOutdated,
  className,
}) {
  const chipNode = (
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
        description ? <InfoIcon style={{ pointerEvents: 'none' }} /> : undefined
      }
    />
  );

  const actualDescription = isOutdated
    ? `Неактуальный навык${description ? `. ${description}` : ''}`
    : description;

  if (!actualDescription) {
    return chipNode;
  }

  return (
    <Tooltip
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
