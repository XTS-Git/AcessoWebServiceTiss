var vazio = function (valor) {
    try {
        valor = valor.trim();
        if (valor.toUpperCase() == 'NULL')
            return true;

    } catch (err) {
        // ignora erro pode ser outro objeto, que não uma string que não dará suporte aos metodos trim() e toUpperCase()
    }
    if (valor == '') return true;
    if (valor == null) return true;
    if (valor == undefined) return true;
    if (valor == 'undefined') return true;
    return false;
}

function soAlfaNumericos(event) {
 // 39 ASPAS SIMPLES 34 ASPAS DUPLA
    // if (event.keyCode === 39 || event.keyCode === 34 ||event.keyCode ===   ) {
    // 36, 43, 44, 61
    if ( contem(event.keyCode, '34, 35, 37, 39, 47, 59, 60, 62, 92, 94, 96, 123, 124, 125, 126, 180 ')){
        // NAO permitido
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        event.stopPropagation();

    } else {
        return true;
    }
}

function corrigeNome(event) {
    if (contem(event.keyCode, '36, 43, 44, 61')) {
        // NAO permitido
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
        event.stopPropagation();

    } else {
        soAlfaNumericos(event)
    }
    
};

// Veririca uma lista separada por vírgulas e retorna se
function contem(chave,  lista){
    var a = lista.split(',');
    var existe = false;
    for ( var i = 0 ; i < a.length; i++){
        if (parseInt(a[i]) === chave){
            existe = true;
            break;
        }
    }
    return existe;
}

function soNumeros(event) {
    // 37 e 39 setas // 9 = tab // 116 = F5 ( atualizar telas )
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 116 || event.keyCode == 9 || event.keyCode == 194) {
        // permitido
        return true;
    } else {
        // Numeros
        // teclado numerico
        if (event.keyCode >= 96 && event.keyCode <= 105) {
            return true;
        }
        else if ((event.keyCode < 48 || event.keyCode > 57) /*&& (event.keyCode < 96 || event.keyCode > 105)*/) {
            event.preventDefault();
        }
    }
}

var pegaParametro = function (sParam, callback) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    var retorno = '';
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            retorno = sParameterName[1];
            break;
        }
    }
    callback(retorno);
};

function corrigeParametros(s) {

    if (s == "true") return true;
    if (s == "false") return false;
    if (s == undefined) return '';
    if (s == "undefined") return '';
    if (s == 'null') return '';
    return s;
}

jQuery.fn.habilita = function (modo) {
    if (modo) {
        $(this).removeAttr('disabled');
    } else {
        $(this).attr('disabled', 'disabled');
    }
    return $(this);
};




//trim completo
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
//left trim
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
}
//right trim
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
}
//
String.prototype.padLeft = function (length) {
    var str = this.trim();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


String.prototype.padRight = function (length, completa) {
    var str = this.trim();
    if (completa == undefined) completa = '0';
    while (str.length < length) {
        str = str + completa;
    }
    return str;
}
