const supportedLanguages = [
    "PHP",
    "JavaScript",
    "C++",
    "C",
    "Java",
    "Dart",
    "Python",
    "Ruby",
    "TypeScript",
];

const selectLang = document.getElementById("selectLang");
supportedLanguages.forEach((l) => {
    const option = document.createElement("option");
    option.value = l.toLowerCase();
    option.innerText = l;
    selectLang.appendChild(option);
});

const divDisplayResult = document.getElementsByClassName("display-results")[0];
let idIntervalLoadingMessage;
window.addEventListener("load", async () => {
    const loadingMessage = document.getElementById("loading-message");
    let numerOfDotsLoadingMessage = 0;
    const maxDots = 5;
    idIntervalLoadingMessage = setInterval(() => {
        loadingMessage.innerHTML = "Carregando";
        for (let i = 0; i < numerOfDotsLoadingMessage; ++i) {
            loadingMessage.innerHTML += ".";
        }
        if (numerOfDotsLoadingMessage >= maxDots) {
            numerOfDotsLoadingMessage = 0;
        } else ++numerOfDotsLoadingMessage;
    }, 500);
    await printResult();
});

const apiURL = "https://imported-playful-backbone.glitch.me";
async function getResult() {
    try {
        return await fetch(apiURL + "/result");
    } catch (err) {
        console.log(err);
    }
}

async function printResult() {
    const res = await getResult();
    const data = await res.json();

    divDisplayResult.innerHTML = "";
    clearInterval(idIntervalLoadingMessage);
    
    data.map((lang) => {
        const li = document.createElement("li");
        li.innerText = `${lang.lang}: ${lang.votes}`;
        divDisplayResult.appendChild(li);
    });
}

const sendButton = document.getElementsByTagName("button")[0];

sendButton.addEventListener("click", async () => {
    const votedLang = selectLang.value;

    if (votedLang == null) return;

    const res = await fetch(apiURL + "/vote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lang: votedLang,
        }),
    });

    if (res.status == 200) {
        console.log("Voto concluido");
        await printResult();
    } else console.log(res.status);
});
