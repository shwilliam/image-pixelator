import createShadowPalette from './createShadowPalette'

export default (file, detail) =>
  new Promise(res => {
    const img = document.createElement('img')

    if (typeof file === 'string') {
      createShadowPalette(img, file, detail, res)
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      // override on load listener if retriggered
      reader.onload = e => {
        createShadowPalette(img, e.target.result, detail, res)
      }
    }
  })

