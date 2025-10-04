class User {
    #orgCode = "DuckCorp";

    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    introduce() {
        console.log(`I am ${this.name} from ${this.#orgCode}`);
    }
}

class Manager extends User {
    getRole() {
        console.log(this.role);
    }
}

const user1 = new User("Daffy", "Employee");
user1.introduce();

const mgr = new Manager("Donald", "Manager");
mgr.introduce();
mgr.getRole();


