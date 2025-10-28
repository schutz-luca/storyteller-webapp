import { render, screen, fireEvent } from '@testing-library/react';
import { StoryView } from '.';

jest.mock('react-markdown', () => ({
    __esModule: true,
    default: ({ children }) => <div>{children}</div>,
}));

jest.mock('rehype-sanitize', () => ({}));
jest.mock('remark-gfm', () => ({}));

jest.mock('react-icons/fa', () => ({
    FaPlus: () => <i data-testid="fa-plus" />,
    FaSync: () => <i data-testid="fa-sync" />,
}));

describe('StoryView', () => {
    const story = 'This is a test story.';
    const reset = jest.fn();
    const recreate = jest.fn();

    it('should render the story content', () => {
        render(<StoryView story={story} reset={reset} recreate={recreate} />);
        expect(screen.getByText(story)).toBeInTheDocument();
    });

    it('should render the buttons', () => {
        render(<StoryView story={story} reset={reset} recreate={recreate} />);
        expect(screen.getByText('storyNew')).toBeInTheDocument();
        expect(screen.getByText('storyRecreate')).toBeInTheDocument();
        expect(screen.getByTestId('fa-plus')).toBeInTheDocument();
        expect(screen.getByTestId('fa-sync')).toBeInTheDocument();
    });

    it('should call reset when the new story button is clicked', () => {
        render(<StoryView story={story} reset={reset} recreate={recreate} />);
        fireEvent.click(screen.getByText('storyNew'));
        expect(reset).toHaveBeenCalled();
    });

    it('should call recreate when the recreate button is clicked', () => {
        render(<StoryView story={story} reset={reset} recreate={recreate} />);
        fireEvent.click(screen.getByText('storyRecreate'));
        expect(recreate).toHaveBeenCalled();
    });
});
