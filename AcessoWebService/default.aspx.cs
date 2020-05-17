using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using AcessoWebService.Localhost5000TissSolicitacaoProcedimento;

namespace AcessoWebService
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static string enviaSolicitacao(string numerocarteira, string sequencial, string codigoProcedimento, string descricaoProcedimento,
                                              string codigoPrestadorNaOperadora, string registroANS)
        {
            solicitacaoProcedimentoWS solicitacao = new solicitacaoProcedimentoWS();
            solicitacao.cabecalho = new cabecalhoTransacao();
            solicitacao.cabecalho.identificacaoTransacao = new cabecalhoTransacaoIdentificacaoTransacao();
            solicitacao.cabecalho.identificacaoTransacao.tipoTransacao = dm_tipoTransacao.SOLICITACAO_PROCEDIMENTOS;
            solicitacao.cabecalho.identificacaoTransacao.sequencialTransacao = sequencial; // número que identifica a transação
            solicitacao.cabecalho.identificacaoTransacao.dataRegistroTransacao = DateTime.Now.Date;
            solicitacao.cabecalho.identificacaoTransacao.horaRegistroTransacao = DateTime.Now;
            #region ORIGEM
            cabecalhoTransacaoOrigemIdentificacaoPrestador origem = new cabecalhoTransacaoOrigemIdentificacaoPrestador();
            origem.ItemElementName = ItemChoiceType.codigoPrestadorNaOperadora;
            origem.Item = codigoPrestadorNaOperadora;
            solicitacao.cabecalho.origem = new cabecalhoTransacaoOrigem();
            solicitacao.cabecalho.origem.Item = origem;
            #endregion ORIGEM

            #region DESTINO
            //cabecalhoTransacaoDestino destino = new cabecalhoTransacaoDestino();
            //destino.Item

            solicitacao.cabecalho.destino = new cabecalhoTransacaoDestino();
            solicitacao.cabecalho.destino.Item = registroANS;


            #endregion DESTINO

            solicitacao.cabecalho.Padrao = dm_versao.Item30303;

            #region PROCEDIMENTOS
            List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados> listProcedimento = new List<ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados>();

            ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados procedimento = new ctm_spsadtSolicitacaoGuiaProcedimentosSolicitados();
            procedimento.procedimento = new ct_procedimentoDados();
            procedimento.procedimento.codigoProcedimento = codigoProcedimento;
            procedimento.procedimento.descricaoProcedimento = descricaoProcedimento;
            procedimento.procedimento.codigoTabela = dm_tabela.Item00;
            listProcedimento.Add(procedimento);

            ctm_spsadtSolicitacaoGuia guiaSADT = new ctm_spsadtSolicitacaoGuia();
            guiaSADT.procedimentosSolicitados = listProcedimento.ToArray();


            ct_solicitacaoProcedimento ctSoliciatacao = new ct_solicitacaoProcedimento();
            ctm_spsadtSolicitacaoGuia sadtGuia = new ctm_spsadtSolicitacaoGuia();


            // sadtGuia.dadosBeneficiario
            //ctSoliciatacao.Item
            //ctSoliciatacao.Item.

            // solicitacao.solicitacaoProcedimento = ct_solicitacaoProcedimento();

            #endregion PRTOCEDIMENTOS

            try
            {
                tissSolicitacaoProcedimento_BindingClient envia = new tissSolicitacaoProcedimento_BindingClient();
                autorizacaoProcedimentoWS retorno = envia.tissSolicitacaoProcedimento_Operation(solicitacao);
                retorno = retorno;
            }
            catch (Exception ex)
            {
                throw;
            }














            return null;
        }
    }
}