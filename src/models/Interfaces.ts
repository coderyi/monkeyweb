import { IMonkeyGitHubUser, IMonkeyGitHubRepository } from "../monkey-github-api/MonkeyGitHubInterfaces";
export interface IUser extends IMonkeyGitHubUser {
    index?: number
}

export interface IRepository extends IMonkeyGitHubRepository {
    index?: number
}
