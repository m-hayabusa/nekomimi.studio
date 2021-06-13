import {clock} from "./f/clock";
import {event_type, getParam, keymap} from "./f/util";
import "../less/main.less";
import "../less/music.less";

window.addEventListener("DOMContentLoaded", () => {
    clock();
    setInterval(clock, 15000);

    const json_url = <string>getParam("playlist"),
        xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                audio(
                    this.response,
                    parseInt(getParam("head").toString()),
                    Boolean(getParam("autoplay"))
                );
            }
        }
    };

    xmlHttpRequest.open("GET", json_url, true);
    xmlHttpRequest.responseType = "json";
    xmlHttpRequest.send(null);
});

type playlist_content = {
    title: string;
    url: string;
};

function audio(list: Array<playlist_content>, playing = 0, autoplay = false) {
    const player = <HTMLAudioElement>document.getElementById("audio");
    if (!playing) {
        playing = 0;
    }

    // 曲目表示
    const nextup = <HTMLElement>document.getElementById("nextup");
    list.forEach((obj: playlist_content, index: number) => {
        const e = document.createElement("span");
        e.className = "span";
        e.innerText = obj.title;
        e.onclick = function () {
            playing = index;
            load_snd(index);
            play();
        };

        /*
         * SetTimeout(() => {
         *     setInterval(() => {
         *         e.scrollBy({
         *             top: 0,
         *             left: 32, // これ決め打ちだとよくない 1em (小さい画面でずれるはず)
         *             behavior: 'auto'
         *         });
         *     },500);
         * }, 2000);
         */

        nextup
            .appendChild(document.createElement("li"))
            .appendChild(e)
            .scrollTo(0, 0);
    });

    // ロードしてちょっとしてから曲名表示にする
    setTimeout(() => {
        updateInfo(playing);
    }, 1000);

    // 画面表示回りの関数

    player.onpause = function () {
        updateStatus(0);
        if (player.ended && autoplay && playing < list.length) {
            console.log(playing);
            playing += 1;
            console.log(playing);
            load_snd(playing);
            play();
        }
    };

    player.onplay = function () {
        updateStatus(1);
    };

    const duration = <HTMLElement>document.getElementById("duration");
    player.ontimeupdate = function () {
        duration.innerHTML = `${Math.round(player.currentTime)} / ${Math.round(
            player.duration
        )} s`;
    };

    const title = <HTMLElement>document.getElementById("title"),
        track = <HTMLElement>document.getElementById("track_cnt");
    function updateInfo(num: number) {
        title.innerText = `${num + 1}. ${list[num].title}`;
        track.innerText = `${num + 1} / ${list.length} track`;
    }

    function updateStatus(num: number): void {
        const button = <HTMLElement>keymap.center.firstChild,
            image = <HTMLImageElement>document.getElementById("playing");
        switch (num) {
            case 0: // 再生してない
                button.innerText = "再生";
                image.src = "img/Playing_Stop.png";
                break;
            case 1: // 再生してる
                button.innerText = "一時停止";
                image.src = "img/Playing.gif";
                break;
            case 2: // 読み込みしてる
                button.innerText = "読込中";
                image.src = "img/Loading.gif";
                break;
            default:
                console.warn("updateStatus: ", num);
        }
    }

    // 再生・ロード・停止関係の関数

    function load_snd(num: number) {
        console.log(num);
        if (player.src != list[num].url) {
            player.src = list[num].url;
            if (player.readyState === player.HAVE_NOTHING) {
                player.load();
            }
        }

        player.oncanplaythrough = function () {
            updateStatus(0);
        };

        updateInfo(num);
    }

    function play() {
        if (player.ended) {
            player.currentTime = 0;
        }

        load_snd(playing);

        if (player.readyState != player.HAVE_ENOUGH_DATA) {
            updateStatus(2);
            // Player.oncanplaythrough = function () {
            player.oncanplay = function () {
                console.log("ok");
                player.play();
                player.oncanplaythrough = null;
            };
        } else {
            player.play();
        }
    }

    function pause() {
        player.pause();
        updateStatus(0);
    }

    /*
     * If (autoplay) { // 最近のブラウザだと自動再生は蹴られる
     *     player.autoplay = true;
     *     load_snd(playing);
     *     play();
     * }
     */

    // キー入力関連

    keymap.center[event_type] = function () {
        if (player.paused) {
            play();
        } else {
            pause();
        }
    };

    keymap.D[event_type] = function () {
        window.location.href = "../index.html";
    };
}
