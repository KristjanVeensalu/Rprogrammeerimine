const utils = require("./utils.js");

/**
 * Task 1
 *
 * Use case:
 *
 * Kasutaja sisestab väärtusi vormi väljadesse. Igal väljal on piirangud,
 * mis andmeid sinna võib sisestada.
 *
 * Realiseeri funktsioon, mis kontrollib numbri välja valiidsust.
 *
 * @param precision - Defineerib, kui  palju numbreid võib sisestatud väärtuses maksimaalselt olla.
 * @param scale - Defineerib, kui palju numbreid võib olla maksimaalselt pärast koma
 *
 * Vaata teste näidete jaoks.
 */
const isNumberValid = (inputString, { precision = 9, scale = 0 }) => {
    //Check if input is a number or string
    if(isNaN(inputString)){
        return false;
    }

    let precisionCheck = false;
    let scaleCheck = false;
    let check = String(inputString);
    if(check.length-1 <= precision){
        precisionCheck = true;
    }

    check = check.split(".");
    if(check[1] != null){
        if(check[1].length <= scale){
            scaleCheck = true;
        }
    }else{
        if(scale == 0){
            scaleCheck = true;
        }else{
            scaleCheck = false;
        }
    }
    if(precisionCheck && scaleCheck){
        return true;
    }else{
        return false;
    }

};

utils.test(isNumberValid("200.345", {}), false); // scale default value is 0
utils.test(isNumberValid("200.345", { scale: 10 }), true);
utils.test(isNumberValid("200.345", { precision: 3, scale: 10 }), false);
utils.test(isNumberValid("200", { scale: 0 }), true);
utils.test(isNumberValid("200.not", { scale: 0 }), false); // not a number
utils.test(isNumberValid("0", {}), true);
utils.test(isNumberValid("10.32", { scale: 1 }), false);
utils.test(isNumberValid("10.32", { scale: 3 }), true);
utils.test(isNumberValid("10.", { scale: 3 }), false); // not a number

/**
 * Task 2
 *
 * Realiseeri funktsioon, millel on 3 parameetrit: "a", "b", "cb".
 *
 * Esimesed kaks parameetrit on numbrid ja viimane parameeter on funktsioon, kutsume seda "callback".
 *
 * Funktsioon peab kutsuma välja callback funktsiooni, mille argumendiks on antud "a" ja "b" summa.
 *
 * Vaata teste näidete jaoks.
 *
 */
const sumCallback = (a, b, callback) => {
    let sum = a + b;
    return callback(sum);
};

/**
 * Utility function. Don't change me!
 */
function myCallback(x) {
    return "hello-" + x;
}

utils.test(sumCallback(2, 3, myCallback), "hello-5");
utils.test(sumCallback(0, -2, myCallback), "hello--2");

/**
 * Task 3
 *
 * Realiseeri funktsioon, mis liidab 2 numbrit kokku. Funktsioon peaks nägema välja midagi sellist.
 *
 * add(2)(3) // returns 5
 * add(0)(0) // return 0
 *
 * ehk argumendid peavad olema erinevates sulgudes.
 *
 */
const add = (x) => {
    function b(y){
        return(x + y);
    }

    return b;
};

try {
    utils.test(add(2)(3), 5);
    utils.test(add(0)(0), 0);
}
catch (e) {
    console.log("FAIL: implement task 3")
}