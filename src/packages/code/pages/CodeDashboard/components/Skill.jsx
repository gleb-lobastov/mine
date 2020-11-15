import React from 'react';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import SkillLogo from './SkillLogo';

export default function Skill({
  title,
  icon: { type: iconType, ref } = {},
  description,
  isPrimary,
  isOutdated,
}) {
  const chipNode = (
    <Chip
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
    <Tooltip title={actualDescription} arrow={true}>
      {/*  wrap in div to always catch a pointer event, even for disabled chip */}
      <div>{chipNode}</div>
    </Tooltip>
  );
}
