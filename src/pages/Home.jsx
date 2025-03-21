import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // Import Redux selector
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../component";

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Get user data from Redux

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            console.log("Fetched Posts:", posts);
            if (Array.isArray(posts)) {
                setPosts(posts);  // Directly set posts, since it is already an array
            } else {
                setPosts([]); // Set an empty array if it's not in expected format
            }
        }).catch(error => {
            console.error("Error fetching posts:", error);
            setPosts([]); // Handle error gracefully
        });
    }, []);
    

    if (!userData) {  // Check if user is not logged in
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
                    {Array.isArray(posts) && posts.length > 0 ? (
posts.map((post) => (
    <div key={post.$id || post.id || post._id || Math.random()} className="p-2 w-1/4">
        <PostCard {...post} id={post.$id} />
    </div>
))
                    ) : (
                        <p className="text-center w-full">No posts available</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
