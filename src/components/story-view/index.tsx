import { FaPlus, FaSync } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Translation } from '../translation';
import './styles..scss';

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
    );
};