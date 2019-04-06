class UI {
    constructor() {
        this.sideNavElements = 4;
        this.randomQuote = document.querySelector(".random-quote");
        this.newsList = document.querySelector(".news-list");
        this.location = document.querySelector(".city-location");
        this.cityLastUpdate = document.querySelector(".city-last-update");
        this.sunrise = document.querySelector(".sunrise");
        this.sunset = document.querySelector(".sunset");
        this.weatherTemp = document.querySelector(".weather-info");
        this.cityMain = document.querySelector(".city-main");
        this.weatherImg = document.querySelector(".weather-img");
        this.cityPressure = document.querySelector(".city-pressure");
        this.cityHumidity = document.querySelector(".city-humidity");
        this.windDeg = document.querySelector(".wind-deg");
        this.windSpeed = document.querySelector(".wind-speed");
        this.todoList = document.querySelector(".todos-list");
        this.element = '';
    }

    getClockTime() {
        let now = new Date();
        let cd = convertDate(now);
        let day = now.getDay();
        let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let timeString = cd.hour + ':' + cd.minute;
        document.querySelector(".time").innerHTML = timeString;
        document.querySelector(".week-day").innerHTML = weekDays[day];
    }

    getRandomQuote(quote) {
        let output = '';
        output = quote;
        this.randomQuote.innerHTML = quote;
    }

    sideNav(data) {
        let output = '';
        for (let i = 0; i < this.sideNavElements; i++) {
            output += `<li>
            <a href="https://www.reddit.com${data[i].data.permalink}">${data[i].data.title}</a>
            </li>
            `
        }
        this.newsList.innerHTML = output;
    }

    paintWeather(data) {
        this.location.innerHTML = `${data.name}, ${data.sys.country}`;
        this.cityLastUpdate.innerHTML = `${unixConvert(data.dt)}`;
        this.sunrise.innerHTML = `${unixConvert(data.sys.sunrise)}`;
        this.sunset.innerHTML = `${unixConvert(data.sys.sunset)}`;
        this.weatherTemp.innerHTML = `${Math.round(data.main.temp)}`;
        this.cityMain.innerHTML = `${data.weather[0].main}`;
        this.weatherImg.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        this.cityPressure.innerHTML = `${Math.round(data.main.pressure)} hPa`;
        this.cityHumidity.innerHTML = `${data.main.humidity} %`;
        this.windDeg.innerHTML = `${convDeg(data.wind.deg)}`;
        this.windSpeed.innerHTML = `${Math.round(data.wind.speed)}`;
    }

    addToDo(val) {
        let li = document.createElement("li");
        let todo = document.createTextNode(val);
        li.appendChild(todo);

        let i = document.createElement("i");
        i.classList.add('fas', 'fa-trash-alt', 'remove-todo');
        li.appendChild(i);

        this.todoList.appendChild(li);
    }

    createModal(fn) {
        let node = document.querySelector(".modal-content-info");
        let modalBottom = document.querySelector(".modal-buttons");
        let modalCont = document.querySelector(".modal-content");
        let modal = document.querySelector('.modal');
        let close = document.querySelector(".close");
        let modalType = document.querySelector(".modal-type");


        // Remove all el in modal
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        while (modalBottom.firstChild) {
            modalBottom.removeChild(modalBottom.firstChild);
        }

        // Create SETTINGS MODAL
        if (fn === "settings") {
            let output = '';
            modalType.innerHTML = "Settings";
            
            
            output += `<div class="row">
                <div class="entry">Location</div>
                
                </div>`;
            
            node.innerHTML = output;
        }
  
        // Create BOOKMARKS MODAL
        if (fn === "add") {

            // Create vars
            let output = '';
            let buttons = '';

            modalType.innerHTML = "Bookmarks";



            // Show Bookmarks FROM LS
            if (localStorage.getItem('bookmarks')) {
                const allbookmarks = storage.giveLSVal("bookmarks");
                allbookmarks.map(e => {
                    output += `<form action="#" class="bookmark-form" draggable="true">
            <input class="bookmark-name" type="text" placeholder="Name" value="${e.bookmarkName}">
            <input class="bookmark-link" type="text" placeholder="Link" value="${e.bookmarkLink}">
            <div class="remove-bookmark">
            <i class="fas fa-trash-alt modal-remove-bookmark"></i></div>
            </form>`;
                });

                // IF LS item NOT FOUND create new example
            } else {
                output += `<form action="#" class="bookmark-form" draggable="true">
            <input class="bookmark-name" type="text" placeholder="Name" value="Youtube">
            <input class="bookmark-link" type="text" placeholder="Link" value="www.youtube.com">
            <div class="remove-bookmark">
            <i class="fas fa-trash-alt modal-remove-bookmark"></i></div>
            </form>`;
            }

            node.innerHTML = output;


            // Add buttons in modal
            buttons += `<hr>
                    <i class="fas fa-plus add-new-bookmark"></i>
                    <i class="far fa-save save-bookmarks"></i>`;
            modalBottom.innerHTML = buttons;

            
            // Add new bookmark event
            document.querySelector(".add-new-bookmark").addEventListener("click", createBookmark);
            
            // Remove Bookmark
            let removeBookmarks = document.querySelectorAll(".modal-remove-bookmark");
            for (const remBook of removeBookmarks) {
                remBook.addEventListener("click", (e) => removeBookmark(e));
            }

            // drag and drop
            //            const bookmarks = document.querySelectorAll(".bookmark-form");
            //            for (const bookmark of bookmarks) {
            //                bookmark.addEventListener('dragstart', dragStart);
            //                bookmark.addEventListener('dragend', dragEnd);
            //                for (const allbookmark of bookmarks) {
            //                    allbookmark.addEventListener('dragover', dragOver);
            //                    allbookmark.addEventListener('dragenter', dragEnter);
            //                    allbookmark.addEventListener('dragleave', dragLeave);
            //                    allbookmark.addEventListener('drop', dragDrop);
            //                }
            //            }
        };

        // Show, close modal
        modal.style.display = "block";
        document.querySelector(".close").addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (e) => {
            if (e.target == modal) modal.style.display = "none";
        });

    }
    // END CREATEMODAL

    paintBookmarks(info) {
        let output = '';
        let node = document.querySelector(".bookmarks");

        if (localStorage.getItem('bookmarks')) {
            const allbookmarks = storage.giveLSVal("bookmarks");
            allbookmarks.map(e => {
                if (e.bookmarkLink === '') {
                    output += `<li class="no-link">${e.bookmarkName}</a></li>`;
                } else {
                    output += `<li><a href="http://${e.bookmarkLink}">${e.bookmarkName}</a></li>`;
                }

            });

        } else {
            console.log("LS empty");
        }
        node.innerHTML = output;
    }

    paintToDos(val) {
        const storage = new Storage;
        let output = '';
        let node = document.querySelector(".todos-list");
        const allTodos = storage.giveLSVal("todos")
        if (localStorage.getItem('todos')) {
            allTodos.map(e => {
                output += `<li>${e}<i class="fas fa-trash-alt remove-todo"></i></li>`;
            });
        } else {
            console.log("empty");
        }

        node.innerHTML += output;
    }

    removeTodo(target) {
        target.parentElement.remove();
    }

}
// END CLASS




