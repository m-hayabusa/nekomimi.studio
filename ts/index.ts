import {clock} from "./f/clock";
import {keymap, event_type} from "./f/util";
import {notification} from "./f/notifications";
import "../less/main.less";
import "../less/index.less";

window.addEventListener("DOMContentLoaded", () => {
    /*
     * Try {
     *     counter();
     * } catch (e) {
     *     console.warn(e);
     * }
     */

    clock();
    setInterval(clock, 15000);
    notification(2);
});

keymap.D[event_type] = function () {
    history.back();
};

keymap.C[event_type] = function () {
    location.reload();
};
