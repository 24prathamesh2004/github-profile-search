import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {

  const router = useRouter()
  const [username, setUsername] = useState()


  const onFinish = async (e) => {
    e.preventDefault()
    console.log('Received values of form: ', username);
    router.push(`/user/${username}`)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-back">
      <Head>
        <title>DEV Profile Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative h-screen w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-center items-center flex-col">
          <img src="/github.svg" alt="" height={200} width={200} />
          <h1 className="my-6 font-extrabold text-3xl">Find your DEV Profile</h1>
          <form onSubmit={onFinish} className="form-control">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="github username" className="input rounded-full bg-transparent sm:input-lg input-success input-bordered border-double border-2 w-72 sm:w-96" />
          </form>
        </div>
        {/* <div className="absolute bottom-0 right-0 h-16 w-16 bg-green rounded-2xl flex justify-center items-center">
          <img src="/github_gray.svg" alt="" height={50} width={50} />
        </div> */}
        <footer className="flex flex-col justify-center items-center absolute bottom-0 my-6">
          
        <h1>Give it a ⭐ <a target="_blank" className="underline text-blue-500" href="https://github.com/24prathamesh2004/github-profile-search">here</a></h1>
        <p >Made with ❤️ by- Prathamesh Bhavsar.</p>
        </footer>
      </main>

    </div>
  )
}
