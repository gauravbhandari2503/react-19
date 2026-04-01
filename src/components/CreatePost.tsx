import { Button } from '$/components/button';
import { Input } from '$/components/input';
import { useState, memo } from 'react';

const CreatePost = memo(function ({ onPostCreated }: { onPostCreated: (newPost: any) => void }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle post creation logic here
        const newPost = { title, body };
        console.log('Post created:', newPost);
        onPostCreated(newPost);
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Input
                label="Content"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <Button type="submit">Create Post</Button>
        </form>
    );
});

export default CreatePost;