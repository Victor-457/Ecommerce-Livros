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

  public async calcularFrete(info: any, cepDestino: string){

    let httpParams = this.montarParametrosCorreiosRequest(cepDestino, info.nVlPeso.toString(),
    info.nVlComprimento.toString(), info.nVlAltura.toString(), info.nVlLargura.toString(),
    info.nVlDiametro.toString())

    let fretePac =  await lastValueFrom(this._http.get(
                    'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx',
                    { responseType: 'text', params: httpParams})
                  )

    httpParams = this.montarParametrosCorreiosRequest( cepDestino, info.nVlPeso.toString(), info.nVlComprimento.toString(),
    info.nVlAltura.toString(), info.nVlLargura.toString(), info.nVlDiametro.toString(),"04014")

    let freteSedex =  await lastValueFrom(this._http.get(
                    'http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx',
                    { responseType: 'text', params: httpParams})
                  )

    let frete:any = []

    frete.push(this.formatJsonXmlConversion(
              converter.xml2js(fretePac)
            ))

    frete.push(this.formatJsonXmlConversion(
              converter.xml2js(freteSedex)
            ))

    return frete;
  }

  private montarParametrosCorreiosRequest( sCepDestino:string, nVlPeso:string, nVlComprimento:string, nVlAltura:string, nVlLargura:string, nVlDiametro:string,
    nCdServico:string = '04510', sCdMaoPropria:string = "N", nVlValorDeclarado: number = 0, sCdAvisoRecebimento:string = "N", nCdFormato:number = 1,sCepOrigem: string = "23040150", StrRetorno:string = "xml",
    nIndicaCalculo:string = "3"){

    let params = new HttpParams().set('nCdEmpresa', "").set('sDsSenha', "").set('sCepOrigem', sCepOrigem)
    .set('sCepDestino', sCepDestino).set('nVlPeso', nVlPeso).set('nCdFormato', nCdFormato).set('nVlComprimento', nVlComprimento)
    .set('nVlAltura', nVlAltura).set('nVlLargura', nVlLargura).set('sCdMaoPropria', sCdMaoPropria).set('nVlValorDeclarado', nVlValorDeclarado)
    .set('sCdAvisoRecebimento', sCdAvisoRecebimento).set('nCdServico', nCdServico).set('nVlDiametro', nVlDiametro).set('StrRetorno', StrRetorno)
    .set('nIndicaCalculo', nIndicaCalculo);

    return params;
  }

  private formatJsonXmlConversion(json: any){
    let obj:any

    json.elements[0].elements[0].elements.forEach((element: any) => {
      if(element.elements)
      obj = {
        ...obj,
        [element?.name]: element?.elements[0]?.text
      }
    });

    return obj;
  }
 }

