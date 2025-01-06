import { Question } from "../types";

export const questions: Question[] = [
    {
        id: "goal", value: "Qual o objetivo da narrativa?", tips: [
            "Criar um vídeo para o TikTok",
            "Contar uma história",
            "Vender um produto",
            "Passar uma informação"
        ]
    },
    {
        id: "targetAudience.profile", value: "Qual é o perfil cultural, social e/ou profissional do público-alvo da sua narrativa?", tips: [
            "Pessoas interessadas em cinema",
            "Skatistas",
            "Músicos",
            "Jovens",
            "Empreendedores",
            "Programadores"
        ]
    },
    {
        id: "targetAudience.feelings", value: "Como você quer que o seu público-alvo se sinta quando consumir a narrativa?", tips: [
            "Nostálgico",
            "Curioso",
            "Incomodado",
            "Emocionado",
            "Representado"
        ]
    },
    {
        id: "story.about", value: "Sobre o que ou quem é a sua narrativa", tips: [
            "Um jovem skatista que quer participar das Olimpíadas",
            "Um programador que quer usar a tecnologia parar melhorar a vida das pessoas",
            "Uma cidade que enfrenta problemas climáticos"
        ]
    },
    {
        id: "story.climax", value: "Há um clímax/ponto-alto na narrativa?", nullable: true, tips: [
            "O skatista conhece um app que mapeia seu desenvolvimento no skate",
            "O programador cria um projeto social para ensinar programação para pessoas em comunidades",
            "A cidade passa por uma catástrofe histórica"
        ]
    },
    {
        id: "story.moral", value: "Existe alguma lição de moral ou reflexão que final que sua narrativa queira causar?", nullable: true, tips: [
            "Atletas precisam gerenciar o seu progresso para obter bons resultados",
            "Uma pequena inciativa pode causar grandes impactos",
            "Cuide da natureza antes que seja tarde",
        ]
    },
    {
        id: "structure.soundsLike", value: "Como você quer que a narrativa soe?", tips: [
            "Humorístico",
            "Poético",
            "Misterioso",
            "Épica",
            "Realista",
            "Formal",
            "Informal"
        ]
    },
    {
        id: "structure.creativeRef", value: "Existe alguma referência criativa para sua narrativa?", nullable: true, tips: [
            "Um filme do Jordan Peele",
            "Uma história de Franz Kafka",
            "Um texto de Clarice Lispector",
            "Um vídeo de um produtor de conteúdo tal"
        ]
    },
    {
        id: "structure.density", value: "Qual a densidade da leitura da narrativa?", tips: [
            "Simples e objetiva",
            "Abstrato e profundo",
            "Acessível para crianças ou idosos"
        ]
    },
];