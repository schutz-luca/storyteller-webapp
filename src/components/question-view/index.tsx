import { motion, AnimatePresence } from "framer-motion";
import './styles.scss';
import { QuestionViewProps } from "./types";
import { FormEvent } from "react";

export const QuestionView = ({ question, onSubmit, answer, setAnswer }: QuestionViewProps) => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!answer && !question.nullable) {
            alert('Resposta vazia, por favor preencha o campo');
            return;
        }

        onSubmit({ ...question, answer: answer.trim() });
    };

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
                    <p>{question.value} {!question.nullable && <b>*</b>}</p>
                    <input
                        type="text"
                        value={answer}
                        id={question.id}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Digite sua resposta"
                        autoFocus={true}
                    />
                    <div className="buttons-container">
                        {question.nullable &&
                            <button>Não responder</button>
                        }
                        <button>Próximo</button>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};