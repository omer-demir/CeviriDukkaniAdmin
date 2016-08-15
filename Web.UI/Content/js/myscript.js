var imgUrl = null;
function alertCallBackFn(arg) {
    radalert("<strong>radalert</strong> returned the following result: <h3 style='color: #ff0000;'>" + arg + "</h3>", 350, 250, "Result");
}
function bosGec() {
    return;
}
function confirmCallBackFn(arg) {
    radalert("<strong>radconfirm</strong> returned the following result: <h3 style='color: #ff0000;'>" + arg + "</h3>", 350, 250, "Result");
}

function promptCallBackFn(arg) {
    radalert("After 7.5 million years, <strong>Deep Thought</strong> answers:<h3 style='color: #ff0000;'>" + arg + "</h3>", 350, 250, "Deep Thought");
}

function pageLoad() {
    //attach a handler to radio buttons to update global variable holding image url
    var $ = $telerik.$;
    $('input:radio').bind('click', function () {
        imgUrl = $(this).val();
    });
}