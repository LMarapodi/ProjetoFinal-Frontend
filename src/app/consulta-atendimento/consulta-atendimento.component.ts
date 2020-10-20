import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulta-atendimento',
  templateUrl: './consulta-atendimento.component.html',
  styleUrls: ['./consulta-atendimento.component.css']
})
export class ConsultaAtendimentoComponent implements OnInit {

  mensagemSucessoExclusao: string;
  listagemDeAtendimentos = [];
  mensagemSucessoEdicao: string;
  mensagemErroEdicao: string;
  errosNome = [];
  errosEmail = [];
  errosCpf = [];

  constructor(private HttpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultaAtendimentos();
  }

  consultaAtendimentos() {

    this.HttpClient.get(environment.apiUrlAtendimento)
      .subscribe
      (
        (success: any[]) => {
          this.listagemDeAtendimentos = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  excluirAtendimento(id) {
    if (window.confirm('Deseja Excluir Este Atendimento ?')) {
      this.HttpClient.delete(environment.apiUrlAtendimento + "/" + id, { responseType: 'text' })
        .subscribe(
          success => {
            this.mensagemSucessoExclusao = success;
            this.consultaAtendimentos();
          },
          e => {
            console.log(e);
          }
        )
    }
  }

  exibirAtendimento(item) {

  }

  limparMensagemSucessoEdicao() {
    this.mensagemSucessoEdicao = "";
  }
  limparMensagemErroEdicao() {
    this.mensagemErroEdicao = "";
  }
  limparMensagemSucessoExclusao() {
    this.mensagemSucessoExclusao = "";
  }
}
