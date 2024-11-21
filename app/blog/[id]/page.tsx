"use client"; // This directive is required to use client-side hooks like useState and useEffect.

import { useParams } from "next/navigation"; // useParams is used to get the dynamic route parameter.
import { useState, useEffect } from "react"; // Import useState to manage state and useEffect for side effects.

export default function BlogPost() {
    // Retrieve the dynamic route parameter (id) for the current blog post.
    const { id } = useParams();

    // Static array of blog posts. In a real-world application, this would be fetched from an API or database.
    const posts = [
        { id: "1", title: "First Blog Post", content: "This is the content of the first post." },
        { id: "2", title: "Second Blog Post", content: "This is the content of the second post." },
    ];

    // Find the blog post that matches the route parameter.
    const post = posts.find((post) => post.id === id);

    // State to hold the list of comments for the current blog post.
    const [comments, setComments] = useState<string[]>([]);

    // State to hold the new comment input.
    const [newComment, setNewComment] = useState("");

    // On component mount, load comments from localStorage if they exist for this blog post.
    useEffect(() => {
        const storedComments = localStorage.getItem(`comments-${id}`); // Check if comments for this post ID are saved in localStorage.
        if (storedComments) {
            setComments(JSON.parse(storedComments)); // Parse and set the comments if they exist.
        }
    }, [id]); // This effect runs whenever the `id` changes (i.e., when navigating to a different blog post).

    // Function to handle adding a new comment.
    const handleAddComment = () => {
        // Prevent empty comments from being added.
        if (newComment.trim() !== "") {
            const updatedComments = [...comments, newComment]; // Add the new comment to the existing comments array.
            setComments(updatedComments); // Update the state with the new comments array.
            localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments)); // Save the updated comments array to localStorage.
            setNewComment(""); // Clear the input field after adding the comment.
        }
    };

    // If the blog post is not found, show an error message.
    if (!post) {
        return <div className="p-8">Post not found.</div>;
    }

    return (
        <div className="p-8">
            {/* Display the blog post title */}
            <h1 className="text-4xl font-bold">{post.title}</h1>
            {/* Display the blog post content */}
            <p className="mt-4">{post.content}</p>

            {/* Comments Section */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Comments</h2>
                <ul className="mt-4 space-y-2">
                    {/* Render the list of comments */}
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <li key={index} className="border p-2 rounded">
                                {comment}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet.</p> // Message when no comments are available.
                    )}
                </ul>

                {/* Comment Input Form */}
                <div className="mt-4">
          <textarea
              className="w-full border p-2 rounded text-black bg-white"
              rows={4}
              placeholder="Add a comment..." // Placeholder text for the textarea.
              value={newComment} // Bind the textarea value to the newComment state.
              onChange={(e) => setNewComment(e.target.value)} // Update the newComment state as the user types.
          />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={handleAddComment} // Call the function to add a new comment when the button is clicked.
                    >
                        Add Comment
                    </button>
                </div>
            </div>
        </div>
    );
}
