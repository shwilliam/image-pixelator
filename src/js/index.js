import 'babel-polyfill'

import generatePalette from './generatePalette'
import renderDetailValue from './renderDetailValue'
import createDropzone from './createDropzone'

const output = document.getElementById('palette')
const outputOverlay = document.getElementById('palette__overlay')
const detailInputContainer = document.getElementById(
  'input-detail__container',
)
const detailInputValue = document.getElementById(
  'input-detail__value',
)
const fileInputForm = document.getElementById('form-img')
const fileInput = document.getElementById('form-img__input')
const fileInputLabel = document.getElementById('form-img__label')

createDropzone(fileInputForm, fileInputLabel, file =>
  generatePalette(
    output,
    outputOverlay,
    file,
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  ),
)

renderDetailValue(
  detailInputValue,
  detailInputValue.getAttribute('aria-valuenow'),
)

detailInputContainer.addEventListener('click', e => {
  e.preventDefault()
  let newVal = parseInt(
    detailInputValue.getAttribute('aria-valuenow'),
  )
  const maxVal = detailInputValue.getAttribute('aria-valuemax')
  const minVal = detailInputValue.getAttribute('aria-valuemin')

  switch (e.target.value) {
    case 'increment':
      if (newVal < maxVal) newVal += 1
      break
    case 'decrement':
      if (newVal > minVal) newVal -= 1
      break
    default:
      break
  }

  renderDetailValue(detailInputValue, newVal)
  generatePalette(
    output,
    outputOverlay,
    output.src || fileInput.files[0],
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  )
})

fileInput.addEventListener('change', () =>
  generatePalette(
    output,
    outputOverlay,
    fileInput.files[0],
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  ),
)
