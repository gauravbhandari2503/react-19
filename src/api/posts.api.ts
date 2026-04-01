import BaseService from "$/services/api/baseService";
import type { Post, Posts } from "../types/post.schema";

class PostsService {
  private static instance: PostsService;
  private constructor() {}
  public static getInstance(): PostsService {
    if (!PostsService.instance) {
      PostsService.instance = new PostsService();
    }
    return PostsService.instance;
  }

  async getPosts(): Promise<Posts> {
    try {
        const response = await BaseService.get('/posts');
        return { posts: response as Post[] };
    } catch (error: any) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');   
    }
  }

  async createPost(postData: { title: string; body: string, userId?: number }): Promise<Post> {
    try {
        const response = await BaseService.post('/posts', { ...postData, userId: postData.userId || 1 });
        return response as Post;
    } catch (error: any) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');   
    }
  }
}

export default PostsService.getInstance();
