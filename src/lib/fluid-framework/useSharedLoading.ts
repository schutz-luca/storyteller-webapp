import { SharedMap } from "fluid-framework";
import { useCallback, useEffect, useState } from "react";
import { getSearchParams } from "../../utils/getSearchParams";

const loadingKey = 'loading';

export const useSharedLoading = (loadingMap?: SharedMap) => {
    const sessionParam = getSearchParams().get('session') || '';

    const [sharedLoading, setSharedLoading] = useState<{ message: string }>(sessionParam ? { message: 'Conectando a sessão...' } : { message: '' });
    const [initialized, setInitialized] = useState(false);

    const updateSharedLoading = (value: string) => {
        loadingMap?.set(loadingKey, { message: value });
        setSharedLoading({ message: value });
    }

    const refresh = useCallback(() => {
        if (!loadingMap) return;

        const value = loadingMap.get(loadingKey);

        if (value && value !== sharedLoading.message) setSharedLoading(value);
    }, [loadingMap, sharedLoading]);

    useEffect(() => {
        if (!initialized && loadingMap && !loadingMap.listenerCount('valueChanged')) {
            if (!initialized) updateSharedLoading('');
            loadingMap.on('valueChanged', refresh);
            refresh();
            setInitialized(true);
        }
    }, [loadingMap]);

    useEffect(() => {
        console.log('[Loading]', sharedLoading);
    }, [sharedLoading.message])

    return { sharedLoading: sharedLoading.message, updateSharedLoading }
}