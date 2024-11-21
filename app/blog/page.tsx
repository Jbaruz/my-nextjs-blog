import Link from "next/link";


    const posts = [
        { id: "1", title: "First Blog Post", description: "This is the first post.", commentsCount: 3 },
        { id: "2", title: "Second Blog Post", description: "This is the second post.", commentsCount: 0 },
    ];

export default function Blog() {

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Blog Posts</h1>
            <ul className="mt-6 space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="border p-4 rounded">
                        <Link href={`/blog/${post.id}`} className="text-2xl font-semibold hover:text-blue-500">
                            {post.title}
                        </Link>

                        <p className="text-gray-700">{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
