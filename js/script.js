let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelectro('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active');
}
