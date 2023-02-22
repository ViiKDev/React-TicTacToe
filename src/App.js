import React, { useState } from 'react';
import './App.css'

export default function App() {

  const jogoInicial = [['', '', ''], ['', '', ''], ['', '', '']]
  const [jogo, setJogo] = useState(jogoInicial)
  const [simboloAtual, setSimboloAtual] = useState('X')
  const [jogando, setJogando] = useState(true)

  const tabuleiro = (j) => {
    return (
      <div className="tabu">
        <div className="tabu-linha">
          <div className="casa" data-pos='00' onClick={(e) => jogar(e)}>{j[0][0]}</div>
          <div className="casa" data-pos='01' onClick={(e) => jogar(e)}>{j[0][1]}</div>
          <div className="casa" data-pos='02' onClick={(e) => jogar(e)}>{j[0][2]}</div>
        </div>
        <div className="tabu-linha">
          <div className="casa" data-pos='10' onClick={(e) => jogar(e)}>{j[1][0]}</div>
          <div className="casa" data-pos='11' onClick={(e) => jogar(e)}>{j[1][1]}</div>
          <div className="casa" data-pos='12' onClick={(e) => jogar(e)}>{j[1][2]}</div>
        </div>
        <div className="tabu-linha">
          <div className="casa" data-pos='20' onClick={(e) => jogar(e)}>{j[2][0]}</div>
          <div className="casa" data-pos='21' onClick={(e) => jogar(e)}>{j[2][1]}</div>
          <div className="casa" data-pos='22' onClick={(e) => jogar(e)}>{j[2][2]}</div>
        </div>
      </div>
    )
  }

  const btnJogarNovamente = () => {
    if (!jogando) {
      return <button onClick={() => reiniciar()}>Jogar Novamente</button>
    }
  }

  const verificaVitoria = () => {
    //linhas
    let pontos = 0
    let vitoria = false
    for (let l = 0; l < 3; l++) {
      pontos = 0;
      for (let c = 0; c < 3; c++) {
        if (jogo[l][c] == simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }
    //colunas
    for (let c = 0; c < 3; c++) {
      pontos = 0;
      for (let l = 0; l < 3; l++) {
        if (jogo[l][c] == simboloAtual) {
          pontos++
        }
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }
    //diagonais
    pontos = 0
    for (let d = 0; d < 3; d++) {
      if (jogo[d][d] == simboloAtual) {
        pontos++
      }
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }
    pontos = 0
    let l = 0
    for (let c = 2; c >= 0; c--) {
      if (jogo[l][c] == simboloAtual) {
        pontos++
      }
      l++
      if (pontos >= 3) {
        vitoria = true
        break
      }
    }
    if (!vitoria) {
      let casasCheias = 0
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (jogo[i][j] != '') {
            casasCheias++
          }
        }
      }
      if (casasCheias == 9) {
        vitoria = "draw"
      }
    }
    return vitoria
  }

  const trocaJogador = () => {
    simboloAtual == 'X' ? setSimboloAtual('O') : setSimboloAtual('X')
  }

  const retPos = (e) => {
    const p = e.target.getAttribute('data-pos')
    const pos = [parseInt(p.substring(0, 1)), parseInt(p.substring(1, 2))]
    return pos
  }

  const verificaEspacoVazio = (e) => {
    if (jogo[retPos(e)[0]][retPos(e)[1]] == '') {
      return true
    } else {
      return false
    }
  }

  const jogar = (e) => {
    if (jogando) {
      if (verificaEspacoVazio(e)) {
        jogo[retPos(e)[0]][retPos(e)[1]] = simboloAtual
        let x = verificaVitoria()
        if (x == true) {
          alert('Jogador "' + simboloAtual + '" venceu!')
          setJogando(false)
        } else if (x == false) {
          trocaJogador()
        } else {
          alert('Empate')
          setJogando(false)
        }
      } else {
        alert('Espaço não disponível!')
      }
    }
  }

  const reiniciar = () => {
    setJogando(true)
    setJogo(jogoInicial)
    setSimboloAtual('X')
  }

  return (
    <main>
      <div>
        <p>{jogando == true ? 'Quem joga: ' + simboloAtual : verificaVitoria() == "draw" ? 'Empate' : 'Vencedor: ' + simboloAtual}</p>
      </div>
      <div>
        {tabuleiro(jogo)}
      </div>
      <div>
        {btnJogarNovamente()}
      </div>
    </main>
  )
}