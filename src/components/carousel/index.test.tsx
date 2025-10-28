import { render, screen, act } from '@testing-library/react';
import { Carousel } from '.';

jest.mock('framer-motion', () => ({
    ...jest.requireActual('framer-motion'),
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
        div: ({ children }) => <div>{children}</div>
    }
}));

describe('Carousel', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const items = ['Item 1', 'Item 2', 'Item 3'];

    it('should render the first item initially', () => {
        render(<Carousel items={items} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should cycle through items', () => {
        render(<Carousel items={items} timeout={1000} />);

        expect(screen.getByText('Item 1')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText('Item 2')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText('Item 3')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
});
