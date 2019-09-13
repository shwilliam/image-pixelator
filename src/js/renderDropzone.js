export default (el, label, onDrop) => {
  label.innerText = 'Drag and drop or click here to select an image'

  // prevent default drag behaviors
  // eslint-disable-next-line
  ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(
    eventName => {
      el.addEventListener(eventName, preventDefaults, false)
      document.body.addEventListener(
        eventName,
        preventDefaults,
        false,
      )
    },
  )
  ;['dragenter', 'dragover'].forEach(eventName => {
    el.addEventListener(eventName, onDragEnter, false)
  })

  el.addEventListener('dragleave', onDragLeave, false)
  el.addEventListener('drop', handleDrop, false)

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function onDragEnter() {
    if (!label) return
    label.innerText = 'Drop it!'
  }

  function onDragLeave() {
    if (!label) return
    label.innerText = 'Drag and drop or click here to select an image'
  }

  function handleDrop(e) {
    const file = e.dataTransfer.files[0]
    onDrop(file)
  }
}
