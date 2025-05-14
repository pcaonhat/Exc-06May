export class User{
    private id: number;
    private name: string;
    private address: string;

    public constructor (id: number, name: string, address: string){
        this.id = id;
        this.name = name;
        this.address = address;
    }
}