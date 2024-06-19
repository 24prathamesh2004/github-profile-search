import React, { useState, useEffect } from 'react'

const FollowerCover = ({ data }) => {

    const { avatar_url, followers_url, following_url, html_url, login } = data;

    return (

        <div className="w-80 h-28 m-2 p-4 border-2 flex rounded-xl items-center justify-between border-green">
            <div className="flex items-center">
                <div className="avatar">
                    <div className="w-20 h-20 mask mask-squircle">
                        <img src={avatar_url} />
                    </div>
                </div>
                <div className="ml-4">
                    <a href={html_url} className="no-underline">
                        <h2 className="card-title font-bold">{login}</h2>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default FollowerCover
