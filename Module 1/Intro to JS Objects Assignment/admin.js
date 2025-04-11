function message(user) {
    return  (user.role === "admin") 
    ? (user.active ? "Admin Access Granted!" : "Admin Access Revoked") 
    : (user.role === "user") 
      ? (user.active ? "User Access Granted!" : "User Access Revoked") 
      : "Access Denied";
} 
let user1 = { name: "Alice", role: "admin", active: false };
console.log(message(user1)); 

let user2 = { name: "Bob", role: "user", active: true };
console.log(message(user2)); 