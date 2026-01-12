const EFFECTS = {
  none: { style: 'none', min: 0, max: 100, step: 1, unit: '' },
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const SLIDER_START_VALUE = 100;

const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let currentEffect = 'none';

const applyFilter = (value) => {
  const { style, unit } = EFFECTS[currentEffect];
  previewImage.style.filter = currentEffect === 'none' ? 'none' : `${style}(${value}${unit})`;
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

  effectLevelSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
    step,
  });
};

const resetEffects = () => {
  updateSlider('none');
};

effectsList.addEventListener('change', (evt) => {
  updateSlider(evt.target.value);
});

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: SLIDER_START_VALUE,
  step: 1,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', () => {
  const value = effectLevelSlider.noUiSlider.get();

  const normalizedValue = parseFloat(value);
  effectLevelInput.value = normalizedValue;
  applyFilter(value);
});

sliderContainer.classList.add('hidden');


export { resetEffects };
