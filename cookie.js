"use strict";

var cps = 0;
var total = 0;
var auto_clickers = 0;
var super_clickers = 0;
var price_clicker = 10;
var price_super = 100;

function auto_cookies(){
    total+=cps;
    document.getElementById('total').innerHTML = Math.floor(total);
    console.log(auto_clickers, 'generated', cps);
}

function click_cookie(){
    total++;
    console.log(Math.floor(total));
    document.getElementById('total').innerHTML = Math.floor(total);
}

function buy_clicker(){
    if(total >= price_clicker){
        auto_clickers++;
        total-=price_clicker;
        console.log(total);
        cps+=.1;
        price_clicker = Math.floor(price_clicker*1.2);
        document.getElementById('auto_cost').innerHTML = price_clicker;
        document.getElementById('clickers').innerHTML = auto_clickers;
        document.getElementById('total').innerHTML = Math.floor(total);
    }
    else{
        console.log('Not enough cookies!');
    }
}

function buy_super(){
    if(total >= price_super){
        super_clickers++;
        total-=price_super;
        console.log(total);
        cps+=5;
        price_super = Math.floor(price_super*1.2);
        document.getElementById('super_cost').innerHTML = price_super;
        document.getElementById('supers').innerHTML = super_clickers;
        document.getElementById('total').innerHTML = Math.floor(total);
    }
    else{
        console.log('Not enough cookies!');
    }
}

function save_state(){
    let state = {"total":total, "auto_clickers":auto_clickers,
     "super_clickers":super_clickers, "price_super":price_super,
     "price_clicker":price_clicker, "cps":cps};
    console.log(cps);
    localStorage.setItem('dickclickerstate', JSON.stringify(state));
    
    console.log('state saved')

}

function getCookie(cname) {
/*
    Not mine: Credit to w3schools.com/js/js_cookies.asp
*/
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function delete_state(){
    localStorage.removeItem('dickclickerstate');
}

function harambe_hit(){
    document.getElementById("Harambe").src = "Harambe_hit.png";
    setTimeout(function(){
        document.getElementById("Harambe").src = "Harambe.jpg";
    }, 200);
}

function sleep(){
    return;
}

function main(){
    var state = JSON.parse(localStorage.getItem('dickclickerstate'));
    if(state){
        total = state["total"];
        super_clickers = state["super_clickers"];
        price_super = state["price_super"];
        auto_clickers = state["auto_clickers"];
        price_clicker = state["price_clicker"];
        cps = state["cps"];
    }
    document.getElementById('total').innerHTML = Math.floor(total);
    document.getElementById('clickers').innerHTML = auto_clickers;
    document.getElementById('supers').innerHTML = super_clickers;
    document.getElementById('auto_cost').innerHTML = price_clicker;
    document.getElementById('super_cost').innerHTML = price_super;
    window.setInterval(auto_cookies, 1000);
    window.setInterval(save_state, 10000);
}