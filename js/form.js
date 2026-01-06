import { isEscapeKey } from './utils.js';
import { resetScale } from './upload-photo-form.js';
import { resetEffects } from './effects.js';
import { sendData } from './api.js';
import { appendNotification } from './utils.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const uploadInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeFormButton = form.querySelector('.img-upload__cancel');
const formSubmitButton = form.querySelector('.img-upload__submit');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...',
};

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const isTextFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const disabledButton = (buttonText) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = buttonText;
};

const enabledButton = (buttonText) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = buttonText;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const normalizeHashtags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((hashtag) => Boolean(hashtag.length));

const checkValidHashtagsCount = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_COUNT;

const checkUniqueHashtags = (value) => {
  const lowerCaseTags = normalizeHashtags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const checkCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const checkValidHashtags = (value) => normalizeHashtags(value).every((tag) => VALID_SYMBOLS.test(tag));

pristine.addValidator(
  hashtagInput,
  checkValidHashtags,
  'Неверный хэштег: начни с #, используй буквы и цифры, до 20 символов',
  1,
  true
);

pristine.addValidator(
  hashtagInput,
  checkUniqueHashtags,
  'Хэштеги не должны повторяться',
  2,
  true
);

pristine.addValidator(
  hashtagInput,
  checkValidHashtagsCount,
  'Нельзя указать больше 5 хэштегов',
  3,
  true
);

pristine.addValidator(
  commentInput,
  checkCommentLength,
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


const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    disabledButton(submitButtonText.SENDING);
    try {
      await sendData(new FormData(formElement));
      closeForm();
      appendNotification(successTemplate);
    } catch (error) {
      appendNotification(errorTemplate);
      document.removeEventListener('keydown', onDocumentKeydown);
    } finally {
      enabledButton(submitButtonText.IDLE);
    }
  }
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};

form.addEventListener('submit', formSubmitHandler);
