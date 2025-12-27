import { isEscapeKey } from './util.js';
import { resetScale } from './upload-photo-form.js';
import { resetEffects } from './effects.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const isTextFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeHashtags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((hashtag) => Boolean(hashtag.length));

const hasValidHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const hasUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const hasValidHashtags = (value) => normalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

pristine.addValidator(
  hashtagInput,
  hasValidHashtags,
  'Неверный хэштег: начни с #, используй буквы и цифры, до 20 символов',
  1,
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueHashtags,
  'Хэштеги не должны повторяться',
  2,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidHashtagsCount,
  'Нельзя указать больше 5 хэштегов',
  3,
  true
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`
);

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
};


function openForm() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeForm() {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadInput.addEventListener('change', () => {
  openForm();
});

closeFormButton.addEventListener('click', () => {
  closeForm();
});

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
