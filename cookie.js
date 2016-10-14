/* THINGS TO DO
    -Make page pretty
    -Add random event
    -Try adding upgrades
    -Achievements
    -Notification Messages
*/
"use strict";

var cps = 0;
var total = 0;
var auto_clickers = 0;
var super_clickers = 0;
var mega_clickers = 0;
var price_clicker = 10;
var price_super = 50;
var price_mega = 150;
var clicker_mult = 0.1;
var super_mult = 0.5;
var mega_mult = 1;
var upgraded_clicker = false;
var price_upgrade_clicker = 200;
var click_sound = new Audio('RVBCLICK.wav');
var bgm = new Audio('bensound-funkysuspense.mp3');
var mute_music = false;
var muted_clicks = false;

bgm.volume = 0.25;
click_sound.volume = 0.5;

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

function button_hit(){
    document.getElementById("main_click").src = "button_hit.png";
    setTimeout(function(){
        document.getElementById("main_click").src = "button.png";
    }, 200);
}

function buy_clicker(){
    if(total >= price_clicker){
        auto_clickers++;
        total-=price_clicker;
        console.log(total);
        cps=(cps*100+clicker_mult*100)/100;
        price_clicker = Math.floor(price_clicker*1.2);
        document.getElementById('auto_cost').innerHTML = price_clicker;
        document.getElementById('clickers').innerHTML = auto_clickers;
        document.getElementById('total').innerHTML = Math.floor(total);
        document.getElementById('cps').innerHTML = truncate(cps,1);
    }
    else{
        console.log('Not enough clicks!');
    }
}

function buy_super(){
    if(total >= price_super){
        super_clickers++;
        total-=price_super;
        console.log(total);
        cps=(cps*100+super_mult*100)/100;
        price_super = Math.floor(price_super*1.2);
        document.getElementById('super_cost').innerHTML = price_super;
        document.getElementById('supers').innerHTML = super_clickers;
        document.getElementById('total').innerHTML = Math.floor(total);
        document.getElementById('cps').innerHTML = truncate(cps,1);
    }
    else{
        console.log('Not enough clicks!');
    }
}

function buy_mega(){
    if(total >= price_mega){
        mega_clickers++;
        total-=price_mega;
        console.log(total);
        cps=(cps*100+mega_mult*100)/100;
        price_mega = Math.floor(price_mega*1.2);
        document.getElementById('mega_cost').innerHTML = price_mega;
        document.getElementById('megas').innerHTML = mega_clickers;
        document.getElementById('total').innerHTML = Math.floor(total);
        document.getElementById('cps').innerHTML = truncate(cps,1);
    }
    else{
        console.log('Not enough clicks!');
    }
}

function upgrade_clicker(){
    if(total >= price_upgrade_clicker){
        upgraded_clicker = true;
        cps = ((cps*100)+(200*clicker_mult*auto_clickers))/100;
        clicker_mult*=3;
        document.getElementById('cps').innerHTML = truncate(cps,1);
        document.getElementById('clicker_upgrade').style.display = "none";
        document.getElementById('clicker_upgrade_cost_disp').style.visibility = "hidden";
        document.getElementById('upgrade_clicker_cost').style.visibility = "hidden";
    }
    else{
        console.log('Not enough clicks!');
    }
}

function save_state(){
    let state = {"total":total, "auto_clickers":auto_clickers,
     "super_clickers":super_clickers, "mega_clickers":mega_clickers,
     "price_super":price_super, "price_clicker":price_clicker, 
     "price_mega":price_mega, "cps":cps, "mute_music":mute_music, 
     "muted_clicks":muted_clicks, "upgraded_clicker":upgraded_clicker};
    console.log(cps);
    localStorage.setItem('clickerstate', JSON.stringify(state));
    
    console.log('state saved')

}

function delete_state(){
    localStorage.removeItem('clickerstate');
    location.reload();
}

function mute_bgm(){
    if(mute_music){
        bgm.volume = .25;
        mute_music = false;
        document.getElementById("mute_music").src = "unmuted.png";
        save_state();
    }
    else{
        bgm.volume = 0;
        mute_music = true;
        document.getElementById("mute_music").src = "muted.png";
        save_state();
    }
}

function mute_clicks(){
    if(muted_clicks){
        click_sound.volume = 0.5;
        muted_clicks = false;
        document.getElementById("mute_sfx").src = "unmuted.png";
        save_state();
    }
    else{
        click_sound.volume = 0;
        muted_clicks = true;
        document.getElementById("mute_sfx").src = "muted.png";
        save_state();
    }
}

function truncate (num, dec_places) {
    var numstr = num.toString(),
        location_of_decimal = numstr.indexOf('.'),
        substrLength = location_of_decimal == -1 ? numstr.length : 1 + location_of_decimal + dec_places,
        trimmed_result = numstr.substr(0, substrLength),
        finalResult = isNaN(trimmed_result) ? 0 : trimmed_result;

    return parseFloat(finalResult);
}

function main(){
    var state = JSON.parse(localStorage.getItem('clickerstate'));
    if(state){
        total = state["total"];
        super_clickers = state["super_clickers"];
        price_super = state["price_super"];
        auto_clickers = state["auto_clickers"];
        price_clicker = state["price_clicker"];
        mega_clickers = state["mega_clickers"];
        price_mega = state["price_mega"];
        cps = state["cps"];
        mute_music = state["mute_music"];
        muted_clicks = state["muted_clicks"];
        upgraded_clicker = state["upgraded_clicker"];
    }
    document.getElementById('total').innerHTML = Math.floor(total);
    document.getElementById('cps').innerHTML = truncate(cps,1);
    document.getElementById('clickers').innerHTML = auto_clickers;
    document.getElementById('supers').innerHTML = super_clickers;
    document.getElementById('megas').innerHTML = mega_clickers;
    document.getElementById('auto_cost').innerHTML = price_clicker;
    document.getElementById('super_cost').innerHTML = price_super;
    document.getElementById('mega_cost').innerHTML = price_mega;
    document.getElementById('upgrade_clicker_cost').innerHTML = price_upgrade_clicker;
    window.setInterval(auto_cookies, 1000);
    window.setInterval(save_state, 10000);
    if(upgraded_clicker){
        document.getElementById("clicker_upgrade").style.display = "none";
        document.getElementById('clicker_upgrade_cost_disp').style.visibility = "hidden";
        document.getElementById('upgrade_clicker_cost').style.visibility = "hidden";
        clicker_mult*=3;
    }
    if(mute_music == true){
        bgm.volume = 0;
        document.getElementById("mute_music").src = "muted.png";
    }
    if(muted_clicks == true){
        click_sound.volume = 0;
        document.getElementById("mute_sfx").src = "muted.png";
    }
    bgm.play();
}