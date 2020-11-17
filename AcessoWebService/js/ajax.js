var AjaxClass = function (tipo) {

    if (!vazio(tipo)) {
        this.tipo = tipo;
    } else {
        this.tipo = null;
    }

    this.url = '';

    this.parametros = {
        jSon: '',
        init: function () {
            this.jSon = '{';
            return this;
        },
        add: function (propriedade, valor) {
            valor = corrigeParametros(valor);
            this.jSon += "'" + propriedade + "':'" + valor + "',";
            return this;
        },
        close: function () {
            if (this.jSon.length > 1)
                this.jSon = this.jSon.trim().substr(0, this.jSon.length - 1);
            this.jSon += '}';
            // this.jSon = JSON.stringify(this.jSon);
        }
    };
    this.executa = function (callback) {
        tipo = this.tipo;
        try {
            $.ajax({
                url: this.url,
                data: this.parametros.jSon,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                global: false,
                success: function (response) {
                    try {
                        if (vazio(response))
                            var retorno = null;
                        else if (typeof response == "object") {
                            if (vazio(response.d)) {
                                var retorno = '';
                            } else {
                                var retorno = jQuery.parseJSON(response.d);
                            }                            
                        } else {
                            try {
                                var retorno = jQuery.parseJSON(response);
                            } catch (errConversao) {
                                if (typeof response === "string") {
                                    var retorno = response;
                                }
                            }
                        }
                        if (!vazio(callback)) callback(retorno);
                    } catch (errAjax_) {
                        throw ' Erro chamada Ajax: ' + errAjax_ + ' Origem :' + arguments.callee;
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    // throw error.statusText;
                    alert(xhr.responseText);
                }
                //error: (function Error(request, settings, error) {
                //    // alert('Erro ajaxClass: ' + settings.url + ' ' + ' Erro: ' + error + ' text: ' + request.responseText + ' Origem :' + arguments.callee.caller.toString());
                //    alert('Erro ajaxClass:  Erro: ' + error + ' text: ' + request.responseText);
                //    retorno = null;
                    // if (callback != undefined) callback(retorno);
                //})

            });
        } catch (erro_global) {
            alert(erro_global);
            if (!vazio(callback)) callback("erro" + erro_global);
            // callback("erro" + erro_global);
            return;
        }
    };
};