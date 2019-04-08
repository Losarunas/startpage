class Bookmarks {
    
    constructor(bookmarkName, bookmarkLink) {
        this.bookmarkName = bookmarkName;
        this.bookmarkLink = bookmarkLink;
    }
    
    saveBookmarks() {
        localStorage.removeItem('bookmarks');
        let bookmarks = document.querySelectorAll(".bookmark-form");

        for (let bookmark of bookmarks) {
            let bookName = bookmark.querySelector(".bookmark-name");
            let bookLink = bookmark.querySelector(".bookmark-link");

            const bookmarkObj = new Bookmarks(bookName.value, bookLink.value);

            if (localStorage.getItem("bookmarks") === null) {
                let arrBookmarks = [];
                arrBookmarks.push(bookmarkObj)
                let strArrBookmark = JSON.stringify(arrBookmarks);
                localStorage.setItem('bookmarks', strArrBookmark);
            } else {
                let lsparse = getLS();
                lsparse.push(bookmarkObj);
                localStorage.setItem('bookmarks', JSON.stringify(lsparse));
            }
        }
        
        location.reload();
    } 
    
}

function getLS(){
    let ls = localStorage.getItem('bookmarks');
    let lsparse = JSON.parse(ls);
    return lsparse;
}
