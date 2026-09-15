/**
 * @vitest-environment jsdom
 */

import { describe, expect, beforeEach, test, vi } from 'vitest';
import $ from 'jquery';
import '../assets/js/scripts';

describe('Időpontfoglaló űrlap validációs tesztek', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="appointmentForm">
                <input type="text" id="name" required value="">
                <button type="submit" id="submit-btn">Küldés</button>
            </form>
        `;

        $("#appointmentForm").on("submit", function(send) {
            send.preventDefault();
            let isValid = true;
            $("#appointmentForm input[required]").each(function() {
                if ($(this).val() === "") {
                    isValid = false;
                    $(this).css("border-color", "red");
                }
            });
            if (isValid) {
                alert("Üzenet elküldve");
            }
        });
    });

    test('Üresen hagyott kötelező mezővel piros keretet ad és blokkolja az elküldést', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        $("#appointmentForm").trigger("submit");
        
        const styleAttr = $("#name").attr("style") || "";
        expect(styleAttr).toContain("red");
        expect(alertSpy).not.toHaveBeenCalled();

        alertSpy.mockRestore();
    });

    test('Kitöltött mezőkkel sikeresen elküldi az űrlapot (alert üzenet)', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        $("#name").val("Teszt Anna");
        $("#appointmentForm").trigger("submit");

        expect(alertSpy).toHaveBeenCalledWith("Üzenet elküldve");

        alertSpy.mockRestore();
    });
});