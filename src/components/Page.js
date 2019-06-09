import React from 'react'
import { createGlobalStyle } from 'styled-components'

const PageCSS = createGlobalStyle`
  .page {
    height: 100vh;
    position: fixed;
    width: 100%;
    top: 0;
    transition: opacity .5s ease-in-out;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .page-enter {
    opacity: 0;
  }
  .page-enter-active {
    opacity: 1;
  }
  .page-exit {
    opacity: 1;
  }
  .page-exit-active {
    opacity: 0;
  }
`

const Page = ({ children }) => {
  return (
    <section className="page">
      <PageCSS />
      {children}
    </section>
  )
}

export default Page
