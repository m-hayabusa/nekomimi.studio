type notifyes = {
    date: string;
    content: string;
};

function notification(size?: number): void {
    const notifications = document
            .getElementById("notify")
            ?.getElementsByTagName("ul")[0],
        xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                let list: Array<notifyes> = this.response;
                if (size) {
                    list = list.slice(0, -(list.length - size));
                }
                list.forEach((obj, index: number) => {
                    const e = document.createElement("li");
                    e.appendChild(document.createElement("h3")).innerText =
                        obj.date;
                    e.appendChild(document.createElement("p")).innerHTML =
                        obj.content;
                    // E.innerText = obj["title"];
                    if (notifications) {
                        notifications.appendChild(e);
                    }
                });
            }
        }
    };

    xmlHttpRequest.open("GET", "json/notifications.json", true);
    xmlHttpRequest.responseType = "json";
    xmlHttpRequest.send(null);
}

export {notification};
