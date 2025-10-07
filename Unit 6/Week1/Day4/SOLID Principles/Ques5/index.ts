interface Database {
  save(data: string): void;
}

class MySQLService implements Database {
  save(data: string) {
    console.log("Saving to MySQL:", data);
  }
}

class MongoDBService implements Database {
  save(data: string) {
    console.log("Saving to MongoDB:", data);
  }
}

class UserService {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  register(user: string) {
    this.db.save(user);
  }
}

const mysqlService = new MySQLService();
const mongoService = new MongoDBService();

const userService1 = new UserService(mysqlService);
userService1.register("Alice");

const userService2 = new UserService(mongoService);
userService2.register("Bob");
