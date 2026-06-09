// Sütik elfogadása ablak

$(document).ready(function() {
  // Ellenőrzés: már elfogadta/elutasította a cookie-kat?
  if (localStorage.getItem("cookieConsent") !== "accepted" && localStorage.getItem("cookieConsent") !== "rejected") {
      $(".modal").show();
  } else {
      $(".modal").hide();
  }

  // "Elfogadom" és "Elutasítom" gombokra kattintás
  $(".btn").on("click", function() {
      // Döntés alapján beállítás a localStorage-ban
      if ($(this).hasClass("active")) {
          localStorage.setItem("cookieConsent", "accepted");
      } else {
          localStorage.setItem("cookieConsent", "rejected");
      }

      // Felugró ablak elrejtése
      $(".modal").hide(500);
  });
});

// A lap tetejére ugrás gomb megjelenítése

$(window).scroll(function () {
    if ($(window).scrollTop() >= 800) {
      $(".to-top").css("display", "block");
    } else {
      $(".to-top").css("display", "none");
    }
});

// A lap tetejére ugrás

$(".to-top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

// Kattintással lenyíló mobilmenü és kinyíló almenü

$(".hamburger-menu").on("click", function () {
    $(".hamburger-main-menu").slideToggle();
    $(this).toggleClass("open");
});

$(".hamburger-main-menu > li:has(.hamburger-submenu) > a").on("click", function (event) {
    event.preventDefault(); 
    $(this).siblings(".hamburger-submenu").slideToggle();
});
   
$(window).on("resize", function () {
    if ($(window).width() > 1200) {
        $(".hamburger-main-menu").hide(); 
        $(".hamburger-submenu").hide(); 
        $(".hamburger-menu").removeClass("open")
    }
});

// Form "elküldve" üzenet megjelenítése

$("#appointmentForm").on("submit", function(send) {
  send.preventDefault();
  let isValid = true;
  $("#appointmentForm input[required]").each(function() {
      if ($(this).val() === "") {
          isValid = false;
          $(this).css("border", "2px solid red");
      } else {
          $(this).css("border", "1px solid #ccc");
      }
  });
  if (isValid) {
      alert("Üzenet elküldve");
  }
});

// Mobil és tablet nézet "hover" klikkelés helyett

$(".service").on("touchstart", function() {
    $(this).css({
      transform: "scale(1.1)",
      boxShadow: "10px 10px 10px white"
    }, 300);
  });

$(".service").on("touchend", function() {
    $(this).css({
      transform: "scale(1)",
      boxShadow: "none"
    }, 300);
});






