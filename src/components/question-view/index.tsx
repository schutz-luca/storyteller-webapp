import { motion, AnimatePresence } from "framer-motion";
import './styles.scss';
import { QuestionViewProps } from "./types";
import { FormEvent, useEffect, useState } from "react";
import { Carousel } from "../carousel";
import { IoPlaySkipForward, IoSparkles } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";

export const QuestionView = ({ question, onSubmit, answer, setAnswer }: QuestionViewProps) => {
    const [localAnswer, setLocalAnser] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line in the textarea
            handleSubmit(e);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!answer && !question.nullable) {
            alert('Resposta vazia, por favor preencha o campo');
            return;
        }

        onSubmit({ ...question, answer: answer.trim() });
    };


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
            >
                <form className="question" onSubmit={handleSubmit}>
                    <h2>{question.value} {!question.nullable && <b>*</b>}</h2>
                    <textarea
                        value={answer}
                        id={question.id}
                        onChange={(e) => setLocalAnser(e.target.value)}
                        placeholder="Digite sua resposta"
                        autoFocus={true}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="tips-container">
                        <p>
                            Aqui estão alguns exemplos de repostas <IoSparkles />
                        </p>
                        <Carousel
                            items={question.tips.map(tip => <span className="tip">{tip}</span>)}
                        />
                    </div>
                    <div className="buttons-container">
                        {question.nullable &&
                            <button>Não responder <IoPlaySkipForward /></button>
                        }
                        <button>Próximo <FaChevronRight /></button>
                    </div>
                </form>

            </motion.div>
        </AnimatePresence>
    );
};