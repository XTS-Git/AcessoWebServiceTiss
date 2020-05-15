using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using AcessoWebService.TissSolicitacaoProcedimento;

namespace AcessoWebService
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string enviaSolicitacao(string numerocarteira, string sequencial, string codigoProcedimento, string descricaoProcedimento, string codigoPrestadorNaOperadora,
                                               string registroANS)
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
            identificacao.Item = codigoPrestadorNaOperadora;
            solicitacao.cabecalho.origem.Item = identificacao;

            cabecalhoTransacaoDestino destino = new cabecalhoTransacaoDestino();
            ct_guiaCabecalho guiaCab = new ct_guiaCabecalho();
            guiaCab.registroANS = registroANS;
            destino.Item = guiaCab;
            solicitacao.cabecalho.destino.Item = destino;
            solicitacao.cabecalho.Padrao = dm_versao.Item30303;

            List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados> listProcedimento = new List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados>();

            ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados procedimento = new ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados();
            procedimento.procedimento = new ct_procedimentoDados();
            procedimento.procedimento.codigoProcedimento = codigoProcedimento;
            procedimento.procedimento.descricaoProcedimento = descricaoProcedimento;
            procedimento.procedimento.codigoTabela = dm_tabela.Item00;

            

            ctm_spsadtSolicitacaoGuia guiaSADT = new ctm_spsadtSolicitacaoGuia();
            guiaSADT.procedimentosSolicitados = listProcedimento.ToArray();


            ct_solicitacaoProcedimento ctSoliciatacao = new ct_solicitacaoProcedimento();
            ctm_spsadtSolicitacaoGuia sadtGuia = new ctm_spsadtSolicitacaoGuia();
            // sadtGuia.dadosBeneficiario
            //ctSoliciatacao.Item
            //ctSoliciatacao.Item.

            // solicitacao.solicitacaoProcedimento = ct_solicitacaoProcedimento();

            //tissSolicitacaoProcedimento_OperationRequest connect = new tissSolicitacaoProcedimento_OperationRequest();
            //connect.solicitacaoProcedimentoWS = solicitacao;














            return null;
        }
    }
}