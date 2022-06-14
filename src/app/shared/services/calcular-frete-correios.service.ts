import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as xml2js from 'xml2js';


@Injectable({
  providedIn: 'root'
})
export class CalcularFreteCorreiosService {

  constructor(private _http: HttpClient,
              ) { }

  public  calcularFrete(){
    const headers = new HttpHeaders().set('Content-Type', 'text/xml; charset=iso-8859-1');
    let xmlCorreiosResponse =  lastValueFrom( this._http.get(`http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?`,{ headers ,params:this.montarParametrosCorreiosRequest(), }))

    //let temp = xml2js.parseStringPromise(xmlCorreiosResponse)
    console.log(xmlCorreiosResponse)
  }

  private montarParametrosCorreiosRequest(){//nCdEmpresa:string, sDsSenha:string, sCepOrigem:string, sCepDestino:string,
    //nVlPeso:string, nCdFormato:string, nVlComprimento:string, nVlAltura:string, nVlLargura:string, sCdMaoPropria:string,
    //nVlValorDeclarado:string, sCdAvisoRecebimento:string, nCdServico:string, nVlDiametro:string, StrRetorno:string,
    //nIndicaCalculo:string){

    let test ={nCdEmpresa:"08082650",
      sDsSenha:564321,
      sCepOrigem:70002900,
      sCepDestino:"04547000",
      nVlPeso:1,
      nCdFormato:1,
      nVlComprimento:20,
      nVlAltura:20,
      nVlLargura:20,
      sCdMaoPropria:"n",
      nVlValorDeclarado:0,
      sCdAvisoRecebimento:"n",
      nCdServico:"04510",
      nVlDiametro:0,
      StrRetorno:"xml",
      nIndicaCalculo:3}
    let params = new HttpParams().set('nCdEmpresa', test.nCdEmpresa).set('sDsSenha', test.sDsSenha).set('sCepOrigem', test.sCepOrigem)
    .set('sCepDestino', test.sCepDestino).set('nVlPeso', test.nVlPeso).set('nCdFormato', test.nCdFormato).set('nVlComprimento', test.nVlComprimento)
    .set('nVlAltura', test.nVlAltura).set('nVlLargura', test.nVlLargura).set('sCdMaoPropria', test.sCdMaoPropria).set('nVlValorDeclarado', test.nVlValorDeclarado)
    .set('sCdAvisoRecebimento', test.sCdAvisoRecebimento).set('nCdServico', test.nCdServico).set('nVlDiametro', test.nVlDiametro).set('StrRetorno', test.StrRetorno)
    .set('nIndicaCalculo', test.nIndicaCalculo);

    return params;
  }

 }

