import { motion, AnimatePresence } from "framer-motion";
import './styles.scss';
import { QuestionViewProps } from "./types";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Carousel } from "../carousel";
import { IoPlaySkipForward, IoSparkles } from "react-icons/io5";
import { FaChevronRight, FaShareFromSquare } from "react-icons/fa6";
import { FluidContext } from "../../context/fluid-context";
import { Stepper } from "../stepper";
import { useQuestions } from "../../hooks/useQuestions";
import { useTranslation } from "react-i18next";
import { Translation } from "../translation";

export const QuestionView = ({ onSubmit }: QuestionViewProps) => {
    const {
        sharedStory,
        updateSharedStory,
        containerId
    } = useContext(FluidContext);
    const [localAnswer, setLocalAnser] = useState('');

    const questions = useQuestions();
    const { t } = useTranslation();

    const question = sharedStory?.currentStep ? questions[sharedStory.currentStep] : questions[0];
    const answer = sharedStory?.currentAnswer || '';
    const setAnswer = (value: string) => updateSharedStory({ currentAnswer: value });

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line in the textarea
            handleSubmit(e);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!answer && !question?.nullable) {
            alert(t("questionEmptyAnswer"));
            return;
        }

        onSubmit({ ...question, answer: answer.trim() });
    };

    const shareSession = () => {
        const shareUrl = `${window.location.origin}/?session=${containerId}`
        navigator.clipboard.writeText(shareUrl);
        alert(t("sessionCopy"))
    }

    useEffect(() => {
        setAnswer(localAnswer)
    }, [localAnswer]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className='motion-question'
            >
                <form className="question glass" onSubmit={handleSubmit}>
                    <div className="share-button" title={t("sessionShare")} onClick={shareSession}><FaShareFromSquare /></div>
                    <Stepper currentStep={sharedStory?.currentStep || 0} totalSteps={questions.length} />
                    <h2>{question.value} {!question.nullable && <b>*</b>}</h2>
                    <textarea
                        value={answer}
                        id={question.id}
                        onChange={(e) => setLocalAnser(e.target.value)}
                        placeholder={t("questionPlaceholder")}
                        autoFocus={true}
                        onKeyDown={handleKeyDown}
                        className="glass"
                    />
                    <div className="tips-container">
                        <p>
                            <Translation id="questionExamplesLabel" />
                            <IoSparkles />
                        </p>
                        <Carousel
                            items={question.tips.map(tip =>
                                <span className="tip">{tip}</span>
                            )}
                        />
                    </div>
                    <div className="buttons-container">
                        {question.nullable &&
                            <button>
                                <Translation id="questionSkip" />
                                <IoPlaySkipForward />
                            </button>
                        }
                        <button>
                            <Translation id="questionNext" />
                            <FaChevronRight />
                        </button>
                    </div>
                </form>

            </motion.div>
        </AnimatePresence>
    );
};