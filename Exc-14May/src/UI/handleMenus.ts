import { TaskManagement } from '../classes/TaskManagement';
import { ReadlineManager } from '../classes/ReadlineManager';
import { formatTask, formatUser, formatProject } from '../ultils/formatUltils';



export async function handleMainMenu(choice: string): Promise<string> {
    switch (choice) {
        case '1': return 'task';
        case '2': return 'user';
        case '3': return 'project';
        case '0':
            console.log('Cảm ơn đã sử dụng hệ thống!');
            return 'exit';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'main';
    }
}

export async function handleTaskMenu(choice: string, taskManagement: TaskManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH TASK ===');
            taskManagement.getTaskList().forEach(task => console.log(formatTask(task)));
            return 'task';

        case '2':
            console.log('\n=== THÊM TASK MỚI ===');
            console.log('Nhập thông tin task (Tên, Mô tả, Ngày tạo, Hạn chót):');
            const taskInfo = await ReadlineManager.question('> ');
            const [name, description, dateCreate, dateDeadline] = taskInfo.split(',').map((item: string) => item.trim());
            taskManagement.addTask(name, description, dateCreate, dateDeadline);
            return 'task';

        case '3':
            console.log('\n=== XOÁ TASK ===');
            console.log('Nhập ID task cần xoá:');
            const taskIdToDelete = parseInt(await ReadlineManager.question('> '));
            taskManagement.removeTask(taskIdToDelete);
            return 'task';

        case '4':
            console.log('\n=== THÊM NGƯỜI PHỤ TRÁCH TASK ===');
            console.log('Nhập ID người dùng và ID task (cách nhau bởi dấu phẩy):');
            const userAndTask = await ReadlineManager.question('> ');
            const [userId, taskId] = userAndTask.split(',').map((item: string) => parseInt(item.trim()));
            taskManagement.assignUserToTask(userId, taskId);
            return 'task';

        case '5':
            console.log('\n=== XOÁ NGƯỜI PHỤ TRÁCH TASK ===');
            console.log('Nhập ID người dùng và ID task (cách nhau bởi dấu phẩy):');
            const userAndTaskToRemove = await ReadlineManager.question('> ');
            const [userIdToRemove, taskIdToRemove] = userAndTaskToRemove.split(',').map((item: string) => parseInt(item.trim()));
            taskManagement.removeUserFromTask(userIdToRemove, taskIdToRemove);
            return 'task';

        case '6':
            console.log('\n=== CẬP NHẬT TRẠNG THÁI TASK ===');
            console.log('Nhập ID task và trạng thái (true/false):');
            const taskStatusInfo = await ReadlineManager.question('> ');
            const [taskIdToUpdate, status] = taskStatusInfo.split(',').map((item: string) => item.trim());
            taskManagement.setTaskStatus(parseInt(taskIdToUpdate), status === 'true');
            return 'task';

        case '7':
            console.log('\n=== TASK CHƯA HOÀN THÀNH ===');
            taskManagement.getUnfinishedTaskList().forEach(task => console.log(formatTask(task)))
            return 'task';

        case '8':
            console.log('\n=== TASK ĐÃ HOÀN THÀNH ===');
            taskManagement.getFinishedTaskList().forEach(task => console.log(formatTask(task)))
            return 'task';

        case '9':
            console.log('\n=== TÌM KIẾM TASK ===');
            console.log('Nhập tên task cần tìm:');
            const taskName = await ReadlineManager.question('> ');
            const foundTasks = taskManagement.getTaskByName(taskName);
            if (foundTasks.length > 0) {
                foundTasks.forEach(task => console.log(formatTask(task)));
            } else {
                console.log('Không tìm thấy task nào.');
            }
            return 'task';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'task';
    }
}

export async function handleUserMenu(choice: string, taskManagement: TaskManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH NGƯỜI DÙNG ===');
            taskManagement.getUserList().forEach(user => console.log(formatUser(user)));
            return 'user';

        case '2':
            console.log('\n=== THÊM NGƯỜI DÙNG MỚI ===');
            console.log('Nhập thông tin người dùng (Tên, Địa chỉ):');
            const userInfo = await ReadlineManager.question('> ');
            const [name, address] = userInfo.split(',').map((item: string) => item.trim());
            taskManagement.addUser(name, address);
            return 'user';

        case '3':
            console.log('\n=== XOÁ NGƯỜI DÙNG ===');
            console.log('Nhập ID người dùng cần xoá:');
            const userIdToDelete = parseInt(await ReadlineManager.question('> '));
            taskManagement.removeUser(userIdToDelete);
            return 'user';

        case '4':
            console.log('\n=== TÌM KIẾM NGƯỜI DÙNG ===');
            console.log('Nhập tên người dùng cần tìm:');
            const userName = await ReadlineManager.question('> ');
            const foundUsers = taskManagement.getUserByName(userName);
            if (foundUsers.length > 0) {
                foundUsers.forEach(user => console.log(formatUser(user)));
            } else {
                console.log('Không tìm thấy người dùng nào.');
            }
            return 'user';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'user';
    }
}

export async function handleProjectMenu(choice: string, taskManagement: TaskManagement): Promise<string> {
    switch (choice) {
        case '1':
            console.log('\n=== DANH SÁCH PROJECT ===');
            taskManagement.getProjectList().forEach(project => console.log(formatProject(project,taskManagement.getProjectStatus(project.getId() ))));
            return 'project';

        case '2':
            console.log('\n=== THÊM PROJECT MỚI ===');
            console.log('Nhập thông tin project (Tên, Mô tả):');
            const projectInfo = await ReadlineManager.question('> ');
            const [name, description] = projectInfo.split(',').map((item: string) => item.trim());
            taskManagement.addProject(name, description);
            return 'project';

        case '3':
            console.log('\n=== XOÁ PROJECT ===');
            console.log('Nhập ID project cần xoá:');
            const projectIdToDelete = parseInt(await ReadlineManager.question('> '));
            taskManagement.removeProject(projectIdToDelete);
            return 'project';

        case '4':
            console.log('\n=== THÊM TASK VÀO PROJECT ===');
            console.log('Nhập ID task và ID project (cách nhau bởi dấu phẩy):');
            const taskAndProject = await ReadlineManager.question('> ');
            const [taskId, projectId] = taskAndProject.split(',').map((item: string) => parseInt(item.trim()));
            taskManagement.assignTaskToProject(taskId, projectId);
            return 'project';

        case '5':
            console.log('\n=== XOÁ TASK KHỎI PROJECT ===');
            console.log('Nhập ID task và ID project (cách nhau bởi dấu phẩy):');
            const taskAndProjectToRemove = await ReadlineManager.question('> ');
            const [taskIdToRemove, projectIdToRemove] = taskAndProjectToRemove.split(',').map((item: string) => parseInt(item.trim()));
            taskManagement.removeTaskFromProject(taskIdToRemove, projectIdToRemove);
            return 'project';

        case '6':
            console.log('\n=== TÌM KIẾM PROJECT ===');
            console.log('Nhập tên project cần tìm:');
            const projectName = await ReadlineManager.question('> ');
            const foundProjects = taskManagement.getProjectByName(projectName);
            if (foundProjects.length > 0) {
                foundProjects.forEach(project => console.log(formatProject(project, taskManagement.getProjectStatus(project.getId()))));
            } else {
                console.log('Không tìm thấy project nào.');
            }
            return 'project';
        case '0': return 'main';
        default:
            console.log('Lựa chọn không hợp lệ!');
            return 'project';
    }
}