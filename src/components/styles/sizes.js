import { css } from 'styled-components'

const sizes = {
  lg: 1200,
  md: 992,
  sm: 768,
  xs: 576,
}

// Iterate through the sizes and create a media template
const mediaDown = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

const mediaUp = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export { mediaUp, mediaDown }