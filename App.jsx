import React, {useState, useEffect} from 'react';
import './App.css';

const quadroInicial = Array(9).fill('');

const App = () => {
    const [quadro, setQuadro] = useState(quadroInicial);
    const [jogadorAtual, setJogadorAtual] = useState ('X');
    const [vencedor, setVencedor] = useState('');
    const [empate, setEmpate] = useState(false)


const handleClick = (index) => {
    if (quadro[index] !== '' || vencedor || empate) {
        return
    }

const novoQuadro = [...quadro];
novoQuadro[index] = jogadorAtual;
setQuadro(novoQuadro);

const proximoJogador = jogadorAtual === 'X' ? 'O' : 'X';
setJogadorAtual(proximoJogador);
};

const calcularVencedor = (quadradin) => {
    const condicoesParaVencer = [[0,1,2], [3,4,5], [6,7,8], //linhas
                                [0,3,6], [1,4,7], [2,5,8], //colunas
                                [0,4,8], [2,4,6]]         //diagonais

    for(let condicao of condicoesParaVencer){
        const[a,b,c] = condicao;
        if (
            quadradin[a] &&                     // verifica se tem algum valor dentro da célula
            quadradin[a] === quadradin[b] &&    // verifica se o valor e posição da célula é igual a outra
            quadradin[a] === quadradin[c]       // verifica se o valor e posição da célula é igual a outra
        ) { return quadradin[a] }
    }

    return null; //retorna null se não tiver vencedor
};
useEffect(() => {
    const verificaVencedor = calcularVencedor(quadro);

    if(verificaVencedor){
    setVencedor(verificaVencedor);
} else if (quadro.every(celula => celula !== '')){
    /* every(celula) verifica se todas as celulas estão preeenchidas e não há um vencedor, então empatou*/
    setEmpate(true);;
} else{
    setEmpate(false);
}
}, [quadro]);

const reiniciar = () => {
    setQuadro(quadroInicial);
    setJogadorAtual('X');
    setVencedor('');
    setEmpate(false);
};

return(
    <div clasName="app">
        <h1><center> Jogo da Idosa Anciã.👵🏾 </center></h1>
        <div className='board'>
            {quadro.map ((celula, index) => (
                <div key={index} onClick={() => handleClick(index)} className='cell'>
                    {celula}
                    </div>
            ))}
        </div>

        { vencedor && (
            <div className='winner-message'>
                <h3><p><center> O Jogador '{vencedor}' venceu!</center></p></h3>
                <button onClick={reiniciar}> Reiniciar </button>
                </div>
        )}

{ empate && (
    <div className='draw-message'>
        <h3><p><center> O Jogo empatou! </center></p></h3>
       
            <button onClick={reiniciar}> Reiniciar  </button>
        </div>
      
)}
</div>

);

};

export default App;
