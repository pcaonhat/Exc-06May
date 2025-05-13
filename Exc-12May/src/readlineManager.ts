import readline from 'readline';

export class ReadlineManager{
    private static instance: readline.Interface | null = null;

    static getInstance() : readline.Interface{
        if(!ReadlineManager.instance){
                ReadlineManager.instance = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                })
            }
        return ReadlineManager.instance;
    }

    static async question(prompt: string): Promise<string> {
        const rl = ReadlineManager.getInstance();
        return new Promise<string>((resolve) => {
            rl.question(prompt, resolve);
        });
    }
    
    static close() {
        if (ReadlineManager.instance) {
            ReadlineManager.instance.close();
            ReadlineManager.instance = null;
        }
    }
}