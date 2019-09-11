export default (file, detail) =>
  new Promise(res => {
    const img = document.createElement('img')
    const reader = new FileReader()

    reader.readAsDataURL(file)

    // override on load listener if retriggered
    reader.onload = e => {
      img.src = e.target.result

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = detail
        canvas.height = detail
        ctx.drawImage(img, 0, 0, detail, detail)

        res(canvas)
      }
    }
  })
