let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

for (let i = 0; i < 40; i++) {
  const dot = document.createElement('span');
  dot.classList.add('particle');
  dot.style.left = Math.random() * 100 + 'vw';
  dot.style.animationDuration = 5 + Math.random() * 10 + 's';
  dot.style.width = dot.style.height = Math.random() * 6 + 'px';
  document.querySelector('.background-particles').appendChild(dot);
}
