'use client'
import ProfileContainer from "@/containers/Profile/ProfileContainer";
import {useEffect, useState} from "react";
import {postAPI} from "@/services/fetchAPI";

export default () => {
    const [data, setData] = useState(null)

    //"example@ofistik.com"
    async function getProfileData() {
        const response = await postAPI("/auth", {email: "example@ofistik.com"} ,"POST")

        setData(response)
    }

    useEffect(() => {
        getProfileData()
    }, [])

    return <ProfileContainer data={data?.data}/>
}
