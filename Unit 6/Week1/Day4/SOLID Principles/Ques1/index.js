class TaskManager {
    createTask(name) {
        console.log(`Creating task: ${name}`);
    }
}

class EmailService {
    sendEmail(to) {
        console.log(`Sending email to ${to}`);
    }
}

const taskManager = new TaskManager();
taskManager.createTask("Complete Project Report");

const emailService = new EmailService();
emailService.sendEmail("team@company.com");
