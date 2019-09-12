export default (el, imgURL, detail, cb) => {
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
