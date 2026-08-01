"use client";

import React, {

    createContext,

    useContext,

    useMemo,

    useState,

    ReactNode,

    useEffect,

} from "react";

import { CacheService } from "../services/CacheService";

interface CacheStats {

    size: number;

    keys: string[];

}

interface CacheContextType {

    stats: CacheStats;

    clear(): Promise<void>;

    refresh(): Promise<void>;

    service: CacheService;

}

const CacheContext = createContext<CacheContextType | null>(null);

interface Props {

    children: ReactNode;

}

export function CacheContextProvider({

    children,

}: Props) {

    const service = useMemo(

        () => new CacheService(),

        []

    );

    const [stats, setStats] = useState<CacheStats>({

        size: 0,

        keys: [],

    });

    useEffect(() => {

        refresh();

    }, []);

    async function refresh() {

        const value = await service.stats();

        setStats(value);

    }

    async function clear() {

        await service.clear();

        await refresh();

    }

    return (

        <CacheContext.Provider

            value={{

                stats,

                clear,

                refresh,

                service,

            }}

        >

            {children}

        </CacheContext.Provider>

    );

}

export function useCacheContext() {

    const context = useContext(CacheContext);

    if (!context) {

        throw new Error(

            "useCacheContext deve ser utilizado dentro do CacheContextProvider."

        );

    }

    return context;

}