// Add new bookmark
function createBookmark() {
    let output = '';
    let node = document.querySelector(".modal-content-info");
    output += `<form action="#" class="bookmark-form" draggable="true">
            <input class="bookmark-name" type="text" placeholder="Name">
            <input class="bookmark-link" type="text" placeholder="Link">
            <div class="remove-bookmark modal-remove-bookmark">
            <i class="fas fa-trash-alt"></i></div>
            </form>`;
    node.innerHTML += output;
}

function removeBookmark(el) {
    el.target.parentElement.parentElement.remove();
}

function unixConvert(unixDate) {
    let date = new Date(unixDate * 1000);
    let cd = convertDate(date);
    let hm = cd.hour + ':' + cd.minute;
    return hm;
}

function convertDate(time) {
    let hour = time.getHours();
    let minute = time.getMinutes();
    if (hour == 0) {
        hour = 12;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return {
        hour,
        minute
    }
}

function convDeg(deg) {
    let windDir = '';
    console.log(deg);
    switch (true) {
        case (deg < 22.5):
            windDir = "N";
            break;
        case (deg < 67.5):
            windDir = "NE";
            break;
        case (deg < 112.5):
            windDir = "E";
            break;
        case (deg < 157.5):
            windDir = "SE";
            break;
        case (deg < 202.5):
            windDir = "S";
            break;
        case (deg < 247.5):
            windDir = "SW";
            break;
        case (deg < 292.5):
            windDir = "W";
            break;
        case (deg < 337.5):
            windDir = "W";
            break;
        default:
            windDir = "N";
    }
    return windDir;
}

// DRAG AND DROP  IN PROGRESS

//let a = '';
//let b = '';
//function dragStart() {
//    this.classList.add('hold');
//    a = this.innerHTML;
//    console.log("start");
//    setTimeout(() => (this.classnName = 'invisible', 0));
//}
//
//function dragEnd() {
//    this.classList.remove('invisible');
//    console.log("end");
//}
//
//function dragOver(e) {
//    e.preventDefault();
//}
//
//function dragEnter(e) {
//    e.preventDefault();
//    this.classList.toggle('hovered');
//    b = this;
//    console.log(this);
//    console.log("enter");
//}
//
//function dragLeave() {
//    this.classList.remove('hovered');
//    console.log("leave");
//    b = '';
//}
//
//function dragDrop() {
//    console.log(this.innerHTML);
//    this.innerHTML = a;
//
//}
