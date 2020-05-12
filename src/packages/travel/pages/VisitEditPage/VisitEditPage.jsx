import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthContext } from 'core/context/AuthContext';
import { useVisit, useAddVisitPhotoRequest } from 'travel/dataSource';
import VisitInfo from 'travel/components/models/visits/VisitInfo';

const useStyles = makeStyles({
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
});

const domain = 'travel.VisitEditPage';
export default function VisitEditPage({
  match: {
    params: { userAlias, strVisitId },
  },
}) {
  const classes = useStyles();

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
      console.log({ rejectedFiles });
    }
    return submitVisitPhoto({
      id: Number(strVisitId),
      data: acceptedFiles,
    });
  }, submitVisitPhoto);

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
    <Dropzone onDrop={handleSubmitPhotos}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <VisitInfo visit={visit} isLong={true} />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>
              Перенесите сюдай файлы для загрузки или кликните, что-бы выбрать
              файлы
            </p>
          </div>
          <div className={classes.photosContainer}>
            {photos.map(({ thumbnailUrl }) => (
              <div key={thumbnailUrl} className={classes.photoContainer}>
                <img className={classes.photo} src={thumbnailUrl} />
              </div>
            ))}
          </div>
        </section>
      )}
    </Dropzone>
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
