/**
 * @vitest-environment jsdom
 */
import { describe, expect, beforeEach, test } from 'vitest';
import $ from 'jquery';

describe('Mobilmenü és Navigáció tesztek', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <button class="hamburger-menu"></button>
            <ul class="hamburger-main-menu" style="display: none;">
                <li>
                    <a href="#">Szolgáltatások</a>
                    <ul class="hamburger-submenu" style="display: none;">
                        <li><a href="#">Almenü</a></li>
                    </ul>
                </li>
            </ul>
        `;

        $(".hamburger-menu").on("click", function () {
            $(".hamburger-main-menu").toggle();
            $(this).toggleClass("open");
        });

        $(window).on("resize", function () {
            if (window.innerWidth > 1200) {
                $(".hamburger-main-menu").hide(); 
                $(".hamburger-menu").removeClass("open");
            }
        });
    });

    test('A hamburger menüre kattintva kinyitja a főmenüt és váltja az open classt', () => {
        const $menuBtn = $(".hamburger-menu");

        expect($menuBtn.hasClass("open")).toBe(false);
        $menuBtn.trigger("click");
        expect($menuBtn.hasClass("open")).toBe(true);
    });

    test('Széles képernyőn (resize > 1200px) elrejti a nyitott menüket', () => {
        const $menuBtn = $(".hamburger-menu");
        const $mainMenu = $(".hamburger-main-menu");

        $menuBtn.addClass("open");
        $mainMenu.show();

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1300 });

        $(window).trigger("resize");

        expect($menuBtn.hasClass("open")).toBe(false);
        expect($mainMenu.css("display")).toBe("none");
    });
});