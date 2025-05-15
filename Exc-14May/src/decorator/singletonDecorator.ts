// Singleton Decorator
export function singleton<T extends { new (...args: any[]): any }>(constructor: T) {
    let instance: any;
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            if (instance) {
            return instance;
            }
            instance = this
        }
    }
}