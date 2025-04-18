import { User } from "src/models/user.model";

export class UserMapper {
    mapToModelUser(user: any): User {
        return {id: user._id.toString(), name: user.name, email: user.email, credentials: user.credentials.map((credential: any) => ({id: credential._id.toString(), provider: credential.provider, credentials: credential.credentials, userId: credential.userId}))};
    }

    toDomain(user: any): User {
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            credentials: user.credentials.map((credential: any) => ({
                id: credential._id.toString(),
                provider: credential.provider,
                credentials: credential.credentials,
                userId: credential.userId
            }))
        };
    }
}
