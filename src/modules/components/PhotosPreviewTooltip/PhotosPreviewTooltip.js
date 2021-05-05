import React from 'react';
import cls from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { usePreviewTrigger } from 'core/context/PreviewContext';

const useStyles = makeStyles({
  trigger: {
    transition: 'transform 0.5s ease',
    transformOrigin: 'left',
    display: 'inline-block',
  },
  activeTrigger: {
    transform: 'scale(1.4)',
  },
});

export default function PhotosPreviewTooltip({
  caption,
  previewUrls,
  children,
}) {
  const classes = useStyles();

  const { active, triggerProps } = usePreviewTrigger({
    caption,
    previewUrls,
  });

  const triggerClassName = cls(classes.trigger, {
    [classes.activeTrigger]: active,
  });

  if (typeof children === 'function') {
    return children({
      previewTriggerProps: triggerProps,
      previewActive: active,
      previewTriggerClassName: triggerClassName,
    });
  }

  return (
    <div {...triggerProps} className={triggerClassName}>
      {children}
    </div>
  );
}

PhotosPreviewTooltip.defaultProps = {
  thumbnailsUrls: [],
};
