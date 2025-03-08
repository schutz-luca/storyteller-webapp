import { SharedMap } from "fluid-framework";
import { useCallback, useEffect, useState } from "react";
import { isEqual } from "lodash"
import { SharedStory } from "./types";
import { getSearchParams } from "../../utils/getSearchParams";

const storyKey = 'story';

export const sharedStoryEmptyState: SharedStory = {
    currentAnswer: '',
    currentStep: 0,
    story: '',
}

export const useSharedStory = (storyMap?: SharedMap) => {
    const sessionParam = getSearchParams().get('session') || '';

    const [sharedStory, setSharedStory] = useState<SharedStory>();
    const [initialized, setInitialized] = useState(false);

    const updateSharedStory = (value: any) => {
        const joinedValue = { ...sharedStory, ...value };
        storyMap?.set(storyKey, joinedValue);
    }

    const refresh = useCallback(() => {
        if (!storyMap) return;

        const value = storyMap.get(storyKey);

        if (value && !isEqual(value, sharedStory)) setSharedStory(value);
    }, [storyMap, sharedStory]);

    useEffect(() => {
        if (!initialized && storyMap && !storyMap.listenerCount('valueChanged')) {
            if (!initialized) setInitialized(true);
            storyMap.on('valueChanged', refresh);
            refresh();
        }
    }, [storyMap]);

    useEffect(() => {
        if (initialized && !sessionParam) {
            updateSharedStory(sharedStoryEmptyState);
        }
    }, [initialized])

    useEffect(() => {
        console.log('[Story]', sharedStory);
    }, [sharedStory])

    return { sharedStory, updateSharedStory }
}