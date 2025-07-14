import { createContext } from 'react';
import { Parent } from '../../@types/common';
import { useSharedLoading } from '../../lib/fluid-framework/useSharedLoading';
import { useSharedMaps } from '../../lib/fluid-framework/useSharedMaps';
import { useSharedStory } from '../../lib/fluid-framework/useSharedStory';
import { FluidContextData } from './types';

export const FluidContext = createContext({} as FluidContextData);

export const FluidProvider = (props: Parent) => {
    const { storyMap, loadingMap, ...sharedMapsReturn } = useSharedMaps();

    const sharedStoryReturn = useSharedStory(storyMap);
    const sharedLoadingReturn = useSharedLoading(loadingMap);
    
    const fluidContextData: FluidContextData = {
        ...sharedMapsReturn,
        ...sharedStoryReturn,
        ...sharedLoadingReturn
    };

    return <FluidContext.Provider value={fluidContextData}>{props.children}</FluidContext.Provider>;
};