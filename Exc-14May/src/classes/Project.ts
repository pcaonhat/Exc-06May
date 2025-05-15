import { toJSON } from "../decorator/toJSONDecorator";

@toJSON
export class Project {

    private id: number;

    public name: string;

    public description: string;

    private taskIdList: number[];

    public constructor (id: number, name: string, description: string, taskIdList: number[] = []){
        this.id = id;
        this.name = name;
        this.description = description;
        this.taskIdList = taskIdList
    }

    public addTaskId(taskId: number) : void{
        if(this.taskIdList.indexOf(taskId) === -1){
            this.taskIdList.push(taskId);
        } else {
            console.log("Project này đã có task này rồi");
        }
    }

    public removeTaskId(taskId: number) : void {
        const taskIndex = this.taskIdList.indexOf(taskId);

        if(taskIndex !== -1){
            this.taskIdList.splice(taskIndex, 1)
        } else {
            console.log("Project không có task này");
        }
    }

    public getId(): number {
        return this.id;
    }

    public getTaskIdList(){
        return this.taskIdList;
    }

}