import {clock} from "./f/clock";
import {keymap, event_type} from "./f/util";
import {notification} from "./f/notifications";
import "../less/main.less";

window.addEventListener("DOMContentLoaded", () => {
    clock();
    setInterval(clock, 15000);
    notification();
});

keymap.D[event_type] = function () {
    window.location.href = "../index.html";
};
