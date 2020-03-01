function randBool(){
    let bit = Math.floor(Math.random() * 2);
    return Boolean(bit);
}

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function vList(object){
    return Object.values(object);
}