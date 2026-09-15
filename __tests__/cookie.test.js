/* Teszt indítása előtt a script.js fájból ki kell venni a jQuery animációs késleltetést */
/**
 * @vitest-environment jsdom
 */

import { describe, expect, beforeEach, test, vi } from 'vitest';
import $ from 'jquery';
import { initCookieConsent } from '../assets/js/scripts';

describe('Süti kezelés (Cookie Consent) tesztek', () => {
    
    beforeEach(() => {
        // Vvirtuális HTML teszt környezet (DOM)
        document.body.innerHTML = `
            <div class="modal" style="display: none;"></div>
            <button id="accept-cookies"></button>
            <button id="reject-cookies"></button>
        `;
        // Hívások és a tárhely előzmények törlése
        vi.clearAllMocks();
    });

    test('Megjeleníti a modalt, ha még nincs mentett döntés a localStorage-ban', () => {
        // Csak a tárhely mockolása, null-t ad vissza (nincs még döntés)
        const mockStorage = {
            getItem: vi.fn().mockReturnValue(null),
            setItem: vi.fn()
        };
        
        // Függvény meghívása a mock storage-dzsal és a valódi JSDOM-ban lévő elemmel
        initCookieConsent(mockStorage, $(".modal"));
        
        // Közvetlenül ellenőrzés, hogy látszik-e a modal
        expect($(".modal").css("display")).not.toBe("none");
    });

    test('Elrejti a modalt, ha már van "accepted" döntés', () => {
        // "már elfogadta"
        const mockStorage = {
            getItem: vi.fn().mockReturnValue('accepted'),
            setItem: vi.fn()
        };

        // Alapból látszódjon, hogy kiderüljön eltünteti-e
        $(".modal").show();

        initCookieConsent(mockStorage, $(".modal"));

        expect($(".modal").css("display")).toBe("none");
    });

    test('Az elfogadás gombra kattintva beállítja az "accepted" értéket és elrejti a modalt', () => {

        const mockStorage = {
            getItem: vi.fn().mockReturnValue(null),
            setItem: vi.fn()
        };

        initCookieConsent(mockStorage, $(".modal"));

        // Kezdetben látszik a modal
        $(".modal").show();
        expect($(".modal").css("display")).not.toBe("none");

        $("#accept-cookies").trigger("click");

        expect(mockStorage.setItem).toHaveBeenCalledWith("cookieConsent", "accepted");
        expect($(".modal").css("display")).toBe("none");
    });

    test('Az elutasítás gombra kattintva beállítja a "rejected" értéket és elrejti a modalt', () => {

        const mockStorage = {
            getItem: vi.fn().mockReturnValue(null),
            setItem: vi.fn()
        };

        initCookieConsent(mockStorage, $(".modal"));

        // Kezdetben látszik a modal
        $(".modal").show();
        expect($(".modal").css("display")).not.toBe("none");

        $("#reject-cookies").trigger("click");

        expect(mockStorage.setItem).toHaveBeenCalledWith("cookieConsent", "rejected");
        expect($(".modal").css("display")).toBe("none");
    });
});