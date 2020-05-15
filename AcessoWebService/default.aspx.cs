using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
// using AcessoWebService.ACSWebService;
using ACS.WebService.Autorizador.xsd;

namespace AcessoWebService
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string enviaSolicitacao(string numerocarteira, string sequencial)
        {
            solicitacaoProcedimentoWS solicitacao = new solicitacaoProcedimentoWS();
            solicitacao.cabecalho = new cabecalhoTransacao();
            solicitacao.cabecalho.identificacaoTransacao = new cabecalhoTransacaoIdentificacaoTransacao();
            solicitacao.cabecalho.identificacaoTransacao.tipoTransacao = dm_tipoTransacao.SOLICITACAO_PROCEDIMENTOS;
            solicitacao.cabecalho.identificacaoTransacao.sequencialTransacao = sequencial; // número que identifica a transação
            solicitacao.cabecalho.identificacaoTransacao.dataRegistroTransacao = DateTime.Now.Date;
            solicitacao.cabecalho.identificacaoTransacao.horaRegistroTransacao = DateTime.Now;
            
            ct_prestadorIdentificacao identificacao = new ct_prestadorIdentificacao();
            identificacao.ItemElementName = ItemChoiceType.codigoPrestadorNaOperadora;
            identificacao.Item = "50505050";
            solicitacao.cabecalho.origem.Item = identificacao;

            cabecalhoTransacaoDestino destino = new cabecalhoTransacaoDestino();
            destino.Item = "ANS";
            solicitacao.cabecalho.destino.Item = destino;
            solicitacao.cabecalho.Padrao = dm_versao.Item30303;

            List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados> listProcedimento = new List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados>();
            ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados procedimento = new ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados();
            procedimento.procedimento = new ct_procedimentoDados();
            procedimento.procedimento.codigoProcedimento = "10101012";
            procedimento.procedimento.descricaoProcedimento = "consulta";
            procedimento.procedimento.codigoTabela = dm_tabela.Item00;

            ctm_spsadtSolicitacaoGuia guia = new ctm_spsadtSolicitacaoGuia();
            guia.procedimentosSolicitados = listProcedimento.ToArray();
            // solicitacao.solicitacaoProcedimento.Item = ctm_solicitaca







            return null;
        }
    }
}