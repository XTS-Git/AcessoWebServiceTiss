//window.alert = function (texto) {
//    dialogAlert(texto);
//};

var dialogAlert = function (texto) {

    var alturaBox = 200;
    var larguraBox = 500;

    var alturaBody = alturaBox - 15;
    var larguraBody = larguraBox - 10;

    var alturaBoxTexto = ((alturaBody / 100) * 65);

    var alturaBoxBtn = ((alturaBody / 100) * 30);

    $('#boxDialog').remove();
    $('body #boxDialog').remove();

    var boxDlg = $('<div id="boxDialog" />');
    boxDlg.css('width', larguraBox);
    boxDlg.css('height', alturaBox);
    boxDlg.css('line-height', alturaBox);


    var boxBody = $('<div id="boxBody" />');
    boxBody.css('width', larguraBody);
    boxBody.css('height', alturaBody);
    boxBody.css('margin-left', 5);
    boxBody.css('line-height', alturaBody + 'px');
    // boxBody.css('background-color', '#c0c0c0');


    boxBody.appendTo(boxDlg);

    boxBody.addClass('col-md-12');
    boxBody.addClass('divGrupo');
    boxBody.css('border', 'solid 2px #000000');
    boxBody.css('box-shadow', '10px 10px 10px #c0c0c0');

    var textoMsg = $('<div style="color:#000; font-size: 20px;display:block;">' + texto + '</div>');
    textoMsg.css('height', alturaBoxTexto);
    textoMsg.css('line-height', (alturaBoxTexto/4)+ 'px');
    textoMsg.css('border-bottom', 'dotted 1px #000');
    textoMsg.css('text-justify', 'distribute');
    textoMsg.css('text-indent', 15);
    textoMsg.css('padding-top', 10);

    // textoMsg.css('background-color', 'red');
    textoMsg.appendTo(boxBody);

    var btnBox = $('<div style="display:block;">' + '' + '</div>');
    // btnBox.css('background-color', 'red');
    btnBox.css('height', alturaBoxBtn);
    btnBox.css('text-align', 'center');
    btnBox.css('line-height', alturaBoxBtn + 'px');
    btnBox.appendTo(boxBody);

    var botaoOK = $('<input type="button" class="btn btn-primary" value="Ok" />');
    botaoOK.css('width','300');
    // botaoOk.attr('click','closeDialogAtert()')
    botaoOK.click(function () {
        closeDialogAlert();
    });
    botaoOK.appendTo(btnBox);

    boxDlg.appendTo($('body'));
    boxDlg.dialog('open');
};

var closeDialogAlert = function () {
    $('#boxDialog').dialog('close');
    $('#boxDialog').remove();
    $('body #boxDialog').remove();
}


var sucesso = function (texto) {
    dialogMsg(texto);
}


var timerSucesso;
var dialogMsg = function (texto) {

    var alturaBox = 50;
    var alturaBoxTexto = ((alturaBox / 100) * 65);

    var docWidth = $(document).width();
    var docLargura = ((docWidth / 100) * texto.length);
    // var posicaoTopBox = (($(document).height() / 2));
    var posicaoTopBox = 10;
    var posicaoLeftBox = (docWidth / 2) - (docLargura / 2);

    $('#msgDialog').remove();
    $('body #msgDialog').remove();

    var boxDlg = $('<div id="msgDialog" />');

    boxDlg.css('position', 'absolute');
    boxDlg.css('top', posicaoTopBox);
    boxDlg.css('left', posicaoLeftBox);
    boxDlg.css('height', alturaBox);
    boxDlg.css('line-height', alturaBox);
    boxDlg.css('width', docLargura);
    boxDlg.css('background-color', '#7fcb65');
    boxDlg.css('border-radius', '6px');

    var textoMsg = $('<div style="color:#000; font-size: 20px;display:block;">' + texto + '</div>');
    textoMsg.css('height', alturaBoxTexto);
    textoMsg.css('line-height', alturaBoxTexto + 'px');
    // textoMsg.css('border-bottom', 'dotted 1px #000');
    textoMsg.css('text-justify', 'distribute');
    textoMsg.css('text-indent', 15);
    textoMsg.css('padding-top', 10);
    textoMsg.css('text-align', 'center');

    textoMsg.appendTo(boxDlg);
    
    boxDlg.appendTo($('body'));

    setTimeout(function () { closeDialogMsg(); }, 5000);


    $(window).resize(function () {
        if ($("#msgDialog").length) {
            closeDialogMsg();
            sucesso(texto);
        }
    });
};

var closeDialogMsg = function () {
    $('#msgDialog').remove();
    $('body #msgDialog').remove();
};
