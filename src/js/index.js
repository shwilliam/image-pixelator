import 'babel-polyfill'

import renderDropzone from './renderDropzone'
import renderPalette from './renderPalette'

// image dropzone
const fileInput = document.getElementById('form-img__input')
const fileInputForm = document.getElementById('form-img')
const fileInputLabel = document.getElementById('form-img__label')
const detailInputContainer = document.getElementById(
  'input-detail__container',
)

// palette els
const output = document.getElementById('palette')
const outputOverlay = document.getElementById('palette__overlay')
const detailInputValue = document.getElementById(
  'input-detail__value',
)

let draggedFile
renderDropzone(fileInputForm, fileInputLabel, file => {
  draggedFile = file
  renderPalette(
    output,
    outputOverlay,
    file,
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  )
})

detailInputValue.setAttribute(
  'aria-valuenow',
  detailInputValue.getAttribute('aria-valuenow'),
)
detailInputValue.innerText = detailInputValue.getAttribute(
  'aria-valuenow',
)

fileInput.addEventListener('change', () => {
  draggedFile = null
  renderPalette(
    output,
    outputOverlay,
    fileInput.files[0],
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  )
})

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

  detailInputValue.setAttribute('aria-valuenow', newVal)
  detailInputValue.innerText = newVal

  renderPalette(
    output,
    outputOverlay,
    draggedFile || fileInput.files[0],
    parseInt(detailInputValue.getAttribute('aria-valuenow')),
  )
})
