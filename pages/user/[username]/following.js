import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import FollowerCover from '../../../components/FollowerCover';

const Following = () => {

    const router = useRouter()
    const [followerData, setFollowerData] = useState();
    const [error, setError] = useState("Loading...");

    const username = router.query.username;
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.github.com/users/${username}/following`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()

            if (res.status === 403 || res.status === 404) {
                setError(data.message.split(".")[0])
            } else {
                setFollowerData(data)
                if (data.length === 0 ) {
                    setError(`${username} does'nt follow anyone.`)
                }
            }
        }

        username && fetchData()
    }, [username])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-back">
            <Head>
                <title>DEV | {username} Following</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="relative w-full flex justify-center items-center flex-col">
                <h1 className="my-6 text-2xl "><span className="text-green" >@{username}</span> Following</h1>
                {
                    followerData?.length > 0 ? (
                        <div className="p-4 flex flex-wrap justify-center items-center bg-back">
                        {
                            followerData?.map((e, index) => <FollowerCover key={index} data={e} />)
                        }
                        </div>
                    ) : error
                }
                <footer className="flex flex-col justify-center items-center my-6 bg-back w-full">
                <h1>Give it a ⭐ <a target="_blank" className="underline text-blue-500" href="https://github.com/24prathamesh2004/github-profile-search">here</a></h1>
                <p >Made with ❤️ by- Prathamesh Bhavsar.</p>
            </footer>
            </main>
            
        </div>
    )
}

export default Following
