import { User } from "../entities";

export class UserService {
    async getUserById(id: number) {
        if (!id) {
            return null;
        }
        const user = await User.findOne({ id: id });
        console.log("user ins user service", user);
        return user;
    }
    async getUsersByName(name: string) {
        let users;
        if (!name) {
            users = await User.find();
        }
        else {
            users = await User.find({ name: name });
        }
        return users;
    }
    async createUser(name: string, dob: string) {
        const user = new User();
        user.name = name;
        user.dob = dob;
        await user.save();
        return user;
    }

    async updateUser(id: number, name: string, dob: string) {
        const user = await User.preload({
            id: id,
            name: name,
            dob: dob,
        });
        if (!user) {
            this.createUser(name, dob);
        }
    }
    async deleteUser(id: number) {
        await User.delete({ id: id });
    }
}
