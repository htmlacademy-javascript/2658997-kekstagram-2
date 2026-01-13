import { renderPictures } from './render-miniatures.js';
import { debounce } from './utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const MAX_RANDOM_PICTURE_COUNT = 10;
const TIMEOUT_DELAY = 500;
const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORT_FUNCTION = {
  randomed: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const filterControl = document.querySelector('.img-filters');

let currentFilter = FILTER.default;
let lastRenderedFilter = FILTER.default;
let pictures = [];

const getFilteredPictures = () => {
  switch (currentFilter) {
    case FILTER.random:
      return [...pictures].sort(SORT_FUNCTION.randomed).slice(0, MAX_RANDOM_PICTURE_COUNT);
    case FILTER.discussed:
      return [...pictures].sort(SORT_FUNCTION.discussed);
    default:
      return [...pictures];
  }
};

const removePictures = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

const renderFilteredPictures = () => {
  if (currentFilter === lastRenderedFilter) {
    return;
  }

  removePictures();
  renderPictures(getFilteredPictures());

  lastRenderedFilter = currentFilter;
};

const debouncedRenderPictures = debounce(renderFilteredPictures, TIMEOUT_DELAY);

function onFilterClick(evt) {
  const clickedButton = evt.target.closest('.img-filters__button');
  const activeButton = filterControl.querySelector(`.${ACTIVE_BUTTON_CLASS}`);

  if (!clickedButton || clickedButton.id === currentFilter) {
    return;
  }

  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  clickedButton.classList.add(ACTIVE_BUTTON_CLASS);

  currentFilter = clickedButton.id;

  debouncedRenderPictures();
}

const initFilters = (picturesData) => {
  filterControl.classList.remove('img-filters--inactive');
  pictures = [...picturesData];
  filterControl.addEventListener('click', onFilterClick);
};

export { initFilters };
