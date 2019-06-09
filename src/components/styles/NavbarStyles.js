import styled from 'styled-components'
import { mediaUp, mediaDown } from './sizes'

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 6vh;

  & .logo {
    margin-right: 15px;
    padding: 0 13px;
    font-size: 22px;
    background-color: #eceff1;
    font-family: Roboto, sans-serif;
    height: 100%;
    display: flex;
    align-items: center;
    ${mediaDown.xs`
      display: none;
    `}

    & a {
      text-decoration: none;
      color: black;
    }
  }

  .select-container {
    margin-left: auto;
    margin-right: 1rem;
  }
`
export const SliderContainer = styled.div`
  width: 340px;
  margin: 0 10px;
  display: inline-block;
  ${mediaDown.md`
    width: 150px;
  `}

  .rc-slider-track {
    background: transparent;
    margin-left: 7px;
  }
  .rc-slider-rail {
    height: 8px;
    margin-left: 7px;
  }
  .rc-slider-handle,
  .rc-slider-handle:active, 
  .rc-slider-handle:hover,
  .rc-slider-handle:focus {
    background: green;
    border: 2px solid green;
    box-shadow: none;
    width: 13px;
    height: 13px;
    margin-left: 7px;
    margin-top: -3px;
  }

`