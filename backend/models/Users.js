import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true},
    passwordHash: { type: String, required: true }
});

const Users = mongoose.model('Users', userSchema);

export default Users;