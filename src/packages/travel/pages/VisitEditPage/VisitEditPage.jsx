import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'core/context/AuthContext';
import { useVisit, useAddVisitPhotoRequest } from 'travel/dataSource';
import VisitInfo from 'travel/components/VisitInfo';
import resolveDropzoneStyles from './resolveDropzoneStyles';

const UPLOAD_IMAGE_MIN_SIZE = 50 * 1024;
const UPLOAD_IMAGE_MAX_SIZE = 5 * 1024 * 1024;

const useStyles = makeStyles(theme => ({
  container: { fontSize: '16px', lineHeight: '1.5' },
  photosContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  photoContainer: {
    margin: '4px 12px 12px',
    minWidth: '150px',
    maxHeight: '100px',
    textAlign: 'center',
  },
  photo: {
    maxWidth: '150px',
    borderRadius: '4px',
  },
  ...resolveDropzoneStyles(theme),
}));

const domain = 'travel.VisitEditPage';
export default function VisitEditPage({
  match: {
    params: { userAlias, strVisitId },
  },
}) {
  const classes = useStyles();
  const [progress, setProgress] = useState(null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const isUploadInProgress = progress !== null;

  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const { isError, isPending, visit } = useVisit({
    domain,
    userAlias,
    visitId: Number(strVisitId),
  });

  const { submitVisitPhoto } = useAddVisitPhotoRequest({
    domain,
    userAlias,
    visitId: Number(strVisitId),
  });

  const handleSubmitPhotos = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles) {
      setRejectedFiles(rejectedFiles);
    }
    setProgress(1);
    return submitVisitPhoto({
      id: Number(strVisitId),
      data: acceptedFiles,
    }).finally(() => setProgress(null));
  }, submitVisitPhoto);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    disabled: isUploadInProgress,
    onDrop: handleSubmitPhotos,
    maxSize: UPLOAD_IMAGE_MAX_SIZE,
    minSize: UPLOAD_IMAGE_MIN_SIZE,
  });

  const isEditable = isAuthenticated && authenticatedUserAlias === userAlias;

  if (!isEditable) {
    return <div>Ошибка. Нет доступа</div>;
  }

  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  if (!visit) {
    return <div>...Не найдено посещение</div>;
  }

  const { photos } = visit;

  return (
    <div
      {...getRootProps()}
      className={cls({
        [classes.dropzoneStandby]: !isDragActive,
        [classes.dropzoneActive]: isDragActive,
        [classes.dropzoneAccept]: isDragAccept,
        [classes.dropzoneReject]: isDragReject,
      })}
    >
      <VisitInfo visit={visit} isLong={true} />
      <div
        className={cls(classes.dropzoneContainer, {
          [classes.dropzoneUpload]: isUploadInProgress,
        })}
      >
        <input {...getInputProps()} />
        {renderDropzoneCaption({ isDragActive, isUploadInProgress })}
        {rejectedFiles.length > 0 && (
          <div>
            Не удалось загрузить следующие файлы:
            {rejectedFiles.map(rejectedFile => (
              <div key={rejectedFile.path}>{renderFile(rejectedFile)}</div>
            ))}
          </div>
        )}
      </div>
      <div className={classes.photosContainer}>
        {photos.map(({ thumbnailUrl }) => (
          <div key={thumbnailUrl} className={classes.photoContainer}>
            <img className={classes.photo} src={thumbnailUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

VisitEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
      strVisitId: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

function renderDropzoneCaption({ isDragActive, isUploadInProgress }) {
  switch (true) {
    case isUploadInProgress:
      return 'Идет загрузка, пожалуйста не закрывайте браузер';
    case isDragActive:
      return 'Загрузить фотографии';
    default:
      return 'Перенесите сюда фотографии для загрузки или кликните, что-бы выбрать файлы';
  }
}

function renderFile({ file, errors }) {
  const errorsMessage = errors.map(({ message }) => message).join(', ');
  return `${file.path} - ${file.size} bytes, reason: ${errorsMessage}`;
}
