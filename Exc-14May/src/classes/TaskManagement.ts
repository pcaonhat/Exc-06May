import { fail } from "assert";
import { getAvailableId, saveListToFile } from "../ultils/listUltils";
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
            const users = JSON.parse(data);
            this.userList = users.map((user: any) => new User(user.id, user.name, user.address));
            console.log(`Tải user thành công ${fileName}`);
        } else {
            console.log("File không tồn tại");
        }
    }

    public loadProjectListFromFile(fileName: string): void{
        if(fs.existsSync(fileName)){
            const data = fs.readFileSync(fileName, 'utf-8');
            const projects = JSON.parse(data)
            this.projectList = projects.map((project: any) => new Project(project.id, project.name, project.description, project.taskIdList))
            console.log(`Tải project thành công ${fileName}`);
        } else {
            console.log("File không tồn tại");
        }
    }

    public loadTaskListFromFile(fileName: string): void{
        if(fs.existsSync(fileName)){
            const data = fs.readFileSync(fileName, 'utf-8');
            const tasks = JSON.parse(data)
            this.taskList = tasks.map((task: any) => new Task(task.id, task.name, task.description, task.dateCreate, task.dateDeadline, task.isFinished, task.userIdList))
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
        saveListToFile(this.userList,'data/users.json');
    }

    public addTask(name: string, description: string, dateCreate: string, dateDeadline: string): void {
        const newId: number = getAvailableId(this.taskList);
        const newTask: Task = new Task(newId, name, description, dateCreate, dateDeadline);
        this.taskList.push(newTask);
        console.log(`Thêm task thành công`);
        saveListToFile(this.taskList, 'data/tasks.json');
    }

    public addProject(name: string, description: string): void{
        const newId: number = getAvailableId(this.projectList);
        const newProject: Project = new Project(newId, name, description);
        this.projectList.push(newProject);
        console.log(`Thêm task thành công`);
        saveListToFile(this.projectList, 'data/projects.json');
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
        saveListToFile(this.userList,'data/users.json');
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
        saveListToFile(this.taskList, 'data/tasks.json');
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
        saveListToFile(this.taskList, 'data/tasks.json');
        saveListToFile(this.projectList, 'data/projects.json');

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
        const user = this.userList.find(user => user.getId() === userId)
        const task = this.taskList.find(task => task.getId() === taskId)

        if(user && task){
            task.addUserId(userId);
            console.log(`Đã thêm user ${userId} vào task ${taskId}`)
        } else {
            console.log(`Giá trị không hợp lệ`)
        }
        saveListToFile(this.taskList, 'data/tasks.json');
    }

    public assignTaskToProject(taskId: number, projectId: number): void{
        const project = this.projectList.find(project => project.getId() === projectId)
        const projectHasTask = this.projectList.find(project => project.getTaskIdList().indexOf(taskId) !== -1)
        const task = this.taskList.find(task => task.getId() === taskId)

        if(project && task){
            if(projectHasTask){
                projectHasTask.removeTaskId(taskId);
                console.log(`Đã xóa task ${taskId} khỏi project ${projectHasTask.getId()}`)
            }
            project.addTaskId(taskId);
            console.log(`Đã thêm task ${taskId} vào project ${projectId}`)
        } else {
            console.log(`Giá trị không hợp lệ`)
        }
        saveListToFile(this.projectList, 'data/projects.json');
    }
    
    public removeUserFromTask(userId: number, taskId: number): void{
        const user = this.userList.find(user => user.getId() === userId)
        const task = this.taskList.find(task => task.getId() === taskId)

        if(user && task){
            task.removeUserId(userId);
            console.log(`Đã xóa user ${userId} khỏi task ${taskId}`)
        } else {
            console.log(`Giá trị không hợp lệ`)
        }
        saveListToFile(this.taskList, 'data/tasks.json');
    }

    public removeTaskFromProject(taskId: number, projectId: number): void{
        const project = this.projectList.find(project => project.getId() === projectId)
        const task = this.taskList.find(task => task.getId() === taskId)

        if(project && task){
            project.removeTaskId(taskId);
            console.log(`Đã xóa task ${taskId} khỏi project ${projectId}`)
        } else {
            console.log(`Giá trị không hợp lệ`)
        }
        saveListToFile(this.projectList, 'data/projects.json');
    }

    public setTaskStatus(taskId: number, status: boolean): void{
        const task = this.taskList.find(task => task.getId() === taskId)

        if(task){
            task.isFinished = status;
            console.log(`Đã thêm cập nhật trạng thái của task  ${taskId} thành ${status}`)
        } else {
            console.log(`Giá trị không hợp lệ`)
        }

        saveListToFile(this.taskList, 'data/tasks.json');
    }

    public getProjectStatus(projectId:number ): boolean{
        const project = this.projectList.find(project => project.getId() === projectId)

        if(project){
            const taskIdList: number[] = project.getTaskIdList();
            const isAnyTaskUnFinished = taskIdList.some(taskId => {
                const task = this.taskList.find(task => task.getId() === taskId)
                return task?.isFinished === false
            })
            return !isAnyTaskUnFinished;
            
        } else {
            console.log(`Giá trị không hợp lệ`)
            return false;
        }
    }

    public getFinishedTaskList(): Task[]{
        return this.taskList.filter(task => task.isFinished);
    }

    public getUnfinishedTaskList(): Task[]{
        return this.taskList.filter(task => !task.isFinished)
    }
    
    public getTaskByName(name: string) : Task[] {
        return this.taskList.filter(task => task.name.toLowerCase().includes(name.toLowerCase()));
    }

    public getUserByName(name: string) : User[] {
        return this.userList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    public getProjectByName(name: string) : Project[] {
        return this.projectList.filter(project => project.name.toLowerCase().includes(name.toLowerCase()));
    }
}