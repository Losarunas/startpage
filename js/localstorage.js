class Storage{
    constructor(val, keyLS) {
        this.val = val;
        this.keyLS = keyLS;
    }
    
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
        
    }
    
}

function getKeyLS(keyLS){
    let ls = localStorage.getItem(keyLS);
    let lsparse = JSON.parse(ls);
    return lsparse;
}