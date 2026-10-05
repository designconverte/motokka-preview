/*! sensor */
(function(){'use strict';var w=window;var d=document;var raiz=d.documentElement;var cfg=raiz.dataset;if(w.SENSOR){return;}
var SITE=cfg.site||'site';var COLETOR=cfg.semServidor==='1'?'':(cfg.coletor||'/api/e.php');var GTM=cfg.gtm||'';var GA4=GTM?'':(cfg.ga4||'');var ESPELHO=GTM?(cfg.ga4Espelho||''):'';var AW=GTM?'':(cfg.aw||'');var AW_CONVERSAO=cfg.awConversao||'';var SERVIDOR=cfg.servidor==='todos'?'todos':'leads';var PIXEL=cfg.metaPixel||'';var OPT_IN=cfg.consentimento==='opt-in';var POLITICA=cfg.politica||'1';var ESPERA_GA=4000;var MINUTOS_SESSAO=30;var NOMES_PIXEL={page_view:'PageView',view_item:'ViewContent',generate_lead:'Lead'};var PESSOAIS=['telefone','nome_lead','email_lead'];var agora=function(){return new Date().getTime();};var novoId=function(prefixo){return prefixo+agora().toString(36)+Math.random().toString(36).slice(2,10);};function lerCookie(nome){var partes=d.cookie?d.cookie.split('; '):[];for(var i=0;i<partes.length;i+=1){if(partes[i].indexOf(nome+'=')===0){return partes[i].slice(nome.length+1);}}
return'';}
function guardar(area,chave,valor){try{w[area].setItem(chave,JSON.stringify(valor));}catch(e){}}
function recuperar(area,chave){try{return JSON.parse(w[area].getItem(chave)||'null');}catch(e){return null;}}
var CHAVE_CONSENTIMENTO=SITE+':consentimento';w.dataLayer=w.dataLayer||[];function gtag(){w.dataLayer.push(arguments);}
if(!w.gtag){w.gtag=gtag;}
function sinais(aceitou){var v=aceitou?'granted':'denied';return{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,personalization_storage:v,functionality_storage:'granted',security_storage:'granted'};}
var escolha=recuperar('localStorage',CHAVE_CONSENTIMENTO);if(!escolha||escolha.politica!==POLITICA){escolha=null;}
var consentimento={decidido:Boolean(escolha),aceitou:escolha?escolha.aceitou===true:!OPT_IN};var contavaAnuncio=consentimento.aceitou;gtag('consent','default',sinais(consentimento.aceitou));var gaNavegador=null;var fila=[];function carregar(src,aoCarregar,aoFalhar){var s=d.createElement('script');s.async=true;s.src=src;s.onload=aoCarregar;s.onerror=aoFalhar;d.head.appendChild(s);}
function resolverGa(valor){if(gaNavegador!==null){return;}
gaNavegador=valor;var pendentes=fila;fila=[];for(var i=0;i<pendentes.length;i+=1){postar(pendentes[i],false);}}
if(GTM){w.dataLayer.push({'gtm.start':agora(),event:'gtm.js'});carregar('https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(GTM),function(){resolverGa(Boolean(w.google_tag_manager));},function(){resolverGa(false);});if(ESPELHO){gtag('js',new Date());gtag('config',ESPELHO,{send_page_view:false});carregar('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ESPELHO),null,null);}}else if(GA4||AW){gtag('js',new Date());if(GA4){gtag('config',GA4,{send_page_view:false});}
if(AW){gtag('config',AW);}
carregar('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(GA4||AW),function(){resolverGa(Boolean(GA4)&&Boolean(w.google_tag_manager));},function(){resolverGa(false);});}else{resolverGa(false);}
setTimeout(function(){resolverGa(false);},ESPERA_GA);var pixelPedido=false;function carregarPixel(){if(!PIXEL||pixelPedido||w.fbq){return;}
pixelPedido=true;var n=function(){if(n.callMethod){n.callMethod.apply(n,arguments);}else{n.queue.push(arguments);}};w.fbq=n;if(!w._fbq){w._fbq=n;}
n.push=n;n.loaded=true;n.version='2.0';n.queue=[];carregar('https://connect.facebook.net/en_US/fbevents.js',function(){},function(){});var visitante=lerCookie('_'+SITE);if(visitante){w.fbq('init',PIXEL,{external_id:visitante});}else{w.fbq('init',PIXEL);}}
if(consentimento.aceitou){carregarPixel();}
var CHAVE_SESSAO=SITE+':sessao';var sessao=recuperar('sessionStorage',CHAVE_SESSAO);if(!sessao||agora()-sessao.visto>MINUTOS_SESSAO*60000){sessao={id:novoId('s'),inicio:agora()};}
sessao.visto=agora();guardar('sessionStorage',CHAVE_SESSAO,sessao);var visivelDesde=d.visibilityState==='visible'?agora():0;var engajamentoPendente=0;var engajamentoTotal=0;var engajamentoNoUltimoFechamento=-1;var rolagemMaxima=0;function fecharTrecho(){if(!visivelDesde){return;}
var trecho=agora()-visivelDesde;engajamentoPendente+=trecho;engajamentoTotal+=trecho;visivelDesde=d.visibilityState==='visible'?agora():0;}
function consumirEngajamento(){fecharTrecho();var valor=engajamentoPendente;engajamentoPendente=0;return valor;}
var DISPOSITIVO=w.innerWidth<720?'mobile':(w.innerWidth<1080?'tablet':'desktop');function postar(carga,saindo){if(!COLETOR){return;}
carga.ga_navegador=gaNavegador;var corpo=JSON.stringify(carga);try{if(saindo&&navigator.sendBeacon){if(navigator.sendBeacon(COLETOR,new Blob([corpo],{type:'application/json'}))){return;}}
w.fetch(COLETOR,{method:'POST',headers:{'Content-Type':'application/json'},body:corpo,credentials:'same-origin',keepalive:true})['catch'](function(){});}catch(e){}}
function vaiAoServidor(nome,params){if(SERVIDOR==='todos'){return true;}
return nome==='generate_lead'&&Boolean(params.telefone||params.nome_lead);}
function enviarAoServidor(carga,saindo){if(SERVIDOR==='todos'&&gaNavegador===null&&!saindo){fila.push(carga);return;}
if(saindo&&fila.length){var pendentes=fila;fila=[];for(var i=0;i<pendentes.length;i+=1){postar(pendentes[i],true);}}
postar(carga,saindo);}
function item(params){if(!params.item_id){return null;}
var it={item_id:params.item_id,quantity:1};if(params.item_name){it.item_name=params.item_name;}
if(params.item_brand){it.item_brand=params.item_brand;}
if(params.item_category){it.item_category=params.item_category;}
if(params.cor){it.item_variant=params.cor;}
if(params.value){it.price=params.value;}
return it;}
function avisarGoogle(nome,params,idEvento){var dados={};for(var k in params){if(Object.prototype.hasOwnProperty.call(params,k)){dados[k]=params[k];}}
var it=item(params);if(it){dados.items=[it];}
dados.event_id=idEvento;if(GTM){var camada={event:nome};for(var c in dados){if(Object.prototype.hasOwnProperty.call(dados,c)){camada[c]=dados[c];}}
w.dataLayer.push(camada);if(ESPELHO){dados.send_to=ESPELHO;gtag('event',nome,dados);}
return;}
if(GA4){gtag('event',nome,dados);}
if(AW&&AW_CONVERSAO&&nome==='generate_lead'){gtag('event','conversion',{send_to:AW+'/'+AW_CONVERSAO,transaction_id:idEvento,value:params.value||undefined,currency:params.value?(params.currency||'BRL'):undefined});}}
function avisarPixel(nome,params,idEvento){if(!consentimento.aceitou||!w.fbq||!NOMES_PIXEL[nome]){return;}
var dados={};if(params.item_id){dados.content_ids=[params.item_id];dados.content_type='product';if(params.item_name){dados.content_name=params.item_name;}
if(params.item_category){dados.content_category=params.item_category;}}
if(params.value&&params.currency){dados.value=params.value;dados.currency=params.currency;}
if(params.origem){dados.origem=params.origem;}
if(params.cor){dados.cor=params.cor;}
if(params.item_brand){dados.marca=params.item_brand;}
if(params.interesse){dados.interesse=params.interesse;}
w.fbq('track',NOMES_PIXEL[nome],dados,{eventID:idEvento});}
function evento(nome,params,opcoes){params=params||{};opcoes=opcoes||{};var idEvento=novoId('e');var limpos={};var completos={};for(var k in params){if(Object.prototype.hasOwnProperty.call(params,k)&&params[k]!==undefined&&params[k]!==null){completos[k]=params[k];if(PESSOAIS.indexOf(k)===-1){limpos[k]=params[k];}}}
limpos.dispositivo=DISPOSITIVO;completos.dispositivo=DISPOSITIVO;if(!opcoes.semGoogle&&!opcoes.somenteServidor){avisarGoogle(nome,limpos,idEvento);}
if(opcoes.somenteNavegador||opcoes.somenteGa4){return;}
if(!opcoes.somenteServidor){avisarPixel(nome,limpos,idEvento);}
if(!vaiAoServidor(nome,completos)){return;}
sessao.visto=agora();guardar('sessionStorage',CHAVE_SESSAO,sessao);enviarAoServidor({nome:nome,event_id:idEvento,session_id:sessao.id,sessao_inicio:Math.floor(sessao.inicio/1000),engajamento_ms:consumirEngajamento(),params:completos,url:w.location.href,referrer:d.referrer,titulo:d.title,consent:{analytics:consentimento.aceitou,ad:consentimento.aceitou}},Boolean(opcoes.saindo));}
function medirRolagem(){var pendente=false;function conferir(){pendente=false;var rolavel=raiz.scrollHeight-w.innerHeight;if(rolavel<=0){return;}
var pct=Math.min(100,Math.round((w.scrollY/rolavel)*100));if(pct>rolagemMaxima){rolagemMaxima=pct;}}
w.addEventListener('scroll',function(){if(pendente){return;}
pendente=true;w.requestAnimationFrame(conferir);},{passive:true});}
function fechamento(){if(SERVIDOR!=='todos'){return;}
fecharTrecho();if(engajamentoTotal<1000){return;}
if(engajamentoNoUltimoFechamento>=0&&engajamentoTotal-engajamentoNoUltimoFechamento<15000){return;}
engajamentoNoUltimoFechamento=engajamentoTotal;evento('fechamento',{segundos_engajado:Math.round(engajamentoTotal/1000),rolagem_maxima:rolagemMaxima},{somenteServidor:true,saindo:true});}
function aplicarConsentimento(aceitou){consentimento.decidido=true;consentimento.aceitou=aceitou;guardar('localStorage',CHAVE_CONSENTIMENTO,{politica:POLITICA,aceitou:aceitou,em:new Date().toISOString()});gtag('consent','update',sinais(aceitou));if(w.fbq){w.fbq('consent',aceitou?'grant':'revoke');}
if(aceitou){carregarPixel();if(!contavaAnuncio){contavaAnuncio=true;evento('page_view',{tardio:true},{semGoogle:true});}}
w.dispatchEvent(new CustomEvent('site:consentimento',{detail:{aceitou:aceitou}}));}
function ligarBanner(){var banner=d.getElementById('consentimento');if(!banner||banner.dataset.ligado==='1'){return banner;}
banner.dataset.ligado='1';banner.addEventListener('click',function(e){var botao=e.target.closest('[data-consentimento]');if(!botao){return;}
aplicarConsentimento(botao.dataset.consentimento==='aceitar');banner.classList.remove('is-visivel');setTimeout(function(){banner.hidden=true;},300);});return banner;}
function mostrarBanner(atraso){var banner=ligarBanner();if(!banner){return;}
banner.hidden=false;w.requestAnimationFrame(function(){setTimeout(function(){banner.classList.add('is-visivel');},atraso);});}
function reabrirBanner(){consentimento.decidido=false;mostrarBanner(0);}
function escutar(){w.addEventListener('site:evento',function(e){var detalhe=e.detail||{};if(detalhe.nome){evento(detalhe.nome,detalhe.params,detalhe.opcoes);}});d.addEventListener('click',function(e){if(!e.target||!e.target.closest){return;}
if(e.target.closest('#rever-cookies, [data-cookies-reabrir]')){reabrirBanner();return;}
var link=e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');if(!link||link.dataset.rastreado==='1'){return;}
var dono=link.closest('[data-origem]');evento('generate_lead',{origem:dono?dono.dataset.origem:'pagina'});});d.addEventListener('visibilitychange',function(){if(d.visibilityState==='hidden'){fechamento();}else{visivelDesde=agora();}});w.addEventListener('pagehide',fechamento);}
function iniciar(){evento('page_view',{idioma:navigator.language||'',tela:w.screen.width+'x'+w.screen.height});medirRolagem();escutar();if(consentimento.decidido){ligarBanner();}else{mostrarBanner(600);}}
w.SENSOR={evento:evento,consentimento:function(){return{decidido:consentimento.decidido,aceitou:consentimento.aceitou};},reabrir:reabrirBanner};if(d.readyState==='loading'){d.addEventListener('DOMContentLoaded',iniciar);}else{iniciar();}})();
