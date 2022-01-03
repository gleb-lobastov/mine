import React, { useCallback, useState } from 'react';
import cls from 'classnames';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import chunk from 'lodash/chunk';
import resolveDropzoneStyles from '../../resolveDropzoneStyles';
import calcBlurhashInWorker from './calcBlurhashInWorker';

const UPLOAD_MAX_IMAGES = 10;
const UPLOAD_IMAGES_CHUNK_SIZE = 2;
const UPLOAD_IMAGE_MIN_SIZE = 50 * 1024;
const UPLOAD_IMAGE_MAX_SIZE = 5 * 1024 * 1024;

const useStyles = makeStyles(resolveDropzoneStyles);

export default function PhotosDropzone({
  onChunkUpload,
  onUploadComplete,
  visit,
}) {
  const classes = useStyles();
  const [progress, setProgress] = useState(null);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const isUploadInProgress = progress !== null;

  const { visitId } = visit;

  const handleSubmitPhotos = useCallback(
    async (acceptedFiles, currentRejectedFiles) => {
      if (currentRejectedFiles) {
        setRejectedFiles(currentRejectedFiles);
      }
      setProgress({ uploaded: 0, measured: 0, total: acceptedFiles.length });
      const chunks = chunk(acceptedFiles, UPLOAD_IMAGES_CHUNK_SIZE);

      Promise.all(
        chunks.map(async chunkAcceptedFiles =>
          onChunkUpload({
            id: visitId,
            data: chunkAcceptedFiles,
            meta: await Promise.all(
              chunkAcceptedFiles.map(file =>
                measureImage(file).finally(() =>
                  setProgress(prevProgress => ({
                    ...prevProgress,
                    measured: (prevProgress?.measured ?? 0) + 1,
                  })),
                ),
              ),
            ),
            isAsset: true,
          })
            .finally(() =>
              setProgress(prevProgress => ({
                ...prevProgress,
                uploaded:
                  (prevProgress?.uploaded ?? 0) + UPLOAD_IMAGES_CHUNK_SIZE,
              })),
            )
            .catch(() => {}),
        ),
      ).finally(() => {
        setProgress(null);
        onUploadComplete();
      });
    },
    [onChunkUpload],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    disabled: isUploadInProgress,
    onDrop: handleSubmitPhotos,
    maxSize: UPLOAD_IMAGE_MAX_SIZE,
    minSize: UPLOAD_IMAGE_MIN_SIZE,
    maxFiles: UPLOAD_MAX_IMAGES,
  });

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
      <div
        className={cls(classes.dropzoneContainer, {
          [classes.dropzoneUpload]: isUploadInProgress,
        })}
      >
        <input {...getInputProps()} />
        {renderDropzoneCaption({ isDragActive, progress })}
        {rejectedFiles.length > 0 && (
          <div>
            Не удалось загрузить следующие файлы:
            {rejectedFiles.map(rejectedFile => (
              <div key={rejectedFile.path}>{renderFile(rejectedFile)}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function renderDropzoneCaption({ isDragActive, progress }) {
  switch (true) {
    case progress !== null: {
      const { total, measured, uploaded } = progress;
      return `Идет загрузка, пожалуйста не закрывайте браузер. Загружено/Подготовлено/Всего: ${uploaded}/${measured}/${total}`;
    }
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

function getImageData(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  return context.getImageData(0, 0, image.width, image.height);
}

function gcd(a, b) {
  let v1 = Math.abs(a);
  let v2 = Math.abs(b);
  let temp = v1;

  if (v2 > v1) {
    temp = v1;
    v1 = v2;
    v2 = temp;
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (v2 === 0) {
      return a;
    }
    v1 %= v2;
    if (v1 === 0) {
      return b;
    }
    v2 %= v1;
  }
}

async function measureImage(fileImage) {
  return new Promise(resolve => {
    const imageURL = URL.createObjectURL(fileImage);

    const image = new Image();

    image.onload = () => {
      const nod = gcd(image.width, image.height);
      const [w, h] = nod
        ? [image.width / nod, image.height / nod]
        : [image.width, image.height];
      try {
        const imageData = getImageData(image);
        calcBlurhashInWorker({
          pixels: imageData.data,
          width: imageData.width,
          height: imageData.height,
          componentX: 4,
          componentY: 4,
        }).then(blurhash => {
          resolve({
            aspect_ratio: `${w}:${h}`,
            blurhash,
          });
        });
      } catch (e) {
        resolve({
          aspect_ratio: `${w}:${h}`,
          blurhash: null,
        });
      }
    };

    image.src = imageURL;
  });
}
