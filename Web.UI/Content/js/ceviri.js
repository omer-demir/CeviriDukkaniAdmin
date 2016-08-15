$(document).ready(function(){
    $('#tab-head ul li:first').addClass('active');
    $('.content:first').show();
    
    $('#tab-head ul li a').click(function(){
        var id = $(this).data("tabid");
        $('#tab-head ul li').removeClass('active');
        $(this).parent().addClass('active');
        $('.content').hide();
        $(id).fadeIn();
    });

    $("#kaynakdil").selectbox();
    $("#hedefdil").selectbox();
    $("#ay").selectbox();
    $("#yil").selectbox();
});

function sayfa_buton(gidilecek){
    $('html, body').animate({
        scrollTop: $(gidilecek).offset().top
    }, 500);
};


var bName = navigator.appName;
function taCount(taObj,Cnt) { 
    objCnt=createObject(Cnt);
    objVal=taObj.value;
    if (objCnt) {
        if(bName == "Netscape"){    
            objCnt.textContent=objVal.length;}
        else{objCnt.innerText=objVal.length;}
    }
    return true;
}
function createObject(objId) {
    if (document.getElementById) return document.getElementById(objId);
    else if (document.layers) return eval("document." + objId);
    else if (document.all) return eval("document.all." + objId);
    else return eval("document." + objId);
}