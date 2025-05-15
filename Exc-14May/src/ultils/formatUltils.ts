import { Project } from "../classes/Project";
import { Task } from "../classes/Task";
import { User } from "../classes/User";

export function formatTask(task: Task): string {
    const userIds = task.getUserIdList().length > 0 ? task.getUserIdList().join(', ') : 'Không có người phụ trách';
    return `[ID: ${task.getId()}] ${task.name} (${task.description}) Deadline: ${task.dateDeadline} - ${task.isFinished ? 'Đã xong' : 'Chưa xong'} | Người phụ trách: ${userIds}`;
}

export function formatUser(user: User): string {
    return `[ID: ${user.getId()}] ${user.name} - ${user.address}`;
}
 
export function formatProject(project: Project, isFinished: boolean): string {
    const taskIds = project.getTaskIdList().length > 0 ? project.getTaskIdList().join(', ') : 'Không có task';
    return `[ID: ${project.getId()}] ${project.name} (${project.description}) - ${isFinished ? 'Đã xong' : 'Chưa xong'} Task: ${taskIds}`;
}