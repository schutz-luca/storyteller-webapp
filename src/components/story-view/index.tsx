import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import './styles..scss';
import { FaPlus, FaSync } from 'react-icons/fa';

export const StoryView = ({ story, recreate, reset }: { story: string; reset: () => void; recreate: () => void }) => {
    return (
        <div className="flex-center">
            <div className="story-container glass">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSanitize]}
                >
                    {story}
                </ReactMarkdown>
                <div className="buttons-container">
                    <button onClick={reset}>Criar outra história <FaPlus /></button>
                    <button onClick={recreate}>Recriar <FaSync /></button>
                </div>
            </div>
        </div>
    )
}