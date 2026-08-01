"use client";

import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    ReactNode,
    useEffect,
} from "react";

import { AIProvider } from "../providers/AIProvider";
import { ProviderService } from "../services/ProviderService";

interface ProviderContextType {

    providers: AIProvider[];

    activeProvider: AIProvider | null;

    setProvider(id: string): Promise<void>;

    reload(): Promise<void>;

    service: ProviderService;

}

const ProviderContext = createContext<ProviderContextType | null>(null);

interface Props {

    children: ReactNode;

}

export function ProviderContextProvider({

    children,

}: Props) {

    const service = useMemo(

        () => new ProviderService(),

        []

    );

    const [providers, setProviders] = useState<AIProvider[]>([]);

    const [activeProvider, setActiveProvider] =

        useState<AIProvider | null>(null);

    useEffect(() => {

        initialize();

    }, []);

    async function initialize() {

        await service.initialize();

        const list = service.getEnabled();

        setProviders(list);

        const provider = await service.getAvailable();

        setActiveProvider(provider);

    }

    async function setProvider(id: string) {

        const provider = service.get(id);

        setActiveProvider(provider);

    }

    async function reload() {

        await initialize();

    }

    return (

        <ProviderContext.Provider

            value={{

                providers,

                activeProvider,

                setProvider,

                reload,

                service,

            }}

        >

            {children}

        </ProviderContext.Provider>

    );

}

export function useProviderContext() {

    const context = useContext(ProviderContext);

    if (!context) {

        throw new Error(

            "useProviderContext deve ser utilizado dentro do ProviderContextProvider."

        );

    }

    return context;

}