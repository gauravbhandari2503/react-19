interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

interface Posts {
    posts: Post[];
}


export type { Post, Posts };