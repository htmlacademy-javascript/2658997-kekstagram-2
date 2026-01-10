import { renderPictures } from './render-miniatures.js';
import { debounce } from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_RANDOM_PICTURE_COUNT = 10;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = FILTER.default;
let pictures = [];

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.random:
      return [...pictures].sort(SORTFUNC.random).slice(0, MAX_RANDOM_PICTURE_COUNT);
    case FILTER.discussed:
      return [...pictures].sort(SORTFUNC.discussed);
    default:
      return [...pictures];
  }
};

const removePictures = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const renderFilteredPictures = () => {
  removePictures();
  renderPictures(getFilteredPictures());
};

const debouncedRenderPictures = debounce(renderFilteredPictures, 500);


function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if(!targetButton.matches('button')) {
    return;
  }

  if(activeButton === targetButton) {
    return;
  }

  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  debouncedRenderPictures();
}

const initFilters = (picturesData) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
  filterElement.addEventListener('click', onFilterChange);
};

export { initFilters };
