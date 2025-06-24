export function createBoundClassNames(styles: Record<string, string>) {
    return (...args: (string | Record<string, boolean> | undefined | null)[]): string => {
        const classes: string[] = [];

        args.forEach(arg => {
            if (!arg) return;

            if (typeof arg === 'string') {
                classes.push(styles[arg] || arg);
            } else if (typeof arg === 'object') {
                Object.keys(arg).forEach(key => {
                    if (arg[key]) classes.push(styles[key] || key);
                });
            }
        });

        return classes.join(' ');
    };
}
