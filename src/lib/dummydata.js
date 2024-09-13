export const listData = [
    {
        title: "Chevrolet Onix 2020", // Chevrolet Onix 2020 é um exemplo
        brand: ["Audi", "Bentley", "BMW", "BYD", "Chevrolet",
        "Citroen", "Ferrari", "Fiat", "Ford", "Honda", "Hyundai",
        "Jaguar", "Jeep", "Kia", "Lamborghini", "LandRover", "Maserati",
        "McLaren", "MercedesBenz", "Mitsubishi", "Nissan",
        "Peugeot", "Porsche", "Renault", "RollsRoyce",
        "Suzuki", "Tesla", "Toyota", "Volkswagen", "Yamaha"],
        condition: ["Novo", "Usado"],
        transmission: ["Manual", "Automatico"],
        buyOrRent: ["Alugar", "Comprar"],
        priceToRent: 150, // Se for "Alugar" em buyOrRent, 150 é um exemplo
        priceToBuy: 150000, // Se for "Comprar" em buyOrRent, 150000 é um exemplo
        fuel: ["Flex", "Diesel", "Eletrecidade", "Gasolina", "Gas"],
        color: ["Vermelho", "Amarelo", "Azul", "Bege", "Ciano", "Cinza", "Dourado",
            "Laranja", "Marrom", "Prata", "Preto", "Purpura", "Rosa", "Roxo",
            "Turquesa", "Verde"],
        city: "Duque de Caxias", // Duque de Caxias é um exemplo é um exemplo, pode ser qualquer lugar do mundo(mas de preferência no Brasil)
        address: "Duque de Caxias, RJ - Brasil", // Duque de Caxias, RJ - Brasil é um exemplo, pode ser qualquer lugar do mundo(mas de preferência no Brasil)
    },
]

export const singlePostData = [
    {
        id: 1,
        title: "Ford Fiesta 2018",
        brand: "Ford",
        images: [
            ["https://diego-sant.github.io/QuizApp/img/img279.svg"],
            "https://diego-sant.github.io/QuizApp/img/img280.svg",
            ["https://diego-sant.github.io/QuizApp/img/img279.svg"],
            ["https://diego-sant.github.io/QuizApp/img/img279.svg"],
        ],
        condition: "Usado",
        transmission: "Manual",
        buyOrRent: "Alugar",
        priceToRent: 120,
        fuel: "Flex",
        color: "Prata",
        address: "São Paulo, SP - Brasil",
        description: "O Ford Fiesta 2018 é um hatchback compacto com um design moderno e elegante. Oferece um interior bem equipado com sistema de infotainment SYNC 3, compatível com Apple CarPlay e Android Auto, e um motor eficiente de 1.6 litro, disponível com transmissão manual de 5 marchas ou automática de 6 marchas. O Fiesta combina estilo, conforto e tecnologia, com recursos de segurança como controle de estabilidade e airbags para uma condução segura e agradável.",
        general1Title: "Design Moderno",
        general1Desc: "Visual arrojado e elegante.",
        general2Title: "Tecnologia Avançada",
        general2Desc: "Sistema SYNC 3 com Apple CarPlay e Android Auto.",
        general3Title: "Desempenho Eficiente",
        general3Desc: "Motor 1.6 litro com boas opções de transmissão.",
        latitude: -23.59105941675351,
        longitude: -46.69087039560111,
    },
];

export const userData = {
    id: 1,
    name: "Diego",
    images: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
}