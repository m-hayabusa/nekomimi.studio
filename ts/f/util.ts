/*
 * Const keypad = {
 *     center: <HTMLButtonElement> document.getElementById("keypad_center"),
 *     up:     <HTMLButtonElement> document.getElementById("keypad_up"),
 *     down:   <HTMLButtonElement> document.getElementById("keypad_down"),
 *     right:  <HTMLButtonElement> document.getElementById("keypad_right"),
 *     left:   <HTMLButtonElement> document.getElementById("keypad_left"),
 *     A:   <HTMLButtonElement> document.getElementById("keypad_mail"),
 *     B:   <HTMLButtonElement> document.getElementById("keypad_menu"),
 *     C:   <HTMLButtonElement> document.getElementById("keypad_internet"),
 *     D:   <HTMLButtonElement> document.getElementById("keypad_ch"),
 * };
 */

const event_type = "ontouchend" in document ? "ontouchend" : "onclick",
    keymap = {
        center: <HTMLButtonElement>document.getElementById("footer_button_0"),

        /*
         * Up:     <HTMLButtonElement> document.getElementById("keypad_up"),
         * down:   <HTMLButtonElement> document.getElementById("keypad_down"),
         * right:  <HTMLButtonElement> document.getElementById("keypad_right"),
         * left:   <HTMLButtonElement> document.getElementById("keypad_left"),
         */
        A: <HTMLButtonElement>document.getElementById("footer_button_1"),
        B: <HTMLButtonElement>document.getElementById("footer_button_2"),
        C: <HTMLButtonElement>document.getElementById("footer_button_3"),
        D: <HTMLButtonElement>document.getElementById("footer_button_4"),

        /*
         * A:   <HTMLButtonElement> document.getElementById("hardware_key_1"),
         * b:   <HTMLButtonElement> document.getElementById("hardware_key_2"),
         * c:   <HTMLButtonElement> document.getElementById("hardware_key_3"),
         */
    },
    /*
     * Keymap.b[event_type] = function () {
     *     History.back();
     * };
     */

    line_height: number = (() => {
        const e = document.getElementById("line_height");
        if (e) {
            return e.clientHeight;
        }
        return 32;
    })();

function getParam(name: string): string | boolean {
    const url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
    if (!results) {
        return false;
    }
    if (!results[2]) {
        return true;
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
export {keymap, event_type, line_height, getParam};
