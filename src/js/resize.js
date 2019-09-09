import getImgColors from './getImgColors'

// TODO: move this
const infoContainer = document.getElementById('pixel-info')

const componentToHex = c => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

// FIXME: instead use rgb color
const rgbToHex = ({r, g, b, a}) => `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${componentToHex(a)}`


export default (file, output, detail) => {
  const img = document.createElement('img')
  const reader = new FileReader()
  const shadowCanvas = document.getElementById('canvas') 

  reader.onload = e => {
    img.src = e.target.result

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    const maxWidth = detail
    const maxHeight = detail

    let width = img.width
    let height = img.height

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width
        width = maxWidth
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height
        height = maxHeight
      }
    }

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)

    output.src
      = canvas.toDataURL('image/png')
    
    shadowCanvas.width = width
    shadowCanvas.height = height
    shadowCanvas
      .getContext('2d')
      .drawImage(img, 0, 0, width, height)
    const pixelVals = getImgColors(shadowCanvas, detail)

    // TODO: move this
    infoContainer.innerHTML = ''
    pixelVals.forEach(row => {
      const pixelInfoRow = document.createElement('div')
      pixelInfoRow.classList.add('pixel-info__row')

      row.forEach(pixel => {
        const pixelInfoWrapper = document.createElement('div')
        pixelInfoWrapper.classList.add('pixel-info__item-wrapper')

        const pixelInfo = document.createElement('p')
        pixelInfo.classList.add('pixel-info__item')
        pixelInfo.innerText = rgbToHex(pixel)

        pixelInfoWrapper.appendChild(pixelInfo)
        pixelInfoRow.appendChild(pixelInfoWrapper)
      })

      infoContainer.appendChild(pixelInfoRow)
    })
  }

  reader.readAsDataURL(file)
}

