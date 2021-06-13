import {keymap} from "./util";

const isMenuOpen = false;
function toggle_menu() {
    if (isMenuOpen) {
    } else {
    }
}

keymap.A.onclick = toggle_menu;
keymap.A.ontouchend = toggle_menu;
keymap.A.onkeydown = toggle_menu;
