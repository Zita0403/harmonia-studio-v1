import $ from 'jquery';
// Sütik elfogadása ablak
export function initCookieConsent(storage, modalSelector) {
    // Ellenőrzés: már elfogadta/elutasította a cookie-kat?
    if (storage.getItem("cookieConsent") !== "accepted" && storage.getItem("cookieConsent") !== "rejected") {
        modalSelector.show();
    } else {
        modalSelector.hide();
    }

    // "Elfogadom" és "Elutasítom" gombokra kattintás
    $("#accept-cookies").on("click", function() {
        storage.setItem("cookieConsent", "accepted");
        modalSelector.hide(500);
        // modalSelector.hide(); // Teszteléshez
    });

    $("#reject-cookies").on("click", function() {
        storage.setItem("cookieConsent", "rejected");
        modalSelector.hide(500);
        // modalSelector.hide(); // Teszteléshez
    });
}

$(document).ready(function() {
    initCookieConsent(localStorage, $(".modal"));
});

// A lap tetejére ugrás gomb megjelenítése
$(window).scroll(function () {
    if ($(window).scrollTop() >= 800) {
      $(".to-top").css({"opacity": "1", "visibility": "visible"});
    } else {
      $(".to-top").css({"opacity": "0", "visibility": "hidden"});
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