const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImg = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');

  commentImg.src = avatar;
  commentImg.alt = name;
  commentText.textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });

  commentList.append(fragment);
};


export const renderBigPicture = ({url, description, likes, comments}) => {

  image.src = url;
  image.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;

  renderComments(comments);

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};
