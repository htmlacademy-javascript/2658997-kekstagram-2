import { createPhotosData } from './data.js';
import { renderPictures } from './render-miniatures.js';
import { openBigPicture} from './big-picture-modal.js';

const picturesMiniatures = createPhotosData();
renderPictures(picturesMiniatures);


openBigPicture(picturesMiniatures);
