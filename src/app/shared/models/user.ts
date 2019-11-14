export interface User {
    username: string;
    password: string;
    token: string;
    name: string;
    displayName: string;
    email : string;
    companyName: string;
    permissions: string[];
    scopes: string[];
    grant_type: string;
}
