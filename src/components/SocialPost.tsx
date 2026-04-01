import { Card } from '$/components/card'
import type { Post } from '../types/post.schema'

type SocialPostProps = Readonly<{
    post: Post;
}>;

const SocialPost = ({ post }: SocialPostProps) => {
    return (
        <Card
            title={post.title}
            description={post.body}
            className="w-full max-w-md border-slate-200 dark:border-slate-700"
            contentClassName="space-y-4"
        >
            <p className="text-sm text-slate-700 dark:text-slate-300">User ID: {post.userId}</p>
        </Card>
    )
}

export default SocialPost;