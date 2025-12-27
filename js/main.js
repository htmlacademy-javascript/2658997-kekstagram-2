import { createPhotosData } from './data.js';
import { renderPictures } from './render-miniatures.js';
import { openBigPicture} from './big-picture-modal.js';
import './form.js';
import './upload-photo-form.js';
import './effects.js';

const picturesMiniatures = createPhotosData();
renderPictures(picturesMiniatures);


openBigPicture(picturesMiniatures);
