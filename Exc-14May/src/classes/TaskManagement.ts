import { getAvailableId } from "../ultils/listUltils";
import { Project } from "./Project";
import { Task } from "./Task";
import { User } from "./User";
const fs = require('fs');

export class TaskManagement{
    private userList: User[];

    private projectList: Project[];

    private taskList: Task[];

    public constructor()
    {
        this.userList = []
        this.projectList = []
        this.taskList = []
    }

    public loadUserListFromFile(fileName: string): void{
        if(fs.existsSync(fileName)){
            const data = fs.readFileSync(fileName, 'utf-8');
            this.userList = JSON.parse(data)
            console.log(`Tải user thành công ${fileName}`);
        } else {
            console.log("File không tồn tại");
        }
    }

    public loadProjectListFromFile(fileName: string): void{
        if(fs.existsSync(fileName)){
            const data = fs.readFileSync(fileName, 'utf-8');
            this.projectList = JSON.parse(data)
            console.log(`Tải project thành công ${fileName}`);
        } else {
            console.log("File không tồn tại");
        }
    }

    public loadTaskListFromFile(fileName: string): void{
        if(fs.existsSync(fileName)){
            const data = fs.readFileSync(fileName, 'utf-8');
            this.taskList = JSON.parse(data)
            console.log(`Tải task thành công ${fileName}`);
        } else {
            console.log("File không tồn tại");
        }
    }


    public addUser(name: string, address: string): void {
        const newId: number = getAvailableId(this.userList);
        const newUser: User = new User(newId, name, address);
        this.userList.push(newUser);
        console.log(`Thêm user thành công`);
    }

    public addTask(name: string, description: string, dateCreate: string, dateDeadline: string): void {
        const newId: number = getAvailableId(this.taskList);
        const newTask: Task = new Task(newId, name, description, dateCreate, dateDeadline);
        this.taskList.push(newTask);
        console.log(`Thêm task thành công`);
    }

    public addProject(name: string, description: string): void{
        const newId: number = getAvailableId(this.projectList);
        const newProject: Project = new Project(newId, name, description);
        this.projectList.push(newProject);
        console.log(`Thêm task thành công`);
    }

    public removeUser(userId: number) : void{
        const userIndex = this.userList.findIndex(user => user.getId() == userId);
        if(userIndex !== -1){
            this.userList.splice(userIndex,1);
            for (let i = 0; i  < this.taskList.length; i++) {
                const task: Task = this.taskList[i];
                if(task.getUserIdList().indexOf(userId) !== -1){
                    task.removeUserId(userId);
                }
            }
        } else {
            console.log("Người ngày không có trong danh sách")
        }
    }

    public removeTask(taskId: number) : void{
        const taskIndex = this.taskList.findIndex(task => task.getId() == taskId);
        if(taskIndex !== -1){
            this.taskList.splice(taskIndex,1);
            for (let i = 0; i  < this.projectList.length; i++) {
                const project: Project = this.projectList[i];
                if(project.getTaskIdList().indexOf(taskId) !== -1){
                    project.removeTaskId(taskId);
                }
            }
        } else {
            console.log("Task này không có trong danh sách")
        }
    }

    public removeProject(projectId: number): void {
        const projectIndex = this.projectList.findIndex(project => project.getId() == projectId);
        if(projectIndex !== -1){
            const taskIdList: number[] = this.projectList[projectIndex].getTaskIdList(); 
            for (let i = 0; i  < taskIdList.length; i++) {

                const taskIndex = this.taskList.findIndex(task => task.getId() == taskIdList[i]);

                if(taskIndex !== -1){
                    this.taskList.splice(taskIndex,1);
                }    
            }
            this.projectList.splice(projectIndex,1);
        } else {
            console.log("Project này không có trong danh sách")
        }
    }

    public getUserList(){
        return this.userList;
    }

    public getTaskList(){
        return this.taskList;
    }

    public getProjectList(){
        return this.projectList;
    }

    public assignUserToTask(userId: number, taskId: number): void{
    }

    public assignTaskToProject(taskId: number, projectId: number): void{
        
    }
}