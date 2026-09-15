/**
 * @vitest-environment jsdom
 */

import { describe, expect, beforeEach, test } from 'vitest';
import $ from 'jquery';
import '../assets/js/scripts';

describe('Lap tetejére ugrás gomb tesztek', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <a href="#" class="to-top" style="opacity: 0; visibility: hidden;">Top</a>
        `;
    });

    test('Görgetés hatására (scrollTop >= 800) láthatóvá válik a gomb', () => {
        const $toTop = $(".to-top");


        expect($toTop.css("opacity")).toBe("0");

        Object.defineProperty(window, 'pageYOffset', { writable: true, configurable: true, value: 900 });
        $(window).trigger("scroll");

        expect($toTop.css("opacity")).toBe("1");
        expect($toTop.css("visibility")).toBe("visible");
    });
});