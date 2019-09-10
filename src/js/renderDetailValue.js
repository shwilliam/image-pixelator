export default (el, val) => {
  el.setAttribute('aria-valuenow', val)
  el.innerText = val
}
