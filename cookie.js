/* THINGS TO DO
    -Add more stuff to buy
    -Adjust price increase
    -Make page pretty
    -Add random event
    -Display cps
    -Try adding upgrades
    -Achievements
    -Notification Messages
    -Add mute button
*/
"use strict";

var cps = 0;
var total = 0;
var auto_clickers = 0;
var super_clickers = 0;
var price_clicker = 10;
var price_super = 100;
var click_sound = new Audio('RVBCLICK.wav');
var bgm = new Audio('bensound-funkysuspense.mp3');

bgm.volume = 0.5;

bgm.addEventListener('ended', function(){
    this.curretTime=0;
    this.play();
}, false);

function auto_cookies(){
    total+=cps;
    document.getElementById('total').innerHTML = Math.floor(total);
    console.log(auto_clickers, 'generated', cps);
}

function click_cookie(){
    total++;
    click_sound.play();
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

function delete_state(){
    localStorage.removeItem('dickclickerstate');
    location.reload();
}

function harambe_hit(){
    document.getElementById("main_click").src = "button_hit.png";
    setTimeout(function(){
        document.getElementById("main_click").src = "button.png";
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
    bgm.play();
}