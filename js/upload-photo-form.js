const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const buttonSmall = modalElement.querySelector('.scale__control--smaller');
const buttonBig = modalElement.querySelector('.scale__control--bigger');
const scaleInput = modalElement.querySelector('.scale__control--value');
const miniImage = modalElement.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  miniImage.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onButtonSmallClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onButtonBigClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

buttonSmall.addEventListener('click', onButtonSmallClick);
buttonBig.addEventListener('click', onButtonBigClick);

export { resetScale };
