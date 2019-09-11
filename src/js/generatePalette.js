import resize from './resize'
import getPixelVals from './getPixelVals'
import renderPalette from './renderPalette'
import renderPixelInfo from './renderPixelInfo'

export default async (el, overlay, file, detail) => {
  const canvas = await resize(file, detail)
  const pixelVals = getPixelVals(canvas, detail)
  renderPalette(el, canvas.toDataURL('image/png'))
  renderPixelInfo(overlay, pixelVals)
  return file
}
