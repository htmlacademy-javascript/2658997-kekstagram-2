const COMMENTS_DISPLAY_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const commentList = bigPicture.querySelector('.social__comments');
const commentTemplate = bigPicture.querySelector('.social__comment');

let comments = [];
let commentsShown = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImg = commentElement.querySelector('.social__picture');
  const commentText = commentElement.querySelector('.social__text');

  commentImg.src = avatar;
  commentImg.alt = name;
  commentText.textContent = message;

  return commentElement;
};

const renderCommentsShown = () => {
  const previousCommentsCount = commentsShown;

  commentsShown += COMMENTS_DISPLAY_STEP;

  if (commentsShown >= comments.length) {
    commentsShown = comments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = previousCommentsCount; i < commentsShown; i++) {
    const commentElement = createCommentElement(comments[i]);
    commentsFragment.append(commentElement);
  }

  commentList.append(commentsFragment);

  commentShownCount.textContent = commentsShown;

};

const renderBigPicture = (photo) => {

  image.src = photo.url;
  image.alt = photo.description;
  socialCaption.textContent = photo.description;
  likesCount.textContent = photo.likes;

  comments = photo.comments;
  commentsShown = 0;

  commentList.innerHTML = '';

  commentTotalCount.textContent = comments.length;

  renderCommentsShown();
};

commentsLoader.addEventListener('click', () => {
  renderCommentsShown();
});

export { renderBigPicture };
