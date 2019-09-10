import 'babel-polyfill'

import resize from './resize'
import getPixelVals from './getPixelVals'
import renderPalette from './renderPalette'
import renderPixelInfo from './renderPixelInfo'
import renderDetailValue from './renderDetailValue'

const output = document.getElementById('palette')
const outputOverlay = document.getElementById('palette__overlay')
const fileInput = document.getElementById('input-img')
const detailInputContainer = document.getElementById('input-detail__container')
const detailInputValue = document.getElementById('input-detail__value')

renderDetailValue(detailInputValue, detailInputValue.getAttribute('aria-valuenow'))

detailInputContainer.addEventListener(
  'click',
  e => {
    e.preventDefault()
    let newVal = parseInt(detailInputValue.getAttribute('aria-valuenow'))
    const maxVal = detailInputValue.getAttribute('aria-valuemax')
    const minVal = detailInputValue.getAttribute('aria-valuemin')

    switch (e.target.value) {
      case 'increment':
        if (newVal < maxVal) newVal += 1
        break;
      case 'decrement':
        if (newVal > minVal) newVal -= 1
        break;
      default:
        break;
    }

    renderDetailValue(detailInputValue, newVal)
  }
)

document.getElementById('btn-resize').addEventListener(
  'click',
  async () => {
    const detail = parseInt(detailInputValue.getAttribute('aria-valuenow'))
    const canvas = await resize(fileInput.files[0], detail)
    const pixelVals = getPixelVals(canvas, detail)
    renderPalette(output, canvas.toDataURL('image/png'))
    renderPixelInfo(outputOverlay, pixelVals)
  }
)
