async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function renderData(btn) {
    const data = await fetchData();
    const cards = document.querySelectorAll(".cards");
    cards.forEach((card) => {
        const currentHours = card.childNodes[3].childNodes[3].childNodes[1];
        const lastHours = card.childNodes[3].childNodes[3].childNodes[3];
        const rightCard = data.find(element => element.title === card.getAttribute('id'));

        switch (btn.innerText || "Weekly") {
            case "Daily":
                currentHours.textContent = `${rightCard.timeframes.daily.current}hrs`;
                lastHours.textContent = `Yesterday - ${rightCard.timeframes.daily.previous}hrs`;
                break;
            case "Weekly":
                currentHours.textContent = `${rightCard.timeframes.weekly.current}hrs`;
                lastHours.textContent = `Last Week - ${rightCard.timeframes.weekly.previous}hrs`;
                break;
            case "Monthly":
                currentHours.textContent = `${rightCard.timeframes.monthly.current}hrs`;
                lastHours.textContent = `Last Month - ${rightCard.timeframes.monthly.previous}hrs`;
                break;
        }
    })
}

const switchTabBtns = document.querySelectorAll(".switch-tab-btn");
switchTabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        renderData(btn);
        switchTabBtns.forEach((btn) => {
            btn.classList.remove("text-white");
        })
        switchTabBtns[index].classList.add("text-white", "transition-all");
    })
    switchTabBtns[1].classList.add("text-white");
});

renderData("");