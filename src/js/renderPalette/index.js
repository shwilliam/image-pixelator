import resize from '../resize'
import renderPixelInfo from './renderPixelInfo'
import { getPixelVals } from '../utils'

export default async (el, overlay, file, detail) => {
  const canvas = await resize(file, detail)
  const pixelVals = getPixelVals(canvas, detail)

  el.src = canvas.toDataURL('image/png')

  renderPixelInfo(overlay, pixelVals)
}
