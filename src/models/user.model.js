export class UserModel {
    constructor(name, email, password, userId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userId = userId;
    }

    static createUser(newUser) {
        const user = new UserModel(newUser.name, newUser.email, newUser.password, users.length + 1);
        users.push(user);
        return user;
    }

    static getAllUsers() {
        return users;
    }

    static getUserById(id) {
        return users.find(user => user.userId === id);
    }

    static checkUser(email, password) {
        return users.find(user => user.email == email && user.password == password);   
    }
}

let users = [];
users.push(new UserModel("abc", "abc@gmail.com", 123, 1));