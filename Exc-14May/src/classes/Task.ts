import { toJSON } from "../decorator/toJSONDecorator";

@toJSON
export class Task{
    private id: number;

    private userIdList: number[];

    public name: string;

    public description: string;

    public dateCreate: string;

    public dateDeadline: string;

    public isFinished: boolean;

    public constructor(id: number, name: string, description: string, dateCreate: string, dateDeadline: string, isFinished: boolean = false, userIdList: number[] = []){
        this.id = id;
        this.userIdList = userIdList;
        this.description = description;
        this.name = name;
        this.dateCreate = dateCreate;
        this.dateDeadline = dateDeadline;
        this.isFinished = isFinished;
    }
    public addUserId(userId: number) : void { 
        if(this.userIdList.indexOf(userId) === -1){
            this.userIdList.push(userId);
        } else {
            console.log("Người này đã có trong task rồi")
        }
        
    }

    public removeUserId(userId: number) : void {
        const userIndex = this.userIdList.indexOf(userId);
        if(userIndex !== -1){
            this.userIdList.splice(userIndex,1);
        } else {
            console.log("Người ngày không có trong task")
        }
    }

    public getId(){
        return this.id;
    }

    public getUserIdList(): number[]{
        return this.userIdList;
    }
}