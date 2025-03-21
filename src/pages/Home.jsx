import React, {useEffect, useState} from 'react'
// import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
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
        )
    }
    return (
        <div className='w-full py-8'>
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
                        <Link to='/login' className='px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition'>
                            Get Started
                        </Link>
                        <Link to='/about' className='px-6 py-3 border-2 border-gray-800 text-gray-800 text-lg font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition'>
                            Learn More
                        </Link>
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
    )
}

export default Home