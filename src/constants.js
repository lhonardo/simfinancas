import account from "./assets/img/account.png";
import stockMarket from "./assets/img/stockMarket.png";
import fixedIncome from "./assets/img/fixedIncome.png";
import rareMaterial from "./assets/img/rareMaterial.png";

import stockMarketPoints from "./assets/img/stockMarketPoints.png";
import inflation from "./assets/img/inflation.png";
import interestRate from "./assets/img/interestRate.png";
import good from "./assets/img/good.png";
import bad from "./assets/img/bad.png";
import regular from "./assets/img/regular.png";
import info from "./assets/img/info.png";

export const DEFINITIONS = {
    wallet: {
        account: {
            name: 'Conta corrente',
            description: 
                `
                É quanto você tem disponível para investir. O montante que você deixar na conta corrente não sofrerá influência do mercado, ou seja, não irá gerar rendimentos nem perdas.
                Em geral não há vantagens em deixar o dinheiro parado em conta corrente, pois a mesma não gera rendimentos e o poder de compra poderá se defazar devido a inflação.
                `,
            link: 'https://pt.wikipedia.org/wiki/Conta-corrente',
            icon: account 
        },
        stockMarket: {
            name: 'Renda Variável (Ações)',
            description: 
                `
                Investimentos de renda variável tem retorno imprevisível no momento do investimento. O valor varia conforme as condições do mercado.
                Alguns dos principais exemplos de Renda Variável: Ações, Câmbio e Criptomoedas. 
                Para essa simulação será usado apenas a bolsa de valores, que é o mercado onde se negociam ações de empresas de capital aberto (públicas ou privadas).
                Risco: Investimento arriscado.
                `,
            icon: stockMarket,
            affectedBy: 'stockMarketPoints',
        },
        fixedIncome: {
            name: 'Renda fixa (Juros)',
            description: `
                Renda fixa é todo tipo de investimento que tem regras de rendimento pré definidas.
                Ao aplicar, o investidor já fica sabendo o prazo e a taxa de rendimento e o índice que será usado para valorizar o dinheiro investido.
                Alguns dos principais exemplos de Renda Fixa: Poupança, Tesouro Direto (títulos do governo) e CDBs (títulos de bancos com índice CDI).
                Nessa simulação, ao investir em renda fixa o retorno do investimento será baseado na taxa de juros do mercado.
                Risco: Investimento seguro.
            `,
            icon: fixedIncome,
            affectedBy: 'interestRate',
        },
        rareMaterial: {
            name: 'Metal precioso (Ouro)',
            description: `
                Ouro pode ser uma opção de investimento, por ser um ativo de negociação mundial, se caracteriza como uma diversificação altamente segura.
                Seu estoque global é limitado e estimado em aproximadamente 170 mil toneladas. É esta escassez que o torna tão especial. É uma forma de proteção e garantia contra a desvalorização de patrimônio em períodos de inflação e crise financeira.
                Em tempos de alta volatilidade, os investidores tendem a recorrem ao metal. Como consequência da lei da oferta e da procura, seu valor sobe.
                Risco: Investimento conservador.
            `,
            icon: rareMaterial,
            affectedBy: 'rareMaterial',
        },
    },
    world: {
        inflation: {
            name: 'Inflação',
            description: `
                Inflação é o nome dado ao aumento dos preços de produtos e serviços. 
                Ela é calculada pelos índices de preços, comumente chamados de índices de inflação. 
                No Brasil O IBGE produz dois dos mais importantes índices de preços: o IPCA, considerado o oficial pelo governo federal, e o INPC.
            `,
            icon: inflation,
        },
        interestRate: {
            name: 'Taxa básica de juros',
            description: `
                A taxa básica de juros no Brasil é conhecida como taxa Selic. A meta da Selic é definida pelo Comitê de Política Monetária, o Copom.
                O viés da taxa e sua meta são definidos em uma reunião da diretoria do Banco Central. E somente os diretores e o presidente podem votar e definir o percentual.
                Uma taxa alta de juros tende a beneficiar os investimentos em renda fixa a frear a inflação. 
            `,
            icon: interestRate,
        },
        stockMarketPoints: {
            name: 'Bolsa de valores',
            description: `
                A bolsa de valores é um mercado financeiro onde são negociados as ações e ativos de diversas empresas entre outras opções. 
                É um ambiente seguro onde há a compra e venda de ações.
                Assim como outros mercados, a principal lei que rege os negócios é a da oferta e procura, portanto, os valores e pontuações podem variar, devido a diversas influências políticas e econômicas.
            `,
            icon: stockMarketPoints,
        },
        rareMaterial: {
            name: 'Metal precioso (barra de 100g)',
            description: `
                No mercado financeiro brasileiro somente o ouro é considerado um ativo financeiro, equanto a prata e outros metais não são (até o momento, maio. 2021).
                Em outros países diversos metais preciosos são negociados como ativos financeiros. 
            `,
            icon: rareMaterial
        },
    },
    endMonthInfo: {
        regular: {
            title: 'Mês normal',
            description: 'Este foi um mês sem grandes acontecimentos e o mercado se comportou como os analistas previam.',
            icon: regular,
        },
        bad: {
            title: 'Atenção: algo está preocupando o mercado!',
            description: `
            Fique atento ao mercado, algo parece estar preocupando os investidores e vai afetar os próximos meses.
            Dica: Tome cuidado com investimentos de renda variável durante períodos de incerteza.`,
            icon: bad,
        },
        good: {
            title: 'Atenção: algo está animando o mercado!',
            description: `
            Fique atento ao mercado, algo parece estar animando os investidores e vai afetar os próximos meses.
            Dica: Vale a pena uma maior atenção aos investimentos de renda variável.`,
            icon: good,
        },
    }
}

export const infoIcon = info;