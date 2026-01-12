const REMOVE_ERROR_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const body = document.body;


const isEscapeKey = (evt) => (evt.key === 'Escape');

const showErrorMessage = () => {
  const errorArea = errorMessageTemplate.cloneNode(true);
  body.append(errorArea);

  setTimeout (() => {
    body.querySelector('.data-error').remove();
  }, REMOVE_ERROR_MESSAGE_TIMEOUT);
};

const appendNotification = (template) => {
  const notification = template.cloneNode(true);
  const closeButton = notification.querySelector('button');

  const removeNotification = () => {
    notification.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      removeNotification();
    }
  }

  notification.addEventListener('click', (evt) => {
    if (evt.target === notification) {
      removeNotification();
    }
  });

  closeButton.addEventListener('click', () => removeNotification());

  document.addEventListener('keydown', onDocumentKeydown);
  body.append(notification);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export { isEscapeKey, showErrorMessage, appendNotification, debounce };
