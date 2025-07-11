import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import './styles..scss';
import { FaPlus, FaSync } from 'react-icons/fa';
import { Translation } from '../translation';

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
                    <button onClick={reset}>
                        <Translation id='storyNew' />
                        <FaPlus />
                    </button>
                    <button onClick={recreate}>
                        <Translation id='storyRecreate' />
                        <FaSync />
                    </button>
                </div>
            </div>
        </div>
    )
}