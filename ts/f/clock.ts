function clock(): void {
    const date: Date = new Date(Date.now());

    for (let i = 1; i < 5; i++) {
        const time = (`00${date.getHours()}`.slice(-2) +
                `00${date.getMinutes()}`.slice(-2))[i - 1],
            element: HTMLImageElement = <HTMLImageElement>(
                document.getElementById(`clock_${i}`)
            );
        element.src = `img/num/num000${time}.png`;
    }
}

export {clock};
