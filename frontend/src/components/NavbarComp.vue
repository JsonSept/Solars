<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img class="logo" src="https://i.ibb.co/LSQPqpS/LC-STUDIO-HI-RES-LOGO-2023-redwht-1.webp" alt=""> LC STUDIO</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Navigation</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body bg-dark">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <router-link  class="nav-link" @click="closeOffcanvas(),removeBackdrop()" active-class="active" to="/home">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas(),removeBackdrop()" active-class="active" to="/energy">ENERGY DATA</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas()" active-class="active" to="/calc">CALCULATE</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas()" active-class="active" to="/help">HELP</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas()" active-class="active" to="/login">LOGIN</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas" active-class="active" to="/">SIGN UP</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="closeOffcanvas" active-class="active" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

</template>

<script setup>
import { onMounted } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Offcanvas } from 'bootstrap';


// closeOffcanvas() {
//       const offcanvasElement = document.getElementById('offcanvasDarkNavbar');
//       const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
//       offcanvas.hide();
//     }

const closeOffcanvas = () => {
  const offcanvasElement = document.getElementById('offcanvasDarkNavbar');
  const offcanvasInstance = Offcanvas.getInstance(offcanvasElement)
  offcanvasInstance.hide();
}

const removeBackdrop = () => {
  const backdrop = document.querySelector('offcanvas');
  if (backdrop) {
    backdrop.remove();
  }
};

onMounted(() => {
  const offcanvasElement = document.getElementById('offcanvasDarkNavbar');
  const offcanvasLinks = offcanvasElement.querySelectorAll('.nav-link');

  offcanvasLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeOffcanvas();
      removeBackdrop();
    });
  });

  offcanvasElement.addEventListener('hidden.bs.offcanvas', closeOffcanvas());
});
</script>


<style>
.logo {
  height: 30px;
  width: 20px;
}
    nav {
      background-color: black;
    }
</style>
