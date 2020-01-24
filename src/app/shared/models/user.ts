export interface User {
    username: String;
    password: String;
    token: String;
    name: String;
    displayName: String;
    email : String;
    companyName: String;
    permissions: String[];
    scopes: String[];
    grant_type: String;
}
