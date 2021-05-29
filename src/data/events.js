export const BAD_EVENTS = {
    coronaVirus: {
        name: 'Pandemia de Covid-19',
        description: `
            Descoberto em 2019 e declarado uma pandemia em 11 de março de 2020, o corona virus causou um reação muito negativa no mercado financeiro.
            No início com o mercado muito apreensivo sobre a gravidade da pandemia, praticamente todas as bolsas de valores caíram, com os investidores retirando o dinheiro e aplicando em investimentos considerados mais seguros, como o ouro, por exemplo. 
        `,
        year: 2020,
        type: 'bad',
        months: [
            {
                inflation: 0.02,
                interestRate: -0.02,
                stockMarketPoints: -0.15,
                rareMaterial: 0.15,
            },
            {
                inflation: 0.05,
                interestRate: -0.05,
                stockMarketPoints: -0.20,
                rareMaterial: 0.10,
            },
            {
                inflation: 0.01,
                interestRate: 0,
                stockMarketPoints: -0.10,
                rareMaterial: 0.05,
            },
        ],
    },
    globalFinancialCrisis: {
        name: 'Crise imobiliária',
        description: `
            Foi motivada pela concessão desenfreada de créditos imobiliários e por falhas na regulação do sistema financeiro que permitiam a transferência dos créditos hipotecários em série.
        `,
        year: 2008,
        type: 'bad',
        months: [
            {
                inflation: 0.05,
                interestRate: -0.05,
                stockMarketPoints: -0.15,
                rareMaterial: 0.15,
            },
            {
                inflation: 0.07,
                interestRate: -0.10,
                stockMarketPoints: -0.10,
                rareMaterial: 0.10,
            },
            {
                inflation: 0.06,
                interestRate: -0.06,
                stockMarketPoints: -0.12,
                rareMaterial: 0.02,
            },
        ],
    },
    greatDepression: {
        name: 'Crise',
        description: `
            Também conhecida como Grande Depressão, foi uma forte recessão econômica que atingiu o capitalismo internacional no final da década de 1920. 
            Marcou a decadência do liberalismo econômico, naquele momento, e teve como causas a superprodução e especulação financeira.
            Milhares de pessoas resolveram vender as suas ações no dia 24 de outubro de 1929, no que ficou conhecido como Quinta-feira Negra. Nesse dia, mais de 12 milhões de ações foram colocadas à venda, o que deixou o mercado em pânico. Imediatamente o valor das ações despencou, e bilhões de dólares desapareceram. A economia americana quebrou.
        `,
        year: 1929,
        type: 'bad',
        months: [
            {
                inflation: 0.02,
                interestRate: -0.05,
                stockMarketPoints: -0.15,
                rareMaterial: 0.05,
            },
            {
                inflation: 0.03,
                interestRate: -0.05,
                stockMarketPoints: -0.25,
                rareMaterial: 0.10,
            },
            {
                inflation: 0.02,
                interestRate: -0.10,
                stockMarketPoints: -0.53,
                rareMaterial: 0.20,
            },
        ],
    },
}

export const GOOD_EVENTS = {
    techRunning: {
        name: 'Corrida pela tecnologia',
        description: `
            a Bolsa brasileira registrou uma alta de 33,89% em 15 de janeiro de 1999, em meio a especulações que posteriormente levariam à “bolha da internet”. No ano, foram 151,9% de alta do índice, inflado pelas grandes expectativas do setor de tecnologia, em franco crescimento no Brasil e no mundo.
        `,
        year: 1999,
        type: 'good',
        months: [
            {
                inflation: 0,
                interestRate: 0.02,
                stockMarketPoints: 0.15,
                rareMaterial: -0.10,
            },
            {
                inflation: 0.01,
                interestRate: 0.10,
                stockMarketPoints: 0.34,
                rareMaterial: -0.08,
            },
            {
                inflation: 0,
                interestRate: 0,
                stockMarketPoints: 0.22,
                rareMaterial: -0.05,
            },
        ],
    },
    collorPlan: {
        name: 'Plano collor II',
        description: `
            No dia 4 de fevereiro de 1991, o Ibovespa teve a maior alta da história, de 36,05%, em um único pregão. O país atravessava um verdadeiro caos econômico no começo da década de 90. A inflação de quase 1200% em 1990, muita incerteza cambial e sucessivos equívocos na política econômica levavam o mercado a agir baseado na expectativa pelo sucesso de políticas de controle dos preços.
        `,
        year: 1991,
        type: 'good',
        months: [
            {
                inflation: 0.01,
                interestRate: 0.02,
                stockMarketPoints: 0.15,
                rareMaterial: -0.10,
            },
            {
                inflation: 0,
                interestRate: 0.10,
                stockMarketPoints: 0.36,
                rareMaterial: -0.08,
            },
            {
                inflation: 0.01,
                interestRate: 0.05,
                stockMarketPoints: 0.30,
                rareMaterial: -0.05,
            },
        ],
    },
}

export const ALL_EVENTS = {
    ...BAD_EVENTS,
    ...GOOD_EVENTS,
}