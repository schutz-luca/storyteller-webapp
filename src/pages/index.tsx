import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
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
import { questions } from "../constants/questions";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

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

    const markdownString = `
    ${sharedStory.story}
    `.split('```markdown')[1];

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
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSanitize]}
                        >
                            {markdownString}
                        </ReactMarkdown>
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