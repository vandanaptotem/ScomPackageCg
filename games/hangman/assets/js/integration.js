function getImg(str){
    return defaultImages.path+defaultImages[str];
}

function getText(str){
    return defaultText[str];
}

window.getImg= getImg
window.getText = getText

//this is the object which contains path for default text and images
defaultImages  ={}
defaultImages.path = "assets/img/";
defaultImages["hm-background"] = "back.jpg";
defaultImages["hm-logo"] = "nameplate.png";
defaultImages["hm-right-panel"] = "wanted.png";
defaultImages["hm-hang1"] = "spirit.png";
defaultImages["hm-hang2"] = "hm1.png";
defaultImages["hm-hang3"] = "hm2.png";
defaultImages["hm-hang4"] = "hm3.png";
defaultImages["hm-hang5"] = "hm4.png";
defaultImages["hm-hang6"] = "hm5.png";
defaultImages["hm-hang7"] = "hm6.png";
defaultImages["hm-hang8"] = "hm7.png";
defaultImages["hm-tile-back-1"] = "tile_back_default.png";
defaultImages["hm-tile-back-2"] = "tile_back_click.png";


defaultText = {};
defaultText["hm-text-instructions"] = "<p>Remember, with every wrong alphabet, the Spirit will turn obscure.</p>" +
"<p>6 wrong guesses and the Spirit disappears and every right answer resurrects the Spirit.</p>" +
"<p>Good luck!</p>";


window.defaultImages = defaultImages;
