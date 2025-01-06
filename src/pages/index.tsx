import { useState, useEffect } from "react";
import MarkdownBox from 'react-markdown';
import { QuestionView } from "../components/question-view";
import { Stepper } from "../components/stepper";
import { useSharedMaps } from "../lib/fluid-framework/useSharedMaps";
import { sharedStoryEmptyState, useSharedStory } from "../lib/fluid-framework/useSharedStory";
import { FillableAnswerGroup, Question } from "../types";
import { unflatObject } from "../utils/unflatObject";
import { FaShareFromSquare } from "react-icons/fa6";
import './styles.scss';
import { FaPlus, FaSync } from "react-icons/fa";
import { Loading } from "../components/loading";

const questions: Question[] = [
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

export const MainPage = () => {
    const { storyMap, containerId } = useSharedMaps();
    const { sharedStory, updateSharedStory } = useSharedStory(storyMap);

    const [answers, setAnswers] = useState<FillableAnswerGroup>();
    const [story, setStory] = useState('');

    const reset = () => updateSharedStory(sharedStoryEmptyState);

    const setAnswer = (value: string) => updateSharedStory({ currentAnswer: value });

    const handleNext = (question: Question) => {
        const currentAnswers = { ...sharedStory.answers, [question.id]: question.answer };
        setAnswers(currentAnswers);

        if (sharedStory.currentStep < questions.length - 1)
            updateSharedStory({ currentStep: sharedStory.currentStep + 1, currentAnswer: '' });
        else
            submitAnswers(currentAnswers);
    };


    const submitAnswers = async (answers?: FillableAnswerGroup) => {
        try {
            updateSharedStory({ loading: 'Criando sua história...' });

            const response = await fetch(`${import.meta.env.VITE_API_URL}/create-story`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(unflatObject(answers)),
            });
            const data = await response.json();
            setStory(data.content);
        }
        catch (error) {
            console.error('Error sending answers:', error);
        }
        finally {
            updateSharedStory({ loading: '' });
        }
    };

    const shareSession = () => {
        const shareUrl = `${window.location.origin}/?session=${containerId}`
        navigator.clipboard.writeText(shareUrl);
        alert('Link de compartilhamento foi copiado')
    }

    // Sync story and answers to shared value
    useEffect(() => {
        updateSharedStory({ story });
    }, [story])

    useEffect(() => {
        updateSharedStory({ answers });
    }, [answers])

    if (sharedStory.loading) return <Loading text={sharedStory.loading} />

    return (
        <div className="main-page">
            <div className="share-button" title="Compartilhe sua sessão" onClick={shareSession}><FaShareFromSquare /></div>
            {!sharedStory.story ?
                // Questions
                <>
                    <Stepper currentStep={sharedStory.currentStep} totalSteps={questions.length} />
                    <QuestionView
                        question={questions[sharedStory.currentStep]}
                        onSubmit={handleNext}
                        answer={sharedStory.currentAnswer}
                        setAnswer={setAnswer}
                    />
                </>
                :
                // Story
                <div className="flex-center">
                    <div className="story-container">
                        <MarkdownBox>
                            {sharedStory.story}
                        </MarkdownBox>
                    </div>
                    <div className="buttons-container">
                        <button onClick={reset}>Criar outra história <FaPlus /></button>
                        <button onClick={() => submitAnswers(sharedStory.answers)}>Recriar <FaSync /></button>
                    </div>
                </div>
            }
        </div>
    );
};