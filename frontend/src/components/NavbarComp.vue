<template>

  <nav class="navbar navbar-dark bg-warning
   fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><img class="logo"
          src="https://i.ibb.co/LSQPqpS/LC-STUDIO-HI-RES-LOGO-2023-redwht-1.webp" alt=""> SolarTrack</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-warning" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">SolarTrack</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
            aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-dark">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link " href="/home">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/calc">CALCULATE</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/energy">ENERGY DATA</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/test">Test</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/help">HELP</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">LOGIN</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">SIGN UP</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>


// Get all the links in the navbar
const navLinks = document.querySelectorAll('.nav-link');

// Function to remove active class from all links and add to the clicked link
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all links
    this.classList.add('active'); // Add active class to the clicked link
  });
});

</script>


<style>
.nav-link.active {
  color: #ff5722;
  font-weight: bold;
}
.logo {
  height: 30px;
  width: 20px;
}
    nav {
      /* background-color: black; */
      /* background-color: rgb(254, 0, 42); */
    }
</style>
