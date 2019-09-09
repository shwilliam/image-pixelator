export default (file, detail) => 
  new Promise((res, rej) => {
    const img = document.createElement('img')
    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = e => {
      img.src = e.target.result

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = detail
      canvas.height = detail
      ctx.drawImage(img, 0, 0, detail, detail)
      
      res(canvas)
    }
  })

