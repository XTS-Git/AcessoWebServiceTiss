<%@ Page Language="C#" %>

<%@ Import Namespace="System.ComponentModel" %>

<!DOCTYPE html>

<script runat="server">

            void Page_Load(object sender, EventArgs e)
            {
                if (Request.Cookies["cokLogin"] != null)
                {
                    Login1.UserName = Request.Cookies["cokLogin"].Value;
                }

            }

            void OnLoggingIn(object sender, System.Web.UI.WebControls.LoginCancelEventArgs e)
            {
                Login1.InstructionText = "Aguarde, verificando informações...";

            }

            void OnLoginError(object sender, EventArgs e)
            {
                // Login1.HelpPageText = "Help with logging in...";
                // Login1.PasswordRecoveryText = "Forgot your password?";    
            }

            protected void Login1_Authenticate(object sender, AuthenticateEventArgs e)
            {

                try
                {
                    //Usuario usu = new Usuario();
                    //UsuarioDto dto = new UsuarioDto();
                    //dto.setLogin(Login1.UserName);
                    //dto.setSenha(Login1.Password);
                    //UsuarioDto _dto = usu.login(dto);

                    //if (_dto.idtUsuario != null)
                    //{
                    if (Login1.UserName == "acshac" && Login1.Password == "acshac123")
                    { 
                        if (Request.Browser.Cookies)
                        {
                            HttpCookie cokLogin = new HttpCookie("cokLogin");
                            HttpCookie cokIdtUsuario = new HttpCookie("cokIdtUsuario");
                            cokLogin.Value = Login1.UserName;
                            cokLogin.Expires = DateTime.Today.AddDays(30);

                            //        cokIdtUsuario.Value = _dto.idtUsuario.ToString();
                            //        cokIdtUsuario.Expires = DateTime.Today.AddDays(30);

                            Response.Cookies.Add(cokLogin);
                            //        Response.Cookies.Add(cokIdtUsuario);


                        }
                        FormsAuthentication.RedirectFromLoginPage(Login1.UserName, false);
                    }


        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }
</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <meta http-equiv="PRAGMA" content="NO-CACHE" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="bootstrap-4.0.0/css/bootstrap.css" rel="stylesheet" />   
    <link href="./FontAwesome-5-11/css/all.css" rel="stylesheet" type="text/css" />
    <link href="./CSS/style.css" rel="stylesheet" type="text/css" />
    <link href="./css/dialog.css" rel="stylesheet" type="text/css" />

    <script src="bootstrap-4.0.0/js/bootstrap.js"></script>
    <script type="text/javascript" src="./JS/jquery-3.4.1.min.js"></script>
    
<%--    <script type="text/javascript" src="./JS/angular-1.4.5/angular.js"></script>
    <script type="text/javascript" src="./JS/angular-1.4.5/i18n/angular-locale_pt-br.js"></script>--%>
    <script type="text/javascript" src="./FontAwesome-5-11/js/all.js"></script>
    <script type="text/javascript" src="./JS/uteis.js"></script>
    <script type="text/javascript" src="./JS/dialog.js"></script>
    <script type="text/javascript" src="./JS/ajax.js"></script>

    <style>
    </style>
</head>
<body>
<form id="form1" runat="server">
<div class="divGrupo" id="divLogin" style="width:519px;height:350px;">
<asp:Login ID="Login1" runat="server" OnAuthenticate="Login1_Authenticate" OnLoggingIn="OnLoggingIn" OnLoginError="OnLoginError" BorderPadding="0" 
    Width="519" Height="350">
    <LayoutTemplate>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12" style="text-align: center;">
                                <h3>Autorizador Procedimentos</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label class="control-label" for="">Usuário</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <asp:TextBox ID="UserName" CssClass="form-control" placeholder="Usuário" runat="server"></asp:TextBox>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" ValidationGroup="logLogin"
                                    ControlToValidate="UserName" ErrorMessage="Usuário é obrigatório." ToolTip="Usuário é obrigatório."></asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                               <label class="control-label" for="">Senha</label>
                               <div class="input-group mb-3">
                               <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-lock"></i></span></div>
                                    <asp:TextBox ID="Password" CssClass="form-control" placeholder="Senha" runat="server" TextMode="Password"></asp:TextBox>
                               </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                        <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" ValidationGroup="logLogin"
                                            ControlToValidate="Password" ErrorMessage="Senha é obrigatória." ToolTip="Senha é obrigatória.">
                                        </asp:RequiredFieldValidator>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" style="height: 22px; line-height: 22px; margin-bottom: 5px; color: red; text-align: center;">
                                <asp:Literal ID="FailureText" runat="server"></asp:Literal>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <asp:Button ID="LoginButton" runat="server" CssClass="btn btn-success" CommandName="Login" Text="Log In" ValidationGroup="logLogin" Width="100%" />
                            </div>
                        </div>
                    </div>
    </LayoutTemplate>
</asp:Login>
</div>
</form>
    <script>       
       $(document).ready(function ($) {
           if (vazio($('#Login1_UserName').val())){
               $('#Login1_UserName').focus();
           }else{
               $('#Login1_Password').focus();
           }

           centraliza($('#divLogin'));
           $( window ).resize(function() {
               centraliza($('#divLogin'));
           });
       });
    </script>
</body>

</html>
