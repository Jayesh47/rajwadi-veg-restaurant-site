import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE;
export default async function ModelConnection() {
    if (MONGODB_URI){
        await mongoose.connect(MONGODB_URI, {
            'dbName': "rajwadiRestro",
            serverSelectionTimeoutMS: 10000
        }).then(() =>{
            return console.log("database is ready to work!");
        }).catch((err) => {
            return console.log("wait! database is not ready!");
        });
    }else {
        return console.log("can't be able to find the path of your database.");
    }
}