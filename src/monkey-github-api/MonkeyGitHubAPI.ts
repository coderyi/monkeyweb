import { IMonkeyGitHubUser, IMonkeyGitHubRepository } from "../monkey-github-api/MonkeyGitHubInterfaces";
export class MonkeyGitHubAPI {
    public readonly searchUsers = async (start: number, page: number, location: string, language: string) => {
        var list: IMonkeyGitHubUser[] = [];
        let url = 'https://api.github.com/search/users?q=location:'+location+'+language:'+language+'&sort=followers&order=desc&page='+page
        if (location.length < 1) {
            url = 'https://api.github.com/search/users?q=language:'+language+'&sort=followers&order=desc&page='+page
        }
        const response = await fetch(url)
        const responseJson = await response.json();
        let i:number;
        for (i = 0; i < responseJson.items.length; i++) {
            var item = responseJson.items[i]
            let newItem: IMonkeyGitHubUser = {
                title: item.login,
                avatar_url: item.avatar_url
            }
            list[i] = newItem
        }
        return list
    }

    public readonly searchRepositories = async (start: number, page: number, language: string) => {
        var list: IMonkeyGitHubRepository[] = [];

        const response = await fetch('https://api.github.com/search/repositories?sort=stars&order=desc&page='+page+'&q=language:'+language)
        const responseJson = await response.json();
        let i:number;
        for (i = 0; i < responseJson.items.length; i++) {
            var item = responseJson.items[i]
            let newItem: IMonkeyGitHubRepository = {
                title: item.full_name,
                avatar_url: item.owner.avatar_url,
                description: item.description,
                created_at: item.created_at,
                stargazers_count: item.stargazers_count,
                forks_count: item.forks_count
            }
            list[i] = newItem
        }
        return list
    }

}
