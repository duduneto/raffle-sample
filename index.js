const dataSample = [{
    "name": "Lorrie"
}, {
    "name": "Libbie"
}, {
    "name": "Juan"
}, {
    "name": "Steffi"
}, {
    "name": "Rycca"
}, {
    "name": "Gray"
}, {
    "name": "Davina"
}, {
    "name": "Joana"
}, {
    "name": "Alexis"
}, {
    "name": "Normie"
}, {
    "name": "Igor"
}, {
    "name": "Shelley"
}, {
    "name": "Alvan"
}, {
    "name": "Karin"
}, {
    "name": "Leoine"
}, {
    "name": "Sephira"
}, {
    "name": "Chrisy"
}, {
    "name": "Ade"
}, {
    "name": "Frederica"
}, {
    "name": "Adamo"
}, {
    "name": "Meggie"
}, {
    "name": "Leo"
}, {
    "name": "Jesus"
}, {
    "name": "Clemence"
}, {
    "name": "Humbert"
}];

const itemDisplay = document.querySelector("#item-display");
const submitBtn = document.querySelector("#submit-btn");

let canShuffle = false;
const timeManaging = {
    startedAt: 0,
    finishedAt: 0,
};
let passedTime = 0;
let totalTime = 0;

const speedsRatio = {
    begin: {
        percentage: 0.4,
        duration: 30,
    },
    mid: {
        percentage: 0.6,
        duration: 80,
    },
    late: {
        percentage: 0.8,
        duration: 160,
    },
    end: {
        percentage: 0.9,
        duration: 300,
    },
};

const speedsRatioArr = Object.values(speedsRatio);

// If you wanna customize how it print, change this function below
function printItem(itemName) {
    const element = document.createElement("h2");
    element.innerHTML = itemName;
    itemDisplay.removeChild(itemDisplay.lastChild)
    itemDisplay.append(element)
};

function resetParams() {
    timeManaging.startedAt = 0;
    timeManaging.finishedAt = 0;
    canShuffle = false;
    passedTime = 0;
    totalTime = 0;
    submitBtn.innerHTML = 'Play'

}

function getItemRandomly() {
    // Check the lenght
    const indexItem = Math.floor(Math.random() * dataSample.length - 1);
    const foundItem = dataSample.find((_, index) => index === indexItem);
    if (indexItem > 0) {
        return foundItem
    } else {
        return getItemRandomly();
    }
};

function getDecreasingDuration() {
    const foundDuration = speedsRatioArr.find((item) => item.percentage > passedTime / totalTime);
    if (foundDuration) {
        return foundDuration.duration
    } else {
        canShuffle = false
    }
}

function startRaffle() {
    const foundItem = getItemRandomly();
    printItem(foundItem.name);
    canShuffle = true;
    const duration = getDecreasingDuration()
    setTimeout(() => {
        if (canShuffle) {
            startRaffle();
            passedTime += duration;
        } else {
            resetParams();
        }
    }, duration);

};

document.querySelector("#raffle").addEventListener('submit', (event) => {
    event.preventDefault();
    if (canShuffle) {
        resetParams()
    } else {
        totalTime = event.target.time.value * 1000;

        timeManaging.startedAt = new Date().getTime();
        timeManaging.finishedAt = new Date().getTime() + totalTime;
        submitBtn.innerHTML = 'Stop'

        startRaffle();
    }
})
