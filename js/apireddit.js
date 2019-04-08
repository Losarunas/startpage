class Redditapi {
    constructor(firstSubreddit, secondSubreddit) {
        // Subreddits
        this.firstSubreddit = firstSubreddit
        this.secondSubreddit = secondSubreddit;
    }

    async getData() {
        const firstSubRes = await fetch(`https://www.reddit.com/r/${this.firstSubreddit}/top/.json`);
        const secondSubRes = await fetch(`https://www.reddit.com/r/${this.secondSubreddit}/top/.json`);

        const firstSub = await firstSubRes.json();
        const secondSub = await secondSubRes.json();


        return {
            firstSub,
            secondSub
        }
    }
}
