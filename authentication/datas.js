const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
};

const users = [
    { id: 1, name: "kalyan", age: 12, role: ROLE.ADMIN },
    { id: 2, name: "arun", age: 162, role: ROLE.BASIC },
    { id: 3, name: "hari", age: 544, role: ROLE.BASIC }
];

const projects = [
    { id: 1, name: "kalyan", age: 12, userID: 2 },
    { id: 2, name: "arun", age: 162, userID: 3 },
    { id: 3, name: "hari", age: 544, userID: 1 }
];

module.exports = {
    ROLE,
    users,
    projects
};
