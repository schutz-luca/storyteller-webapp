import { useState, useEffect } from "react";
import MarkdownBox from 'react-markdown';
import { QuestionView } from "../components/question-view";
import { Stepper } from "../components/stepper";
import { useSharedMaps } from "../lib/fluid-framework/useSharedMaps";
import { useSharedStory } from "../lib/fluid-framework/useSharedStory";
import { FillableAnswerGroup, Question } from "../types";
import { unflatObject } from "../utils/unflatObject";
import { FaShareFromSquare } from "react-icons/fa6";
import './styles.scss';

const questions: Question[] = [
    { id: "goal", value: "Qual o objetivo da narrativa?" },
    { id: "targetAudience.profile", value: "Qual é o perfil cultural, social e/ou profissional do público-alvo da sua narrativa?" },
    { id: "targetAudience.feelings", value: "Como você quer que o seu público-alvo se sinta quando consumir a narrativa?" },
    { id: "story.about", value: "Sobre o que ou quem é a sua narrativa" },
    { id: "story.climax", value: "Há um clímax/ponto-alto na narrativa?" },
    { id: "story.moral", value: "Existe alguma lição de moral ou reflexão que final que sua narrativa queira causar?" },
    { id: "structure.soundsLike", value: "Como você quer que a narrativa soe?" },
    { id: "structure.creativeRef", value: "Existe alguma referência criativa para sua narrativa" },
    { id: "structure.density", value: "Qual a densidade da leitura da narrativa?" },
];

export const MainPage = () => {
    const { storyMap, containerId } = useSharedMaps();
    const { sharedStory, updateSharedStory } = useSharedStory(storyMap);

    const [answers, setAnswers] = useState<FillableAnswerGroup>();
    const [story, setStory] = useState('');

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

    if (sharedStory.loading) return <h1>{sharedStory.loading}</h1>

    return (
        <div className="main-page">
            <div className="share-button" onClick={shareSession}><FaShareFromSquare /></div>
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
                <>
                    <div>
                        <MarkdownBox>
                            {sharedStory.story}
                        </MarkdownBox>
                    </div>
                    <button onClick={() => submitAnswers(sharedStory.answers)}>Refazer</button>
                </>
            }
        </div>
    );
};