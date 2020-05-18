<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="AcessoWebService._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Acesso webservice TISS/ANS</title>

    <link rel="stylesheet" href="./css/bootstrap.css"  />


    <script src="./js/jquery-3.4.1.js"></script>
    <script src="./js/bootstrap.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
                <h2 class="card-title">TISS/ANS</h2>
                    <label for="numeroCarteira">Número Carteira</label>
                    <input type="text" class="form-control" id="numeroCarteira" /> 

                    <label for="sequencial">Sequencial ( gerado automaticamente )</label>
                    <input type="text" class="form-control" id="sequencial" /> 

                    <label for="codigoProcedimento">Código Procedimento</label>
                    <input type="text" class="form-control" id="codigoProcedimento" /> 

                    <label for="descricaoProcedimento">descrição procedimento</label>
                    <input type="text" class="form-control" id="descricaoProcedimento" /> 

                    <label for="codigoPrestadorNaOperadora">Código Prestador</label>
                    <input type="text" class="form-control" id="codigoPrestadorNaOperadora" /> 

                    <label for="registroANS">Registro ANS</label>
                    <input type="text" class="form-control" id="registroANS" /> 


                <br />
                <input type="button" id="btnEnvia" class="btn"  value="envia solicitação" />
                <input type="button" id="btnRecebeXML" class="btn" value="Gera XML de envio" />
             </div>
        <br />
        <div class="container" style="border:solid 1px #000;">
            <table class="table">
             <thead>
                <tr>
                  <th scope="col">XML Retorno</th>
                  <th scope="col">XML Gerado para envio ao webService</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td style="width:50%;">
                        <span id="retornoAutorizacaoXML" ></span>
                    </td>
                    <td >
                        <span id="retornaXMLExemplo"></span>
                    </td>
                </tr>
              </tbody>
            </table>
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
                try {
                    $.ajax({
                        url: 'default.aspx/enviaSolicitacao',
                        data: "{numerocarteira:'" + numeroCarteira + "', sequencial:'" + sequencial + "', codigoProcedimento:'" + codigoProcedimento + "', descricaoProcedimento:'" + descricaoProcedimento + "',  codigoPrestadorNaOperadora:'" + codigoPrestadorNaOperadora + "', registroANS:'" + registroANS + "'}",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: true,
                        success: function (response) {
                            if (response) {
                                $('#retornoAutorizacaoXML').html(response.d);
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
