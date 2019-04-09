class Bookmarks {
    
    constructor(bookmarkName, bookmarkLink) {
        this.bookmarkName = bookmarkName;
        this.bookmarkLink = bookmarkLink;
    }
    
    // Save bookmarks to LS
    saveBookmarks() {
        localStorage.removeItem('bookmarks');
        let bookmarks = document.querySelectorAll(".bookmark-form");

        for (let bookmark of bookmarks) {
            let bookName = bookmark.querySelector(".bookmark-name");
            let bookLink = bookmark.querySelector(".bookmark-link");
            
            // Check if link starts with http://
            let bookLinkFix = bookLink.value;
            if(bookLink.value.startsWith("http://")) bookLinkFix = bookLink.value.slice(7);

            const bookmarkObj = new Bookmarks(bookName.value, bookLinkFix);

            if (localStorage.getItem("bookmarks") === null) {
                let arrBookmarks = [];
                arrBookmarks.push(bookmarkObj)
                let strArrBookmark = JSON.stringify(arrBookmarks);
                localStorage.setItem('bookmarks', strArrBookmark);
            } else {
                let ls = localStorage.getItem('bookmarks');
                let lsparse = JSON.parse(ls);;
                lsparse.push(bookmarkObj);
                localStorage.setItem('bookmarks', JSON.stringify(lsparse));
            }
        }
        
        location.reload();
    } 
    
}
