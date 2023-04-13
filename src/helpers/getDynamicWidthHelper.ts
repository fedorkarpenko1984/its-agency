export const getDynamicWidthHeper = (): number => {
    let newWidth = window.innerWidth 
    if (newWidth >= 992) {
      newWidth -= (300 + 128)
      newWidth = 278 + (Math.floor(newWidth / 278) - 1) * (278 + 24)
    } else if (newWidth >= 768 && newWidth < 992) {
      newWidth -= (270 + 64)
      newWidth = 156 + (Math.floor(newWidth / 156) - 1) * (156 + 15)
    } else {
      newWidth -= 48
      newWidth = 156 + (Math.floor(newWidth / 156) - 1) * (156 + 15)
    }
    return newWidth
  }