import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../component";

function Home() {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState(null); // Added userData state

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const user = await appwriteService.getCurrentUser(); // Ensure this method exists in appwriteService
                setUserData(user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserData(null);
            }
        };

        fetchUserData();

        // Fetch posts
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts();

                if (Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
                    setPosts(fetchedPosts);
                } else {
                    console.warn("No posts found.");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    if (!userData) {  // Ensure userData exists before accessing
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.length > 0 ? (
                        posts.map((post) =>
                            post && post.$id ? (
                                <div key={post.$id} className='mb-4 w-full'>
                                    <PostCard post={post} />
                                </div>
                            ) : (
                                console.warn("Skipping invalid post:", post)
                            )
                        )
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
