import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import * as useSharedLoadingModule from '../../lib/fluid-framework/useSharedLoading';
import * as useSharedMapsModule from '../../lib/fluid-framework/useSharedMaps';
import * as useSharedStoryModule from '../../lib/fluid-framework/useSharedStory';
import { FluidContext } from './index';
import { FluidContextData } from './types';

describe('FluidContext', () => {
    it('should provide the correct context values', () => {
        const mockSharedMapsReturn = {
            containerId: 'mock-container-id',
            storyMap: {} as any,
            loadingMap: {} as any,
            setIsNewSession: jest.fn(),
            isNewSession: false
        };
        const mockSharedStoryReturn = {
            sharedStory: { currentStep: 0, story: 'Once upon a time...', currentAnswer: '' },
            updateSharedStory: jest.fn(),
        };
        const mockSharedLoadingReturn = {
            sharedLoading: 'mock loading',
            updateSharedLoading: jest.fn(),
        };

        jest.spyOn(useSharedMapsModule, 'useSharedMaps').mockReturnValue(mockSharedMapsReturn);
        jest.spyOn(useSharedStoryModule, 'useSharedStory').mockReturnValue(mockSharedStoryReturn);
        jest.spyOn(useSharedLoadingModule, 'useSharedLoading').mockReturnValue(mockSharedLoadingReturn);

        const TestComponent = () => {
            const context = useContext(FluidContext);
            return (
                <div data-testid="context-values">
                    <span>{context.containerId}</span>
                    <span>{context.sharedStory?.story}</span>
                    <span>{context.sharedLoading}</span>
                </div>
            );
        };

        render(
            <FluidContext.Provider value={{
                containerId: mockSharedMapsReturn.containerId,
                sharedStory: mockSharedStoryReturn.sharedStory,
                sharedLoading: mockSharedLoadingReturn.sharedLoading
            } as FluidContextData}>
                <TestComponent />
            </FluidContext.Provider>
        );

        const contextValuesElement = screen.getByTestId('context-values');
        expect(contextValuesElement).toHaveTextContent(mockSharedMapsReturn.containerId);
        expect(contextValuesElement).toHaveTextContent(mockSharedStoryReturn.sharedStory.story);
        expect(contextValuesElement).toHaveTextContent(mockSharedLoadingReturn.sharedLoading);
    });
});