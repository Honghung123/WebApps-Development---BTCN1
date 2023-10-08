// Xu ly navbar va Footer
function disableLastActiveNav() {
  const activeNav = document.querySelector(".navbar_link.active");
  if (activeNav) {
    activeNav.classList.remove("active");
  }
}
function disableLastActiveFooter() {
  const activeNav = document.querySelector(".footer_navbar_link.active");
  if (activeNav) {
    activeNav.classList.remove("active");
  }
}

function activeNav(e) {
  if (!e.target.classList.contains(".active")) {
    disableLastActiveNav();
    disableLastActiveFooter();
    let navClick = null;
    let footer_navClick = null;
    document.querySelectorAll(".navbar_link").forEach((nav) => {
      if (nav.innerText == e.target.innerText) {
        navClick = nav;
      }
    });
    document.querySelectorAll(".footer_navbar_link").forEach((nav) => {
      if (nav.innerText == e.target.innerText) {
        footer_navClick = nav;
      }
    });
    console.log(navClick);
    console.log(footer_navClick);
    navClick.classList.add("active");
    footer_navClick.classList.add("active");
  }
}

document.querySelectorAll(".navbar_link").forEach((nav) => {
  nav.addEventListener("click", activeNav);
});
document.querySelectorAll(".footer_navbar_link").forEach((navFooter) => {
  navFooter.addEventListener("click", activeNav);
});
