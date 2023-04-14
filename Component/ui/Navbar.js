import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Navbar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg  top-navbar">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

   

      </ul>
      <form class="d-flex  " id='td-div'>

        <ConnectButton></ConnectButton>
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar