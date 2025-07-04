import { useState, useEffect } from "react";
import { QuestionView } from "../../components/question-view";
import { Stepper } from "../../components/stepper";
import { sharedStoryEmptyState, useSharedStory } from "../../lib/fluid-framework/useSharedStory";
import { FillableAnswerGroup, Question } from "../../types";
import { unflatObject } from "../../utils/unflatObject";
import { FaShareFromSquare } from "react-icons/fa6";
import './styles.scss';
import { Loading } from "../../components/loading";
import { questions } from "../../constants/questions";
import { StoryView } from "../../components/story-view";
import { formatToMd } from "../../utils/formatToMd";
import { useSharedLoading } from "../../lib/fluid-framework/useSharedLoading";
import { SharedMap } from "fluid-framework";

export const MainPage = ({ storyMap, loadingMap, containerId }: { storyMap?: SharedMap; loadingMap?: SharedMap; containerId: string }) => {
    const { sharedStory, updateSharedStory } = useSharedStory(storyMap);
    const { sharedLoading, updateSharedLoading } = useSharedLoading(loadingMap);

    const [answers, setAnswers] = useState<FillableAnswerGroup>();

    const reset = () => updateSharedStory(sharedStoryEmptyState);

    const setAnswer = (value: string) => updateSharedStory({ currentAnswer: value });

    const handleNext = (question: Question) => {
        const currentAnswers = { ...sharedStory?.answers, [question.id]: question.answer };
        setAnswers(currentAnswers);

        if (!!sharedStory && sharedStory.currentStep < questions.length - 1)
            updateSharedStory({ currentStep: sharedStory.currentStep + 1, currentAnswer: '' });
        else
            submitAnswers(currentAnswers);
    };

    const recreate = () => {
        submitAnswers(sharedStory?.answers)
    }

    const submitAnswers = async (answers?: FillableAnswerGroup) => {
        try {
            updateSharedLoading('Criando sua história...');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/create-story`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(unflatObject(answers)),
            });
            const data = await response.json();
            updateSharedStory({ story: data.content });
            updateSharedLoading('');
        }
        catch (error) {
            console.error('Error sending answers:', error);
            updateSharedLoading('');
        }
        finally {

        }
    };

    const shareSession = () => {
        const shareUrl = `${window.location.origin}/?session=${containerId}`
        navigator.clipboard.writeText(shareUrl);
        alert('Link de compartilhamento foi copiado')
    }

    useEffect(() => {
        updateSharedStory({ answers });
    }, [answers])

    if (sharedLoading) return <Loading text={sharedLoading} />
    if (sharedStory?.currentStep === undefined) return <Loading text={'Conectando à sessão...'} />

    console.log(sharedStory)

    return (
        <div className="main-page">
            <div className="share-button" title="Compartilhe sua sessão" onClick={shareSession}><FaShareFromSquare /></div>
            {!sharedStory.story ?
                // Questions
                <>
                    <Stepper currentStep={sharedStory?.currentStep} totalSteps={questions.length} />
                    <QuestionView
                        question={questions[sharedStory?.currentStep]}
                        onSubmit={handleNext}
                        answer={sharedStory?.currentAnswer}
                        setAnswer={setAnswer}
                    />
                </>
                :
                // Story
                <StoryView story={formatToMd(sharedStory?.story)} recreate={recreate} reset={reset} />
            }
        </div>
    );
};