import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as converter from 'xml-js'

@Injectable({
  providedIn: 'root'
})
export class CalcularFreteCorreiosService {

  constructor(private _http: HttpClient,
              ) { }

  public async calcularFrete(){

    let args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '81200100',
      sCepDestino: '21770200',
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço
      nVlDiametro: '0',
    };
    let httpParams = this.montarParametrosCorreiosRequest()

    let frete =  await lastValueFrom(this._http.get('http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx', {responseType: 'text', params: httpParams}))

    let test = converter.xml2json(frete)
    let test3 = converter.xml2js(frete)

    console.log(test3.elements[0].elements[0])
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

  formatJsonXmlConversion(json: any){
    let obj
    let jsonArray = []
    json.elements[0].elements[0].elements.forEach((element: any) => {
      obj = {
        
      }
    });
  }
 }

