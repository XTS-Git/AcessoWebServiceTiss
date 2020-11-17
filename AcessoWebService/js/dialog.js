var centraliza = function (obj) {

    meiaVerticalObj = (obj.height() / 2);
    meioVertical = ($(window).height() / 2)
    topObj = meioVertical - meiaVerticalObj;

    meioHorizObj = (obj.width() / 2);
    meioHoriz = ($(window).width() / 2);
    colObj = meioHoriz - meioHorizObj;

    obj.css('position', 'absolute');
    obj.css('top', topObj);
    obj.css('left', colObj);
};

var calculaCentralizado = function (objHeight, objWidth) {
    retorno = { top: 0, left: 0 };
    meiaVerticalObj = (objHeight / 2);
    meioVertical = ($(window).height() / 2)
    topObj = meioVertical - meiaVerticalObj;

    meioHorizObj = (objWidth / 2);
    meioHoriz = ($(window).width() / 2);
    colObj = meioHoriz - meioHorizObj;

    retorno.top = topObj;
    retorno.left = colObj;
    return retorno;
}
var quadroExterno = $('<div />');
var telaPrincipal = '';
var contadorDialogAberto = 0;
jQuery.fn.dialog = function (opcoes, callback) {
    telaPrincipal = this;
    var nomeTela = this.id;
    if (opcoes === 'open') {
        openDialog(nomeTela, function () { if (!vazio(callback)) callback(); });
    } else if (opcoes === 'close') {
        closeDialog(nomeTela, function () { if (!vazio(callback)) callback(); });
    }
};
var closeDialog = function (nomeTela, callback) {
    telaPrincipal.css('z-index', '1');
    telaPrincipal.removeClass('divDialog');
    telaPrincipal.css('border-color', '#000000');
    telaPrincipal.hide();
    var fechar = nomeTela + contadorDialogAberto;
    $('#' + fechar).remove();
    contadorDialogAberto--;
    if (!vazio(callback)) callback();
}
var openDialog = function (nomeTela, callback) {
    contadorDialogAberto++;
    var docAltura = $(document).height();
    var docLargura = $(document).width();
    quadroExterno = $('<div />');
    quadroExterno.attr('id', nomeTela + contadorDialogAberto);
    quadroExterno.addClass('apagaArea');
    quadroExterno.css('position', 'absolute');
    quadroExterno.css('top', 0);
    quadroExterno.css('left', 0);
    quadroExterno.css('height', docAltura);
    quadroExterno.css('width', docLargura);
    quadroExterno.appendTo($('body'));
    // if (contadorDialogAberto === 1) {
        quadroExterno.css('z-index', '999' + contadorDialogAberto);
    //} else {
        // quadroExterno.css('z-index', '1001' + contadorDialogAberto);
    // }
    quadroExterno.show();

    centraliza(telaPrincipal);
    telaPrincipal.show();
    telaPrincipal.addClass('divDialog');
    // if (contadorDialogAberto === 1) {
        telaPrincipal.css('z-index', '1000' + contadorDialogAberto);
    // } else {
        // telaPrincipal.css('z-index', '1010' + contadorDialogAberto);
    // }
        if (!vazio(callback)) callback();
}