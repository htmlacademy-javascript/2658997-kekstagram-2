const bigPicture = document.querySelector('.big-picture');
const image = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
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

const COMMENTS_STEP = 5;
let commentsArray = [];
let commentsShown = 0;

const renderCommentsShown = () => {
  const previousCommentsCount = commentsShown;

  commentsShown += COMMENTS_STEP;

  if (commentsShown >= commentsArray.length) {
    commentsShown = commentsArray.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();

  for (let i = previousCommentsCount; i < commentsShown; i++) {
    const commentElement = createCommentElement(commentsArray[i]);
    commentsFragment.append(commentElement);
  }

  commentList.append(commentsFragment);

  commentShownCount.textContent = commentsShown;
  commentTotalCount.textContent = commentsArray.length;
};

commentsLoader.addEventListener('click', () => {
  renderCommentsShown();
});


export const renderBigPicture = ({url, description, likes, comments}) => {

  image.src = url;
  image.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;

  commentsArray = comments;
  commentsShown = 0;

  commentList.innerHTML = '';
  renderCommentsShown();
};
