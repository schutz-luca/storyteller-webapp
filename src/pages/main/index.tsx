import { useState, useEffect, useContext } from "react";
import { QuestionView } from "../../components/question-view";
import { sharedStoryEmptyState } from "../../lib/fluid-framework/useSharedStory";
import { FillableAnswerGroup, Question } from "../../@types";
import { unflatObject } from "../../utils/unflatObject";
import './styles.scss';
import { Loading } from "../../components/loading";
import { questions } from "../../constants/questions";
import { StoryView } from "../../components/story-view";
import { formatToMd } from "../../utils/formatToMd";
import { StorytellerBanner } from "../../components/storyteller";
import { FluidContext } from "../../context/fluid-context";

export const MainPage = () => {
    const {
        sharedStory,
        updateSharedStory,
        updateSharedLoading
    } = useContext(FluidContext);

    const [answers, setAnswers] = useState<FillableAnswerGroup>();

    const reset = () => updateSharedStory(sharedStoryEmptyState);

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

    useEffect(() => {
        if (answers) updateSharedStory({ answers });
    }, [answers])

    if (sharedStory?.currentStep === undefined) return <Loading text={'Conectando à sessão...'} />

    return (
        <>
            <StorytellerBanner />
            <div className="main-page">
                {!sharedStory.story ?
                    // Questions
                    <QuestionView onSubmit={handleNext} />
                    :
                    // Story
                    <StoryView story={formatToMd(sharedStory?.story)} recreate={recreate} reset={reset} />
                }
            </div>
        </>
    );
};