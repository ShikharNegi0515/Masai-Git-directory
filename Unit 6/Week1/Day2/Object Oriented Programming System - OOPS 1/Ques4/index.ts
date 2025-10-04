class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}

class Admin extends User {
    constructor(username: string) {
        super(username);
    }

    showUsername(): void {
        console.log(`Admin username: ${this.username}`);
    }
}

const admin = new Admin("ShikharAdmin");
admin.showUsername();
