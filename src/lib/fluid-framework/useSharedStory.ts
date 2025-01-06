import { SharedMap } from "fluid-framework";
import { useCallback, useEffect, useState } from "react";
import { isEqual } from "lodash"
import { SharedStory } from "./types";

const storyKey = '0'

export const useSharedStory = (storyMap?: SharedMap) => {
    const [sharedStory, setSharedStory] = useState<SharedStory>({
        currentAnswer: '',
        currentStep: 0,
        story: '',
        loading: '',
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

    return { sharedStory, updateSharedStory }
}