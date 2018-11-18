export const getTempretureDisplayColor = (temperature)=>{
    let tempStyle;
    if (temperature >= 90){
        tempStyle = 'alert-danger';
    }
    else if (temperature >= 80){
        tempStyle = 'alert-warn';
    }
    else if (temperature >= 60){
        tempStyle = 'alert-success';
    }            
    else {
        tempStyle = 'alert-info';
    }
    return tempStyle
}

export const getTrafficDisplayColor = (trafficDelay)=>{
    let delayStyle;
    if (trafficDelay > 20){
        delayStyle = 'badge badge-danger';
    }
    else if (trafficDelay > 10){
        delayStyle = 'badge badge-warning';
    }
    else if (trafficDelay > 5){
        delayStyle = 'badge badge-info';
    }
    else {
        delayStyle = 'badge badge-success';
    }   
    return delayStyle
}

export const getAirQualityDisplayColor = (pm25Value) =>{
    let aqiStyle;
    if (pm25Value > 200){
        aqiStyle = 'badge badge-danger';
    }
    else if (pm25Value > 100){
        aqiStyle = 'badge badge-warning';
    }
    else if (pm25Value > 50){
        aqiStyle = 'badge badge-info';
    }
    else {
        aqiStyle = 'badge badge-success';
    }   
    return aqiStyle;
}