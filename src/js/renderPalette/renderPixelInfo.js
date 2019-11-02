import {rgbToHex, detectDesktop} from '../utils'
import CheeseToast from '../lib/cheese-toast'

const isDesktop = detectDesktop()

export default (el, pixelVals) => {
  el.innerHTML = ''
  pixelVals.forEach(row => {
    const pixelInfoRow = document.createElement('div')
    pixelInfoRow.classList.add('pixel-info__row')

    row.forEach(pixel => {
      const colorVal = rgbToHex(pixel)

      const pixelInfoWrapper = document.createElement('div')
      pixelInfoWrapper.setAttribute('role', 'button')
      pixelInfoWrapper.setAttribute('tab-index', '0')
      pixelInfoWrapper.classList.add('pixel-info__item-wrapper')
      if (!isDesktop && pixelVals.length < 4)
        pixelInfoWrapper.style.opacity = 1

      pixelInfoWrapper.onclick = e => {
        e.preventDefault()
        if (navigator.clipboard) {
          navigator.clipboard.writeText(colorVal)
          new CheeseToast({
            text: `${colorVal} copied to clipboard!`,
            className: 'toast',
          })
        }
      }

      const pixelInfo = document.createElement('p')
      pixelInfo.classList.add('pixel-info__item')
      pixelInfo.innerText = colorVal

      pixelInfoWrapper.appendChild(pixelInfo)
      pixelInfoRow.appendChild(pixelInfoWrapper)
    })

    el.appendChild(pixelInfoRow)
  })
}
