const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content');
const logo = document.querySelector('.logo');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  content.classList.toggle('shifted');
  logo.classList.toggle('shifted');
});
