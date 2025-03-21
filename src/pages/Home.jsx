import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";  // Import Redux selector
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../component";

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Get user data from Redux

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts && Array.isArray(posts.documents)) {
                setPosts(posts.documents);
            } else {
                setPosts([]); // Set an empty array to prevent errors
            }
        }).catch(error => {
            setPosts([]); 
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
                <div className='text-center'>
                    {/* Welcome Heading */}
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        Welcome to Our Platform
                    </h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Discover amazing content, connect with like-minded individuals, 
                        and stay informed with our latest updates. Join our community today!
                    </p>

                    {/* CTA Buttons */}
                    <div className='mt-6 flex justify-center space-x-4'>
        
                    </div>

                    {/* Decorative Image / Illustration */}
                    <div className='mt-12 flex justify-center'>
                        <img 
                            src='/assets/homepage-illustration.svg' 
                            alt='Illustration' 
                            className='w-3/5 md:w-1/3'
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;