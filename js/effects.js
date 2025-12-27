const EFFECTS = {
  none: { style: 'none', min: 0, max: 100, step: 1, unit: '' },
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const imageElement = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');

const applyFilter = (value) => {
  const { style, unit } = EFFECTS[currentEffect];
  if (currentEffect === 'none') {
    imageElement.style.filter = 'none';
  } else {
    imageElement.style.filter = `${style}(${value}${unit})`;
  }
};

const updateSlider = (effect) => {
  currentEffect = effect;

  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    applyFilter();
    return;
  }

  sliderContainer.classList.remove('hidden');
  const { min, max, step } = EFFECTS[currentEffect];

  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectLevelInput.value = value;
  applyFilter(value);
});

effectsList.addEventListener('change', (evt) => {
  updateSlider(evt.target.value);
});

const resetEffects = () => {
  updateSlider('none');
};


export { resetEffects };
