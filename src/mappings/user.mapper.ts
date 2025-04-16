import { User } from "src/models/user.model";

export class UserMapper {
    mapToModelUser(user: any): User {
        return { id: user._id.toString(), name: user.name };
    }
}
