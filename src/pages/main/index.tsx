import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FillableAnswerGroup, Question } from '../../@types';
import { Loading } from '../../components/loading';
import { QuestionView } from '../../components/question-view';
import { StoryView } from '../../components/story-view';
import { StorytellerBanner } from '../../components/storyteller';
import { FluidContext } from '../../context/fluid-context';
import { useQuestions } from '../../hooks/useQuestions';
import { sharedStoryEmptyState } from '../../lib/fluid-framework/useSharedStory';
import { envVars } from '../../utils/envVars';
import { formatToMd } from '../../utils/formatToMd';
import { unflatObject } from '../../utils/unflatObject';
import './styles.scss';

export const MainPage = () => {
    const {
        sharedStory,
        updateSharedStory,
        sharedLoading,
        updateSharedLoading
    } = useContext(FluidContext);

    const [answers, setAnswers] = useState<FillableAnswerGroup>();

    const questions = useQuestions();
    const { t, i18n: { language } } = useTranslation();

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
        submitAnswers(sharedStory?.answers);
    };

    const submitAnswers = async (answers?: FillableAnswerGroup) => {
        try {
            updateSharedLoading(t('storyLoading'));

            const response = await fetch(`${envVars.API_URL}/create-story?lang=${language}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
    };

    useEffect(() => {
        if (answers) updateSharedStory({ answers });
    }, [answers]);

    if (sharedStory?.currentStep === undefined) return <Loading text={'Conectando à sessão...'} />;
    console.log(sharedLoading);
    if (sharedLoading) return <Loading text={sharedLoading} />;

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