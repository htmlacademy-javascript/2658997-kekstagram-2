import { renderPictures } from './render-miniatures.js';
import { openBigPicture} from './big-picture-modal.js';
import { showErrorMessage } from './utils.js';
import { getData } from './api.js';
import { initFilters } from './filter.js';
import './form.js';
import './upload-photo-form.js';
import './effects.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
    openBigPicture(photos);
    initFilters(photos);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
