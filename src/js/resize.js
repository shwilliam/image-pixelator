export default (file, detail) =>
  new Promise(res => {
    const img = document.createElement('img')

    if (typeof file === 'string') {
      drawToCanvas(img, file, detail, res)
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      // override on load listener if retriggered
      reader.onload = e => {
        drawToCanvas(img, e.target.result, detail, res)
      }
    }
  })

// TODO: refactor
function drawToCanvas(el, imgURL, detail, cb) {
  el.src = imgURL

  el.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = detail
    canvas.height = detail
    ctx.drawImage(el, 0, 0, detail, detail)

    cb(canvas)
  }
}
