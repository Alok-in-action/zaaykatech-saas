/**
 * Next.js instrumentation hook - runs on the server before requests.
 * Polyfills localStorage.getItem on the server if it is broken/missing
 * (e.g. when Node.js is launched with --localstorage-file without a valid path).
 */
export function register() {
    if (typeof globalThis !== 'undefined') {
        const ls = (globalThis as any).localStorage;
        // Fix broken localStorage provided by --localstorage-file flag
        if (ls !== undefined && typeof ls.getItem !== 'function') {
            const store: Record<string, string> = {};
            (globalThis as any).localStorage = {
                getItem: (key: string) => store[key] ?? null,
                setItem: (key: string, value: string) => { store[key] = value; },
                removeItem: (key: string) => { delete store[key]; },
                clear: () => { Object.keys(store).forEach(k => delete store[k]); },
                get length() { return Object.keys(store).length; },
                key: (index: number) => Object.keys(store)[index] ?? null,
            };
        }
    }
}
