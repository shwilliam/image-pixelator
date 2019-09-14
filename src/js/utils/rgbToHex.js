const componentToHex = c => {
  const hex = c.toString(16)
  return hex.length == 1 ? '0' + hex : hex
}

export default ({r, g, b, a}) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}${
    a === 255 ? '' : componentToHex(a)
  }`
