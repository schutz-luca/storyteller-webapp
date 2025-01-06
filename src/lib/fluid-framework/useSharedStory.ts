import { SharedMap } from "fluid-framework";
import { useCallback, useEffect, useState } from "react";
import { isEqual } from "lodash"
import { SharedStory } from "./types";
import { getSearchParams } from "../../utils/getSearchParams";

const storyKey = '0';

export const sharedStoryEmptyState: SharedStory = {
    currentAnswer: '',
    currentStep: 0,
    story: '',
    answers: undefined,
    loading: ''
}

export const useSharedStory = (storyMap?: SharedMap) => {
    const sessionParam = getSearchParams().get('session') || '';

    const [sharedStory, setSharedStory] = useState<SharedStory>({
        ...sharedStoryEmptyState,
        loading: sessionParam ? 'Conectando à sessão...' : '',
    });

    const updateSharedStory = (value: any) => {
        storyMap?.set(storyKey, { ...sharedStory, ...value });
        setSharedStory({ ...sharedStory, ...value });
    }

    const refresh = useCallback(() => {
        if (!storyMap) return;

        const value = storyMap.get(storyKey);

        if (value && !isEqual(value, sharedStory)) setSharedStory(value);
    }, [storyMap, sharedStory]);

    useEffect(() => {
        if (storyMap && !storyMap.listenerCount('valueChanged')) {
            storyMap.on('valueChanged', refresh);
            refresh();
        }
    }, [storyMap]);

    useEffect(() => {
        console.log('[Story]', sharedStory);
    }, [sharedStory.answers])

    return { sharedStory, updateSharedStory }
}