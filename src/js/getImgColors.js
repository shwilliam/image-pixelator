export default (canvas, detail) => {
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data

  const allPixelVals = []
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i+1]
    const b = data[i+2]
    const a = data[i+3]
    allPixelVals.push({r, g, b, a})
  }

  const pixelValsByRow = []
  allPixelVals.forEach((val, i) => {
    if (i % detail === 0 || i === 0) {
      pixelValsByRow.push([])
    }
    pixelValsByRow[pixelValsByRow.length - 1].push(val)
  })

  return pixelValsByRow
}
