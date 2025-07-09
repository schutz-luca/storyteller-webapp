import { Question } from "../@types";

export const questions: Question[] = [
    {
        id: "goal", value: "Qual o objetivo da narrativa?", tips: [
            "Criar um vídeo para o TikTok",
            "Engajar seguidores com conteúdo empático",
            "Vender um produto",
            "Posicionar uma marca pessoal",
            "Divulgar uma informação",
            "Contar uma história"
        ]
    },
    {
        id: "targetAudience.profile", value: "Qual é o perfil cultural, social e/ou profissional do público-alvo da sua narrativa?", tips: [
            "Pessoas interessadas em tecnologia",
            "Mulheres empreendedoras",
            "Adolescentes fãs de cultura pop",
            "Pais e mães de crianças pequenas",
            "Pequenos empresários",
            "Skatistas",
            "Músicos",
            "Programadores"
        ]
    },
    {
        id: "targetAudience.feelings", value: "Como você quer que o seu público-alvo se sinta quando consumir a narrativa?", tips: [
            "Motivado a mudar algo em sua vida",
            "Incomodado",
            "Representado",
            "Provocado a refletir sobre um tema",
            "Nostálgico",
            "Inspirado a criar algo novo",
            "Emocionado"
        ]
    },
    {
        id: "story.about", value: "Sobre o que/quem é a sua narrativa", tips: [
            "Uma marca que nasceu na periferia e hoje é conhecida mundialmente",
            "Uma campanha publicitária com impacto social verdadeiro",
            "Um político que se envolveu em polêmicas",
            "Um jovem skatista que quer participar das Olimpíadas",
            "Um programador que quer usar a tecnologia parar melhorar a vida das pessoas",
            "Uma cidade que enfrenta problemas climáticos"
        ]
    },
    {
        id: "story.climax", value: "Há um clímax/ponto-alto na narrativa?", nullable: true, tips: [
            "O político é preso e expõe uma rede de corrupção",
            "O skatista conhece um app que mapeia seu desenvolvimento no skate",
            "O programador cria um projeto social para ensinar programação para pessoas em comunidades",
            "A cidade passa por uma catástrofe natural histórica"
        ]
    },
    {
        id: "story.moral", value: "Existe alguma lição de moral ou reflexão que final que sua narrativa queira causar?", nullable: true, tips: [
            "Seja você mesmo, busque a autenticidade",
            "Uma pequena inciativa pode causar grandes impactos",
            "O feito é mais importante que o perfeito",
            "Atletas precisam gerenciar o seu progresso para obter bons resultados",
            "Compartilhar pode inspirar mudanças",
            "Cuide da natureza antes que seja tarde",
        ]
    },
    {
        id: "structure.soundsLike", value: "Como você quer que a narrativa soe?", tips: [
            "Descontraído",
            "Ácida e provocadora",
            "Intensa e dramática",
            "Humorístico",
            "Poético",
            "Misterioso",
            "Épica",
            "Realista",
            "Formal"
        ]
    },
    {
        id: "structure.creativeRef", value: "Existe alguma referência criativa para sua narrativa?", nullable: true, tips: [
            "Um filme do Jordan Peele",
            "Um episódio de Black Mirror",
            "Uma história de Franz Kafka",
            "Um texto de Clarice Lispector",
            "Um vídeo de um produtor de conteúdo X"
        ]
    },
    {
        id: "structure.density", value: "Qual a densidade da leitura da narrativa?", tips: [
            "Fácil de entender, mesmo em poucos segundos",
            "Simples como um roteiro de reels",
            "Mais literária e descritiva",
            "Leitura dinâmica com apoio visual",
            "Abstrato e profundo",
            "Acessível para crianças ou idosos"
        ]
    },
];