const ui = new UI;
const redditapi = new Redditapi;
const bookmarks = new Bookmarks;
const storage = new Storage;
const weatherapi = new Weatherapi(55.25, 22.28, "metric");

// Clock
ui.getClockTime();
setInterval(ui.getClockTime, 1000);


// Reddit API

redditapi.getData()
    .then(data => {
        ui.getRandomQuote(data.firstSub.data.children[0].data.title);
        ui.sideNav(data.secondSub.data.children);
    });

// Weather API

weatherapi.getWeather()
    .then(data => {
        console.log(data);
        ui.paintWeather(data);
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
    ui.createModal("settings");
});

// Bookmarks MODAL
document.querySelector(".add").addEventListener("click", () => {
    ui.createModal("add");
    document.querySelector(".save-bookmarks").addEventListener("click", bookmarks.saveBookmarks);
});

// Remove TODO
let removeToDo = document.querySelectorAll(".remove-todo");
    for (const remTodo of removeToDo) {
        remTodo.addEventListener("click", (e) => {
            ui.removeTodo(e.target);
            storage.removeVal(e.target, "todos");
        });
    }

document.querySelector(".update-weather").addEventListener("click", () => location.reload());




