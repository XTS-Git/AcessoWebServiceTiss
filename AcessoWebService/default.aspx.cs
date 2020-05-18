using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Serialization;
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
            solicitacaoProcedimentoWS solicitacao = empacotaDados(numerocarteira, sequencial, codigoProcedimento, descricaoProcedimento,
                                                                  codigoPrestadorNaOperadora, registroANS);



            try
            {
                tissSolicitacaoProcedimento_BindingClient envia = new tissSolicitacaoProcedimento_BindingClient();
                autorizacaoProcedimentoWS retorno = envia.tissSolicitacaoProcedimento_Operation(solicitacao);
                return GetRetornoXmlString(retorno);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [WebMethod]
        public static string geraXML(string numerocarteira, string sequencial, string codigoProcedimento, string descricaoProcedimento,
                                              string codigoPrestadorNaOperadora, string registroANS)
        {
            try
            {

                solicitacaoProcedimentoWS solicitacao = empacotaDados(numerocarteira, sequencial, codigoProcedimento, descricaoProcedimento,
                                                                      codigoPrestadorNaOperadora, registroANS);
                string resposta = GetEnvioXmlString(solicitacao);;
                return  resposta;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        public static solicitacaoProcedimentoWS empacotaDados(string numerocarteira, string sequencial, string codigoProcedimento, string descricaoProcedimento,
                                              string codigoPrestadorNaOperadora, string registroANS)
        {
            try
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
                #endregion PROCEDIMENTOS

                return solicitacao;
            }
            catch (Exception ex)
            {
                throw; // para teste
            }
        }



        #region
        public static string GetRetornoXmlString(autorizacaoProcedimentoWS doc)
        {
            var ns = new XmlSerializerNamespaces();
            ns.Add("ds", "http://www.w3.org/2000/09/xmldsig#");
            ns.Add("ans", "http://www.ans.gov.br/padroes/tiss/schemas");
            var serializer = new XmlSerializer(doc.GetType());

            using (var writer = new Util.StringWriterUTF8())
            {
                serializer.Serialize(writer, doc, ns);

                return writer.ToString();
            }
        }


        public static string GetEnvioXmlString(solicitacaoProcedimentoWS doc)
        {
            var ns = new XmlSerializerNamespaces();
            ns.Add("ds", "http://www.w3.org/2000/09/xmldsig#");
            ns.Add("ans", "http://www.ans.gov.br/padroes/tiss/schemas");
            var serializer = new XmlSerializer(doc.GetType());

            using (var writer = new Util.StringWriterUTF8())
            {
                serializer.Serialize(writer, doc, ns);

                return writer.ToString();
            }
        }

        #endregion


    }


    public static class Util
    {
        public sealed class StringWriterIso : StringWriter
        {
            public override Encoding Encoding { get { return Encoding.GetEncoding("ISO-8859-1"); } }
        }

        public sealed class StringWriterUTF8 : StringWriter
        {
            public override Encoding Encoding { get { return Encoding.GetEncoding("UTF-8"); } }
        }


    }

}

