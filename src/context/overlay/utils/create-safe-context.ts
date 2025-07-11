import { createContext, useContext, type Provider } from 'react';

const NullSymbol = Symbol('Null');
type NullSymbolType = typeof NullSymbol;

export type CreateContextReturn<T> = [Provider<T>, () => T];

export function createSafeContext<T>(displayName?: string): CreateContextReturn<T> {
    const Context = createContext<T | NullSymbolType>(NullSymbol);
    Context.displayName = displayName ?? 'SafeContext';

    function useSafeContext() {
        const context = useContext(Context);

        if (context === NullSymbol) {
            const error = new Error(`[${Context.displayName}]: Provider not found.`);
            error.name = '[Error] Context';

            throw error;
        }

        return context;
    }

    return [Context.Provider, useSafeContext];
}
