export default (el, label, onDrop) => {
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
  ;['dragleave', 'drop'].forEach(eventName => {
    el.addEventListener(eventName, onDragLeave, false)
  })

  el.addEventListener('drop', handleDrop, false)

  function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  function onDragEnter() {
    if (!label) return
    label.innerHTML = 'Drop here!'
  }

  function onDragLeave() {
    if (!label) return
    label.innerHTML = 'Drop your image here'
  }

  function handleDrop(e) {
    const file = e.dataTransfer.files[0]
    onDrop(file)
  }
}
