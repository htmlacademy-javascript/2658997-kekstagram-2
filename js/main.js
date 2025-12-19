import {createPhotos} from './data.js';
import {getPictures} from './createMiniatures.js';

const pictures = createPhotos();

getPictures(pictures);
