import CreatePost from "../components/CreatePost";
import SocialPost from "../components/SocialPost";
import PostsService from "../api/posts.api";
import type { Post } from "../types/post.schema";
import { useEffect, useState, type ReactNode, useTransition } from "react";

const USER_ID = 1; // Assuming a fixed user ID for demonstration purposes

interface OptimisticPost extends Post {
    isPending: boolean;
}  

async function fetchPostsData() {
  const response = await PostsService.getPosts();
  return Array.isArray(response) ? response : response.posts || [];
}

async function createPost(postData: { title: string; body: string, userId?: number }) {
  const response = await PostsService.createPost({ ...postData, userId: postData.userId || USER_ID });
  return response;
}

const SocialMedia = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pendingPosts, setPendingPosts] = useState<OptimisticPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [_isPending, startTransition] = useTransition();

  const optimisticPosts = [...pendingPosts, ...posts];

  const onPostCreated = async (newPost: Post) => {
    const temporaryPost: OptimisticPost = { ...newPost, id: Date.now(), isPending: true, userId: USER_ID };
    startTransition(async () => {
        setPendingPosts((currentPendingPosts) => [temporaryPost, ...currentPendingPosts]);

        try {
            const response = await createPost({ ...newPost, userId: USER_ID });

            if (response) {
                setPosts((prevPosts) => [response, ...prevPosts]);
            }
        } finally {
            setPendingPosts((currentPendingPosts) =>
                currentPendingPosts.filter((post) => post.id !== temporaryPost.id),
            );
        }
    });
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsArray = await fetchPostsData();
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  let postsContent: ReactNode;

  if (isLoading) {
    postsContent = (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        Loading posts...
      </div>
    );
  } else if (posts.length === 0) {
    postsContent = (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        No posts available.
      </div>
    );
  } else {
    postsContent = optimisticPosts.map((post) => (
      <SocialPost key={post.id} post={post} />
    ));
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
        <div className="mx-auto w-full max-w-4xl p-4 sm:p-6">
          <h1 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Social Feed
          </h1>
          <CreatePost onPostCreated={onPostCreated} />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 pb-8 pt-72 sm:px-6 sm:pt-50">
        {postsContent}
      </section>
    </div>
  );
};

export default SocialMedia;
