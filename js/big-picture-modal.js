import { renderBigPicture } from './render-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');


export const openBigPicture = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {

    const photoElement = evt.target.closest('.picture');

    if(!photoElement) {
      return;
    }

    evt.preventDefault();

    const pictureId = Number(photoElement.dataset.pictureId);
    const currentPhotoData = photos.find((item) => item.id === pictureId);

    renderBigPicture(currentPhotoData);

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onEscapeKeydown);
  });

  bigPictureCloseButton.addEventListener('click', () => {
    closeBigPicture();
  });

};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
}

function onEscapeKeydown (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}
