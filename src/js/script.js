const burger = document.querySelector('.burger-wrapper');
const mobile_nav_blur = document.querySelector('.blur');
const mobile_nav = document.querySelector('.mobile__nav-wrapper');
const toggle_navigation = () => {
    burger.classList.toggle('burger--active');
    mobile_nav_blur.classList.toggle('blur--active');
    mobile_nav.classList.toggle('mobile__nav-wrapper--active');
}
burger.addEventListener('click',(event) => {
    toggle_navigation();
});
mobile_nav_blur.addEventListener('click',(event) => {
  toggle_navigation();
})


