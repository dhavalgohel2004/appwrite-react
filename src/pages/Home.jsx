import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // Import Redux selector
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../component";

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Get user data from Redux

    useEffect(() => {
        appwriteService.getPost().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
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
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
