// JavaScript Document

//testa se a mascara é inteira
function isMascaraCredencialInteira(mascara) {
    if (mascara.length == 0) {
        return false;
    }
    for (i = 0; i < mascara.length; i++) {
        if (mascara.charCodeAt(i) < 48 || mascara.charCodeAt(i) > 57) {
            return false;
        }
    }
    return true;
}


//if (event.keyCode < 48 || event.keyCode > 57){

//testa se a keycode é de acordo com a mascara
function mascaraCredencialAlfanumerico(credencial, mascara) {

    var credencialDigitada = credencial.value;

    var Digitado = event.keyCode;

    if (Digitado != 8) { // backspace 
        for (i = 1; i < mascara.length; i++) {
            if (credencialDigitada.length == 0 || credencialDigitada.length == i) {
                //se a mascara é inteiro verifica se o digito também é
                if (!(mascara.charCodeAt(i) < 48 || mascara.charCodeAt(i) > 57) && (Digitado < 48 || Digitado > 57)) {
                    return false;
                }
            }

        }
    }
    return true;
}

function MascaraCredencial(credencial, mascara) {

    // if (mascara.length > 0) {
    if (isMascaraCredencialInteira(mascara) == true && mascaraInteiro(credencial) == false) {
        event.returnValue = false;
    } else if (isMascaraCredencialInteira(mascara) == false) {
        if (mascaraCredencialAlfanumerico(credencial, mascara) == false) {
            event.returnValue = false;
        }
    }
    // }

    mascara = mascara.replace('9', '0');
    return formataCampo(credencial, mascara, event);
}


//adiciona mascara de cnpj
function MascaraCNPJ(cnpj) {
    if (mascaraInteiro(cnpj) == false) {
        event.returnValue = false;
    }
    return formataCampo(cnpj, '00.000.000/0000-00', event);
}

//adiciona mascara de cep
function MascaraCep(cep) {
    if (mascaraInteiro(cep) == false) {
        event.returnValue = false;
    }
    return formataCampo(cep, '00000-000', event);
}

//adiciona mascara de data
function MascaraData(data) {
    if (mascaraInteiro(data) == false) {
        event.returnValue = false;
    }
    if (data.value.length == 2 || data.value.length == 5) {
        data.value += '/';
    }
    // return formataCampo(data, '00/00/0000', event);
    return true;
}

//adiciona mascara ao telefone
function MascaraTelefone(tel) {
    if (mascaraInteiro(tel) == false) {
        event.returnValue = false;
    }
    return formataCampo(tel, '(00) 00000-0000', event);
}

//adiciona mascara do telefone (residencial ou celular)
function mascaraTel(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout("execmascara()", 1);
}
function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}
function mtel(v) {
    var maxTama = 0;
    if (v.length > 0) {
        if (v.substr(v.indexOf(')') + 2, 1) == '9') {
            maxTama = 15;
        } else {
            maxTama = 14;
        }
        if (v.length > maxTama) {
            return v.substr(0, maxTama);
        }
    }
    v = v.replace(/\D/g, "");                   //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");  //Coloca parênteses em volta dos dois primeiros dígitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");     //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}

//adiciona mascara ao CPF
function MascaraCPF(cpf) {
    if (mascaraInteiro(cpf) == false) {
        event.returnValue = false;
    }
    return formataCampo(cpf, '000.000.000-00', event);
}


function MascaraHora(horario) {

    for (var i = 0; i < horario.value.length; i++) {
        var character = horario.value.substring(i, i + 1);
        var code = horario.value.charCodeAt(i);

        if ((code < 48 || code > 57) && (code < 96 || code > 105) && code != 58) {
            horario.value = '';
        }
    }

    var valor = horario.value;
    if (valor.indexOf(":") != -1) {
        var hora = valor.split(":")[0];
        if (parseInt(hora) > 23) {
            horario.value = '';
        }
        var minuto = valor.split(":")[1];
        if (parseInt(minuto) > 59) {
            horario.value = '';
        }
    }// else {
    //    horario.value = '';
    //}



    return true;
}

//function MascaraHora(horario) {

//    return formataCampo(horario, '00:00', event);
//}

//function MascaraHora(horario) {
//    if (mascaraInteiro(horario) == false) {
//        event.returnValue = false;
//    }
//    return formataCampo(horario, '00:00', event);
//}

//valida telefone
function ValidaTelefone(tel) {
    exp = /\(\d{2}\)\ \d{4}\-\d{4}/
    if (!exp.test(tel.value))
        alert('Numero de Telefone Invalido!');
}

//valida CEP
function ValidaCep(cep) {
    exp = /\d{2}\.\d{3}\-\d{3}/
    if (!exp.test(cep.value))
        alert('Numero de Cep Invalido!');
}

//valida data
function ValidaData(data) {
    if (data.value == '')
        return;
    exp = /\d{2}\/\d{2}\/\d{4}/
    if (!exp.test(data.value)) {
        alert('Data Invalida!');
        return false;
    }
    var testaData = data.value.split("/");
    if (testaData[0] < 1 || testaData[0] > 31) {
        alert('Dia Inválido');
        return false;
    }
    else if (testaData[1] < 1 || testaData[1] > 12) {
        alert('Mês Inválido');
        return false;
    }

    return true;
}

function dataMaiorQueAtual(data, rootSGS, callback) {
    var dataDigitada = data.value;
    var aDataDigitada = dataDigitada.split("/");
    dataHoraServidor(rootSGS, function (data, hora) {
        var aHoje = data.split("/");
        var retorno = true;
        // ano
        if (aHoje[2] < aDataDigitada[2]) {
            retorno = false;
        }
        // mes
        if (aHoje[1] < aDataDigitada[1] && aHoje[2] == aDataDigitada[2]) {
            retorno = false;
        }
        // dia
        if (aHoje[0] < aDataDigitada[0] && aHoje[1] == aDataDigitada[1] && aHoje[2] == aDataDigitada[2]) {
            retorno = false;
        }

        if (callback != undefined) callback(retorno);
    });
}

function dataMenorQueTrintaDias(data, rootSGS, callback) {
    var dataDigitada = data.value;
    var aDataDigitada = dataDigitada.split("/");
    dataHoraServidor(rootSGS, function (data, hora) {

        var adataAtual = data.split("/");
        var dataAtual = new Date(adataAtual[2], adataAtual[1] - 1, adataAtual[0]);

        var menosTrinta = new Date();
        menosTrinta.setDate(dataAtual.getDate() - 30);

        var foobar = new Date(aDataDigitada[2], aDataDigitada[1] - 1, aDataDigitada[0]);

        if (foobar < menosTrinta) {
            retorno = false;
        } else {
            retorno = true;
        }

        if (callback != undefined) callback(retorno);
    });
}

function ValidarCPF(Objcpf) {
    if (Objcpf.value == '')
        return true;

    var cpf = Objcpf.value;
    var arrCPFsInvalidos = ['000.000.000-00', '111.111.111-11', '222.222.222-22', '333.333.333-33',
                                '444.444.444-44', '555.555.555-55', '666.666.666-66',
                                '777.777.777-77', '888.888.888-88', '999.999.999-99'];
    if (jQuery.inArray(cpf, arrCPFsInvalidos) >= 0) {
        aviso('CPF inválido');
        return;
    }
    exp = /\.|\-/g
    cpf = cpf.toString().replace(exp, "");

    var Soma;
    var Resto;
    Soma = 0;

    if (cpf == "00000000000") return false;
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) {
        alert('CPF Invalido!');
        return false;
    }
    Soma = 0;

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) {
        alert('CPF Invalido!');
        return false;
    }
    return true;
}



