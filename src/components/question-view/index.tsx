import { motion, AnimatePresence } from "framer-motion";
import './styles.css';
import { QuestionViewProps } from "./types";

export const QuestionView = ({ question, onSubmit, answer, setAnswer }: QuestionViewProps) => {

    const handleSubmit = () => {
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
                <div className="question">
                    <p>{question.value}</p>
                    <input
                        type="text"
                        value={answer}
                        id={question.id}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Digite sua resposta"
                    />
                    <button onClick={handleSubmit}>Próximo</button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};