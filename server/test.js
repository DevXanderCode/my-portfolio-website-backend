const models = require("./server").models;
/*
let toSave = [
    { name: "Xander", email: "test@test.com"},
    { name: "devXander", email: "test@xander.com"},
    { name: "XenderDev", email: "test@dev.com"},
    { name: "Xander1", email: "xander@test.com"},
    { name: "Xander2", email: "dev@test.com"},
    { name: "devXander1", email: "xander1@test.com"},
    { name: "devXander2", email: "test@test1.com"},
    { name: "devXander3", email: "test@xander2.com"},
    { name: "Xander1", email: "test@tdev2.com"},
    { name: "XanderDev1", email: "xander@test1.com"},
];

toSave.map(obj => {
    models.Profile.create(obj, (err, created) => {
        console.log("created? ", created, err);
    });
});
*/

const filter = {
    where: {
        name: {like: "Xander"},
    },
    order: "id ASC ",
    limit: 10,
};

models.Profile.findById("5f16a4f48b6ff530107faffc", (err, found) => {
    console.log("Found?", found, err);
});