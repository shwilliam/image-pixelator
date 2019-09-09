export default (file, output, detail) => {
  const img = document.createElement('img')
  const reader = new FileReader()

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
  }

  reader.readAsDataURL(file)
}

