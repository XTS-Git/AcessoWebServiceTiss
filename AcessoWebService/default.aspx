<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="AcessoWebService._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Exemplo de acesso webservice TISS ANS</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
            <button id="btnEnvia">
                envia
            </button>
        </div>
    </form>

    <script>
        $(function() {
            $('#btnEnvia').click(function () { 
                $.ajax({
                    url: 'default.aspx/enviaSolicitacao',
                    data: "{numerocarteira:'12345', sequencial:'565656', codigoProcedimento:'101010', descricaoProcedimento:'Teste descrição',  codigoPrestadorNaOperadora:'909090', registroANS:'00000'}",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    global: false,
                    success: function (response) {

                    },
                    error: (function Error(request, settings, error) {
                        alert('Erro ajaxClass: ' + settings.url + ' ' + ' Erro: ' + error + ' text: ' + request.responseText);
                    })
                })
            })
        });
    </script>
</body>
</html>
