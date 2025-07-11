import { StateSetter } from "../../@types/common";
import { SharedStory } from "../../lib/fluid-framework/types";

export interface FluidContextData {
    sharedLoading: string;
    updateSharedLoading: (value: string) => void;
    sharedStory: SharedStory | undefined;
    updateSharedStory: (value: any) => void;
    containerId: string;
    isNewSession: boolean;
    setIsNewSession: StateSetter<boolean>;
}