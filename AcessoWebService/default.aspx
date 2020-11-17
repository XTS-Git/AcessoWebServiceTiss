<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="AcessoWebService._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Acesso webservice TISS/ANS</title>

    <meta http-equiv="PRAGMA" content="NO-CACHE" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">


    <link href="bootstrap-4.0.0/css/bootstrap.css" rel="stylesheet" />

    <script src="./js/jquery-3.4.1.js"></script>
    <script src="bootstrap-4.0.0/js/bootstrap.js"></script>
    <script src="js/uteis.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container-fluid">
            <h3>TISS/ANS</h3>
            <div class="row">
                <div class="col-md-12">
                    <label for="numeroCarteira">Número Carteira</label>
                    <input type="text" class="form-control" id="numeroCarteira" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label for="codigoProcedimento">Código Procedimento</label>
                    <%--<input type="text" class="form-control" id="codigoProcedimento" /> --%>
                    <select id="codigoProcedimento" class="form-control">
                        <option value="">Selecione</option>
                        <option value="20104294">20104294</option>
                        <option value="20104251">20104251</option>
                        <option value="10101012">10101012</option>
                        <option value="20104430">20104430</option>
                        <option value="20104278">20104278</option>
                        <option value="20104286">20104286</option>
                        <option value="98000100">98000100</option>
                        <option value="60018607">60018607</option>
                        <option value="20104251">20104251</option>
                        <option value="60023406">60023406</option>
                        <option value="20104260">20104260</option>
                        <option value="20104421">20104421</option>
                        <option value="20104308">20104308</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label for="sequencial">Sequencial ( gerado automaticamente )</label>
                    <input type="text" class="form-control" id="sequencial" />

                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label for="descricaoProcedimento">descrição procedimento</label>
                    <input type="text" class="form-control" id="descricaoProcedimento" />

                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label for="codigoPrestadorNaOperadora">Código Prestador</label>
                    <input type="text" class="form-control" id="codigoPrestadorNaOperadora" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label for="registroANS">Registro ANS</label>
                    <input type="text" class="form-control" id="registroANS" />

                </div>
            </div>
            <br />
            <div class="row">
                <div class="col-md-12">
                    <input type="button" id="btnEnvia" class="btn" value="envia solicitação" />
                    <input type="button" id="btnRecebeXML" class="btn" value="Gera XML de envio" />
                </div>
            </div>
             </div>
        <br />
        <div class="container-fluid" style="border:solid 1px #000;">
            <div class="row">
                <div class="col-md-6">
                    <h4>XML Retorno</h4>
                    <textarea style="width: 100%;" id="retornoAutorizacaoXML" rows="20"></textarea>
                </div>
                <div class="col-md-6">
                    <h4>XML Gerado para envio ao webService</h4>
                    <textarea style="width: 100%;" id="retornaXMLExemplo" rows="20"></textarea>
                </div>
            </div>
        </div>
    </form>

    <script>
        $(function() {

            $('#sequencial').val(getRandom());

            $('#btnRecebeXML').click(function () {
                try {
                    $.ajax({
                        url: 'default.aspx/geraXML',
                        data: "{numerocarteira:'" + $('#numeroCarteira').val() + "', sequencial:'" + $('#sequencial').val() + "', codigoProcedimento:'" + $('#codigoProcedimento').val() + "', descricaoProcedimento:'" + $('#descricaoProcedimento').val() + "',  codigoPrestadorNaOperadora:'" + $('#codigoPrestadorNaOperadora').val() + "', registroANS:'" + $('#registroANS').val() + "'}",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        success: function (response) {
                            if (response) {
                                $('#retornaXMLExemplo').text(response.d);
                            } else {
                                $('#retornaXMLExemplo').html('Não retornou nada');
                            }
                        },
                        error: (function Error(request, settings, error) {
                            $('#retornaXMLExemplo').html('Erro ajaxClass: ' + settings.url + ' ' + ' Erro: ' + error + ' text: ' + request.responseText);
                        })
                    })
                } catch (e) {
                    $('#retornaXMLExemplo').html(e);
                }
            });

            $('#btnEnvia').click(function () {
                $('#retornoAutorizacaoXML').text('Enviando ...');

                if (vazio($('#numeroCarteira').val())) { 
                    alert('Número da carteira inválido ! ');
                }
                if (vazio($('#codigoProcedimento').val())) {
                    alert('Número do procedimento inválido ! ');
                }

            try {
                $.ajax({
                    url: 'default.aspx/enviaSolicitacao',
                    data: "{numerocarteira:'" + $('#numeroCarteira').val() + "', sequencial:'" + $('#sequencial').val() + "', codigoProcedimento:'" + $('#codigoProcedimento').val() + "', descricaoProcedimento:'" + $('#descricaoProcedimento').val() + "',  codigoPrestadorNaOperadora:'" + $('#codigoPrestadorNaOperadora').val() + "', registroANS:'" + $('#registroANS').val() + "'}",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    success: function (response) {
                        if (response) {
                            $('#retornoAutorizacaoXML').text(response.d);
                        } else {
                            $('#retornoAutorizacaoXML').html('Não retornou nada');
                        }
                    },
                    error: (function Error(request, settings, error) {
                        $('#retornoAutorizacaoXML').html('Erro ajaxClass: ' + settings.url + ' ' + ' Erro: ' + error + ' text: ' + request.responseText);
                    })
                })
            } catch (e) {
                $('#retornoAutorizacaoXML').html(e);
            }
        })
        });

        function getRandom() {
            return Math.floor(Math.random() * 10000);
        }

    </script>
</body>
</html>
