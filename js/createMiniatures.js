export const getPictures = (picturesData) => {

  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach(({url, description, comments, likes}) => {
    const pictureItem = pictureTemplate.cloneNode(true);

    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__img').alt = description;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    pictureItem.querySelector('.picture__likes').textContent = likes;

    picturesFragment.append(pictureItem);
  });

  picturesList.append(picturesFragment);
};