//valida numero inteiro com mascara
function mascaraInteiro() {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
        return false;
    }
    return true;
}

//valida o CNPJ digitado
function ValidarCNPJ(ObjCnpj) {
    if (ObjCnpj.value == '')
        return;
    var cnpj = ObjCnpj.value;
    var valida = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);
    var dig1 = new Number;
    var dig2 = new Number;

    exp = /\.|\-|\//g
    cnpj = cnpj.toString().replace(exp, "");
    var digito = new Number(eval(cnpj.charAt(12) + cnpj.charAt(13)));

    for (i = 0; i < valida.length; i++) {
        dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
        dig2 += cnpj.charAt(i) * valida[i];
    }
    dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
    dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));

    if (((dig1 * 10) + dig2) != digito)
        alert('CNPJ Invalido!');

}

//formata de forma generica os campos
function formataCampo(campo, Mascara, evento) {
    var boleanoMascara;

    var Digitato = evento.keyCode;
    exp = /\-|\.|\/|\(|\)| /g
    campoSoNumeros = campo.value.toString().replace(exp, "");
    // campoSoNumeros = campo.val().replace( exp, "" ); 

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;;

    if (Digitato != 8) { // backspace 
        for (i = 0; i <= TamanhoMascara; i++) {
            boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".") || (Mascara.charAt(i) == "/"))
            boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(") || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
            if (boleanoMascara) {
                NovoValorCampo += Mascara.charAt(i);
                TamanhoMascara++;
            } else {
                NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                posicaoCampo++;
            }
        }
        campo.value = NovoValorCampo;
        return true;
    } else {
        return true;
    }
}

function formataCPF(cpf) {
    if (vazio(cpf)) return '';
    return formataValor(cpf.padLeft(11), '000.000.000-00');
}

//formata de forma generica os campos
function formataValor(campo, Mascara) {
    var boleanoMascara;
    var exp = /\-|\.|\/|\(|\)| /g
    var campoSoNumeros = campo.replace(exp, "");

    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;

    for (var i = 0; i < TamanhoMascara; i++) {
        boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                                                || (Mascara.charAt(i) == "/"))
        boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                                                || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }
    return NovoValorCampo;
}

jQuery.fn.formataHora = function () {
    var str = $(this);
    str.val().trim();
    if (str.val() == '') return;
    str.val(str.val().padLeft(4));
    //str.val().pad(str.val().replace(':', ''), 4);

    if (str.val().indexOf(":") == -1) {
        var a = str.val();
        a = a.substr(0, 2) + ':' + a.substr(2, 2);
        str.val(a);
    }
    return str;
}
