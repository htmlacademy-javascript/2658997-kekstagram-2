const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictureElement = ({id, url, description, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.dataset.pictureId = id;

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  return pictureElement;
};

export const renderPictures = (picturesData) => {
  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    const pictureItem = createPictureElement(picture);
    picturesFragment.append(pictureItem);
  });

  picturesList.append(picturesFragment);
};
