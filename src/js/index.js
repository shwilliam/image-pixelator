import 'babel-polyfill'

import resize from './resize'
import getPixelVals from './getPixelVals'
import renderPalette from './renderPalette'
import renderPixelInfo from './renderPixelInfo'

const output = document.getElementById('palette')
const outputOverlay = document.getElementById('palette__overlay')
const fileInput = document.getElementById('input-img')
const detailInput = document.getElementById('input-detail')

document.getElementById('btn-resize').onclick
  = async () => {
    const detail = detailInput.value
    const canvas = await resize(fileInput.files[0], detail)
    const pixelVals = getPixelVals(canvas, detail)
    renderPalette(output, canvas.toDataURL('image/png'))
    renderPixelInfo(outputOverlay, pixelVals)
  }
