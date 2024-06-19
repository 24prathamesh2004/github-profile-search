
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import RepoCover from '../../components/RepoCover'
import Link from 'next/link'

const Dashboard = () => {

    const router = useRouter()
    const [userData, setUserData] = useState();
    const [repoData, setRepoData] = useState();
    const [request, setRequest] = useState()
    const [current, setCurrent] = useState("Top Repos");
    const [error, setError] = useState("Loading...");

    const username = router.query.username;

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.github.com/users/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()

            if (res.status === 403 || res.status === 404) {
                setError(data.message.split(".")[0])
            } else {
                setUserData(data)
            }

        }

        username && fetchData()
    }, [username])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.github.com/users/${username}/repos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()
            if (res.status === 403 || res.status === 404) {
                setError(data.message.split(".")[0])
            } else {
                setRepoData(data)
            }
        }

        username && fetchData()
    }, [username])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`https://api.github.com/rate_limit`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json()

            setRequest(data.rate)
        }

        username && fetchData()
    }, [username])
    
    return (
        <div className="flex flex-col items-center justify-center bg-back min-h-screen">
            <Head>
                <title>DEV | {username}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="relative w-full flex justify-center items-center flex-col bg-back">
                {
                    userData ? (
                        <>
                        <div className="absolute top-0 left-0 p-4">
                            <h1 className="text-2xl">{request?.limit}/{request?.remaining}</h1>
                            <h1 className="uppercase">Request Left</h1>
                        </div>
                            <div className="p-4 w-full container flex flex-col justify-center items-center bg-back">
                                <img src={userData.avatar_url} alt="" className="rounded-full mt-12 h-56 bg-green p-2" />
                                <div data-tip={userData.bio} className="tooltip">
                                    <h1 className="mt-6 font-extrabold text-6xl text-center">{userData.name}</h1>
                                </div>
                                <h1 className="my-2 text-3xl font-semibold text-green">@{userData.login}</h1>

                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <h1 className="ml-2 text-xl">{userData.location}</h1>
                                </div>

                                <div className="w-full lg:w-6/12 my-6 shadow flex flex-col lg:flex-row">
                                    <div className="stat bg-back" onClick={() => setCurrent("Top Repos")}>
                                        <div className="stat-figure text-green">
                                            <img src="/repo.svg" alt="" height={40} width={40} />
                                        </div>
                                        <div className="stat-title">Total Repo</div>
                                        <div className="stat-value">{userData.public_repos}</div>
                                    </div>
                                    <Link href={`/user/${username}/follow`}>
                                    <div className="stat bg-back" onClick={() => setCurrent("Followers")}>
                                        <div className="stat-figure text-green">
                                            <img src="/following.svg" alt="" height={40} width={40} />
                                        </div>
                                        <div className="stat-title">Followers</div>
                                        <div className="stat-value ">{userData.followers}</div>
                                    </div>
                                    </Link>
                                    <Link href={`/user/${username}/following`}>
                                    <div className="stat bg-back" onClick={() => setCurrent("Following")}>
                                        <div className="stat-figure text-green">
                                            <img src="/followers.svg" alt="" height={40} width={40} />
                                        </div>
                                        <div className="stat-title">Following</div>
                                        <div className="stat-value">{userData.following}</div>
                                    </div>
                                    </Link>
                                </div>
                                <div className="flex justify-evenly items-center">
                                    <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank"><i className="fab fa-twitter"></i> Twitter</a>
                                    <a href={userData.html_url} className="my-2 mx-6" target="_blank"><i className="fab fa-github"></i> GitHub</a>
                                    <a href={userData.blog} target="_blank"><i className="fas fa-link"></i> Website</a>
                                </div>
                                
                            </div>

                            <div className="bg-back min-h-screen flex items-start justify-center w-full p-4 pt-12">
                                <div className="container">
                                    <h1 className="text-black font-semibold text-2xl">Showing: {current}</h1>
                                    <div className="my-6 flex flex-wrap justify-center">
                                        {
                                            repoData ? repoData?.sort((a, b) => b.stargazers_count - a.stargazers_count).filter((e, index) => index < 6).map((e, index) => <RepoCover key={index} data={e} />) : "Loading..."
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
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

export default Dashboard
