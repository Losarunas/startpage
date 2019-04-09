class Storage{
    // Put to LS 
    putToLS(val, key){
        if (localStorage.getItem(key) === null) {
                let arr = [];
                arr.push(val)
                let arrStr = JSON.stringify(arr);
                localStorage.setItem(key, arrStr);
            } else {
                let ls = localStorage.getItem(key);
                let lsparse = JSON.parse(ls);
                lsparse.push(val);
                localStorage.setItem(key, JSON.stringify(lsparse));
            }
    }
    
    giveLSVal(key){
        let lsparse = getKeyLS(key);
        return lsparse;
    }
    
    removeVal(val, key){
        let ls = getKeyLS(key);
        console.log(ls);
        
        for(let i = 0; i < ls.length; i++){
             if(val.parentElement.textContent === ls[i]) ls.splice([i], 1);
        }
        localStorage.setItem(key, JSON.stringify(ls));
    }
    
    settings(){
        localStorage.removeItem('settings');
        let arrEl = [];    
    
        const weatherLat = document.querySelector(".weather-lat").value;
        const weahterLon = document.querySelector(".weather-lon").value;
        const randomBg = document.querySelector(".randomBgCheckbox").checked;
        const firstSub = document.querySelector(".first-sub").value;
        const secondSub = document.querySelector(".second-sub").value;
        
        let metricCheckbox;
        if(document.querySelector(".metricCheckbox").checked){
            metricCheckbox = "metric";
        } else {
            metricCheckbox = "imperial";
        }
        
        arrEl.push(weatherLat, weahterLon, randomBg, firstSub, secondSub, metricCheckbox);
        storage.putToLS(arrEl, "settings");
        location.reload();
    }
    
    checkSettings(){
        const settingsLS = storage.giveLSVal("settings");
        // If "settings" empty insert data
        if(settingsLS === null){
            let arr = [12.12, 14.14, false, "quotes", "worldnews", true];
            storage.putToLS(arr, "settings");
        }
    }

}

function getKeyLS(keyLS){
    let ls = localStorage.getItem(keyLS);
    let lsparse = JSON.parse(ls);
    return lsparse;
}