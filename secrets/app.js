// джерела API
const sourcesAPI = [
  'https://secrets-mars-api.vercel.app/mysteries', 
  'https://secrets-mars-api.onrender.com/mysteries'
];

// обираємо випадкове джерело API
const currentAPI = sourcesAPI[getRandomInt(sourcesAPI.length)];

// запит до API
fetch(currentAPI) 
  .then(response => response.json())
  .then(data => {
        getData(data);
  }).catch(err => console.error(err));

// отримання даних  
function getData(dataMars) {
    addRandomMysteriesToPage(dataMars);
}

// випадкова таємниця
function getRandomInt(max) {
    return Math.floor(Math.random() * max); // 3 -> 0, 1, або 2
}

// функція додавання на сторінку випадкової таємниці
function addRandomMysteriesToPage(obj) {
    let itemMysteryRandom = obj[getRandomInt(obj.length)];
    let classes = ["id-card", "title-card", "missions-card", "location-card", "found-card", "image-card", "mysterium-card", "explanation-card"];

    for (let i = 0; i < classes.length; i++) {
        let currentNameClass = classes[i];
        let currentMystery = document.querySelector(`.${currentNameClass}`); 
        let j = currentNameClass.indexOf('-', 0);
        let item = currentNameClass.slice(0, j);
        let miss = [];
        let contentMystery;
        if (Array.isArray(itemMysteryRandom[item])) {
            for (mission in itemMysteryRandom[item]) {
                let curMission = itemMysteryRandom[item][mission];
                let curMissionName = document.createTextNode(curMission.name);
                let curMissionDate = document.createTextNode(curMission.date);
                miss.push([curMissionName, curMissionDate]);
            }   
        } else {
            contentMystery = document.createTextNode(itemMysteryRandom[item]); 
        }
 
        if (item == "image") {
            let img = document.createElement('img');
            img.src = contentMystery.textContent;   // взяти із Object Text сам Text
            img.style.width = "600px";              // ширина світлини на сторінці
            //img.style.height = "200px";           // висота світлини на сторінці
            currentMystery.appendChild(img);
        } else if (item == "missions") {
            let allMissions = "";
            for (let i = 0; i < miss.length; i++) {
                allMissions += `<p>Назва місії ${i + 1}: ${miss[i][0].textContent} <br>Дата фіксації: ${miss[i][1].textContent}</p>`;
            }
            currentMystery.innerHTML = allMissions;
        } else {
            currentMystery.appendChild(contentMystery);
        }
    }
}
