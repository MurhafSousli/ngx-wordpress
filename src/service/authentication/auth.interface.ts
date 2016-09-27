export interface IAuthenticate {

    basic(username: string, password: string): void;
    logout(): void;
}