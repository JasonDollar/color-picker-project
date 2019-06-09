import styled from 'styled-components'
import { mediaUp, mediaDown } from './sizes'

const Container = styled.div`
  min-height: 100vh;

  .colors {
    height: 82vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    ${mediaDown.sm`
      flex-direction: column;
      flex-wrap: no-wrap;
    `}
  }
  .ColorBox {
    height: 50%;
    ${mediaDown.lg`
      height: 33.3333%;
    `}
    ${mediaDown.md`
      width: 50%;
      height: 20%;
    `}

    ${mediaDown.sm`
      width: 100%;
      height: 10%;
    `}
  }
  .ColorBox.go-back {
    background: black;
    flex-grow: 1;
    position: relative;
    ${mediaDown.sm`
      flex-grow: 0;
    `}
  }
  .back-button {
    width: 100px;
    height: 30px;
    position: absolute;
    /* display: inline-block; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    background: rgba(255,255,255,.3);
    font-size: 1rem;
    line-height: 30px;
    text-transform: uppercase;
    border: none;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

`

export default Container