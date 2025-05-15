import { ReadlineManager } from "./classes/ReadlineManager";
import { TaskManagement } from "./classes/TaskManagement";
import { displayMenu } from "./UI/displayMenus";
import { handleMainMenu, handleProjectMenu, handleTaskMenu, handleUserMenu } from "./UI/handleMenus";



async function main() {
    const taskManager = new TaskManagement();
    
    try {
        await Promise.all([
            taskManager.loadTaskListFromFile('data/tasks.json'),
            taskManager.loadUserListFromFile('data/users.json'),
            taskManager.loadProjectListFromFile('data/projects.json')
        ]);
        console.log('Đã tải dữ liệu thành công!');
    } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        return;
    }


    let currentMenu = 'main';
    let running = true;

    while (running) {
        displayMenu(currentMenu);
        
        const answer = await ReadlineManager.question('Nhập lựa chọn của bạn: ');

        switch (currentMenu) {
            case 'main': 
                currentMenu = await handleMainMenu(answer);
                if (currentMenu === 'exit') running = false;
                break;
            case 'task': 
                currentMenu = await handleTaskMenu(answer, taskManager);
                break;
            case 'user':
                currentMenu = await handleUserMenu(answer, taskManager);
                break;
            case 'project':
                currentMenu = await handleProjectMenu(answer, taskManager);
                break;
        }
    }

    ReadlineManager.close();
}

// Run the application
main().catch(console.error);