import readline from 'readline';
import { singleton } from '../decorator/singletonDecorator';

@singleton
export class ReadlineManager {
    private static rl: readline.Interface;

    private static ensureInitialized() {
        if (!ReadlineManager.rl) {
            ReadlineManager.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
    }

    public static async question(prompt: string): Promise<string> {
        ReadlineManager.ensureInitialized();
        return new Promise<string>((resolve) => {
            ReadlineManager.rl.question(prompt, resolve);
        });
    }

    public static close() {
        if (ReadlineManager.rl) {
            ReadlineManager.rl.close();
            ReadlineManager.rl = undefined!;
        }
    }
}