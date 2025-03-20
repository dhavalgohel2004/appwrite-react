import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../component'

function AllPost() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts();
                // console.log("Fetched Posts:", fetchedPosts);
    
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

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
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
    )
}

export default AllPost;
