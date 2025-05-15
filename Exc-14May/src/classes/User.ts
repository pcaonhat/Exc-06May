import { toJSON } from "../decorator/toJSONDecorator";

@toJSON
export class User{
    private id: number;

    public name: string;

    public address: string;

    public constructor (id: number, name: string, address: string){
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public getId(): number {
        return this.id
    }
}