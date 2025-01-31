export interface UserProfile {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    attributes?: Record<string, unknown>
    roles?: string[]
}
