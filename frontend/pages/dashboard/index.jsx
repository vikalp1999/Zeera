import { useEffect } from "react"
import Chat from "../../components/Chat/Chat.jsx"
import AllUser from "../../components/dashboard/alluser"
import Tasks from "../../components/dashboard/Tasks.jsx"
import { useSelector } from 'react-redux'
import { useRouter } from "next/router.js"

export default function Dashboard (){
    const { isAuth } = useSelector(state=>state.auth)
    const router = useRouter()

    useEffect(() => {
        if(!isAuth){
            router.push('/auth')
        }
    }, [isAuth])
    
    if(isAuth){
        return(
            <>
                <AllUser />
                <Tasks/>
                <Chat/>
            </>
        )
    }

}

