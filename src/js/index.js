import resize from './resize'

const output = document.getElementById('output')
const fileInput = document.getElementById('input-img')

document.getElementById('btn-resize').onclick
  = () => resize(fileInput.files[0], output, 4)

