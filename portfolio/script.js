// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 20){
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  }else{
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }

}

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
}
cancelBtn.onclick = function(){
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
}

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}


// window.addEventListener("scroll", () => {
//   const navbar = document.querySelector("nav");
//   const scrollY = window.scrollY;

//   if (scrollY > 50) {
//     navbar.classList.add("sticky", "slide-down");
//   } else {
//     navbar.classList.remove("sticky", "slide-down");
//   }
// });

// const sections = document.querySelectorAll("section");

// const revealSection = () => {
//   sections.forEach((section) => {
//     const sectionTop = section.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight;

//     if (sectionTop < windowHeight - 100) {
//       section.classList.add("active");
//     } else {
//       section.classList.remove("active");
//     }
//   });
// };

// window.addEventListener("scroll", revealSection);

// // JavaScript for Smooth Scrolling:

// document.querySelectorAll("nav .menu a").forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();
//     const targetId = link.getAttribute("href").substring(1);
//     const targetSection = document.getElementById(targetId);

//     window.scrollTo({
//       top: targetSection.offsetTop - 70, // Adjust for sticky navbar
//       behavior: "smooth",
//     });
//   });
// });

// AOS.init({
//   duration: 1000, // Animation duration in ms
//   once: true,     // Trigger animation only once
// });

// Highlight the active menu item on scroll
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar ul.menu li a");

  function setActiveSection() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    // Remove 'active' class from all links and add to the current section
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);
});


document.addEventListener("DOMContentLoaded", () => {
  const navbarLinks = document.querySelectorAll(".navbar a");
  const overlay = document.createElement("div");

  // Create overlay and append to the body
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Show overlay
      overlay.classList.add("active");

      // Scroll to section after animation ends
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      setTimeout(() => {
        // Smooth scroll
        window.scrollTo({
          top: targetSection.offsetTop - 50, // Adjust for fixed navbar
          behavior: "smooth",
        });

        // Remove overlay after scroll
        setTimeout(() => {
          overlay.classList.remove("active");
        }, 500); // Match this with the overlay's transition duration
      }, 700); // Delay scroll to match overlay animation
    });
  });
});

