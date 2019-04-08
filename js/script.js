const ui = new UI;
const bookmarks = new Bookmarks;
const storage = new Storage;

// Check settings from LS
storage.checkSettings();

const settingsVal = storage.giveLSVal("settings");

const redditapi = new Redditapi(settingsVal[0][3], settingsVal[0][4]);

// Get cordinates from LS
const weatherapi = new Weatherapi(settingsVal[0][0], settingsVal[0][1], settingsVal[0][5]);

ui.randomBg(settingsVal[0][2]);

// Clock
ui.getClockTime();
setInterval(ui.getClockTime, 1000);



// Reddit API

redditapi.getData()
    .then(data => {
        ui.getRandomQuote(data.firstSub.data.children[0].data.title);
        ui.sideNav(data.secondSub.data.children);
    })
    .catch((e) => {
    document.querySelector(".random-quote").innerHTML = `Reddit API FAILED: ${e}`;
    document.querySelector(".news-api").innerHTML = `Reddit API FAILED: ${e}`;
    ui.errorMsg(`Reddit API: ${e}`, "red", 4000);
});

// Weather API

weatherapi.getWeather()
    .then(data => {
        ui.paintWeather(data, settingsVal[0][5]);
    })
    .catch((e) => {
    document.querySelector(".city-info-child").innerHTML = `Weather api error: ${e}`;
    ui.errorMsg(`Weather API: ${e}`, "red", 4000);
});

ui.paintBookmarks(storage.giveLSVal(bookmarks));
ui.paintToDos(storage.giveLSVal(bookmarks));



// Search input
let searchYoutube = false;
document.querySelector(".search-net").addEventListener("keyup", function (e) {

    let search = document.querySelector(".search-net");
    
    // Check if user want results from youtube
    if (search.value === "y/") {
        search.value = '';
        searchYoutube = true;
        search.placeholder = "Youtube";
    }
    document.querySelector(".search-input").addEventListener("submit", function (e) {
        if (searchYoutube) {
            console.log(searchYoutube);
            window.location = `https://www.youtube.com/results?search_query=${search.value}`;
        } else {
            window.location = `https://www.google.com/search?q=${search.value}`;
        }
        e.preventDefault();
    });

    e.preventDefault();
});

// Todo input
document.querySelector(".add-todo").addEventListener("submit", function (e) {
    let todo = document.querySelector(".todo-input");
    ui.addToDo(todo.value);
    storage.putToLS(todo.value, "todos");
    todo.value = '';
    e.preventDefault();
})

// Settings MODAL
document.querySelector(".settings").addEventListener("click", () => {
    
    // Create MODAL
    ui.createModal("settings");
    
    // GET CORDINATES BUTTON
    document.querySelector(".find-location").addEventListener("click", () =>{
        if (navigator.geolocation){
            navigator.geolocation.watchPosition((position) => {
                document.querySelector(".weather-lat").value = position.coords.latitude.toFixed(2); 
                document.querySelector(".weather-lon").value = position.coords.longitude.toFixed(2);
            });
        }
    });
    
    // SAVE SETTINGS
    document.querySelector(".save-settings").addEventListener("click", storage.settings)
});

// Bookmarks MODAL
document.querySelector(".add").addEventListener("click", () => {
    ui.createModal("add");
    document.querySelector(".save-bookmarks").addEventListener("click", bookmarks.saveBookmarks);
});

// Remove TODO
document.querySelector(".todos").addEventListener("click", (e) =>{
    if(e.target.classList.contains('remove-todo')) {
        ui.removeTodo(e.target);
        storage.removeVal(e.target, "todos");
    }
});

document.querySelector(".update-weather").addEventListener("click", () => location.reload());
