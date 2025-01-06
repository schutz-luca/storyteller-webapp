import { AzureClient } from "@fluidframework/azure-client";
import { InsecureTokenProvider } from "@fluidframework/test-client-utils";
import { IFluidContainer, SharedMap } from "fluid-framework";
import { useEffect, useState } from "react"
import { getSearchParams } from "../../utils/getSearchParams";

const client = new AzureClient({
    connection: {
        type: 'remote',
        endpoint: import.meta.env.VITE_FLUID_ENDPOINT,
        tenantId: import.meta.env.VITE_FLUID_TENANT_ID,
        tokenProvider: new InsecureTokenProvider(import.meta.env.VITE_FLUID_TOKEN, { id: '' })
    }
});

const containerSchema = {
    initialObjects: { storyMap: SharedMap }
}

export const useSharedMaps = () => {
    const [container, setContainer] = useState<IFluidContainer>();
    const [containerId, setContainerId] = useState('');

    const getSharedMaps = async () => {
        try {
            let containerId = getSearchParams().get('session') || '';
            let container: IFluidContainer;
            if (containerId) {
                ({ container } = await client.getContainer(containerId, containerSchema));
                console.log(`[Fluid] Connected to container ${containerId}`);
            }
            else {
                ({ container } = await client.createContainer(containerSchema));
                containerId = await container.attach();
                console.log(`[Fluid] Container with id ${containerId} was created`);
            }
            setContainer(container);
            setContainerId(containerId);
        }
        catch (error) {
            console.error('Error on Fluid container connection:', error);
        }
    }

    useEffect(() => {
        getSharedMaps();
    }, []);

    return { storyMap: container?.initialObjects.storyMap as SharedMap | undefined, containerId }
}