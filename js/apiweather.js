class Weatherapi {
    constructor(lat, lon, format){
        this.lat = lat;
        this.lon = lon;
        this.format = format;
        this.appid = 'b6907d289e10d714a6e88b30761fae22';
    }
    async getWeather(){
        const res = await fetch (`https://openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.appid}&units=${this.format}`);
        const resData = await res.json();
        return resData;
    }
    
    
}