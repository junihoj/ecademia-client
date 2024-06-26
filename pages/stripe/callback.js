import {useContext, useEffect} from 'react'
import {Context} from '../../context'
import {SyncOutlined} from '@ant-design/icons'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'

const StripeCallback = ()=>{
    const {state:{user}} = useContext(Context)

    useEffect(()=>{
        if(user){
            axios.post(`${process.env.NEXT_PUBLIC_API}/get-account-status`).then(res=>{
                window.location.href='/instructor'
                console.log(res)
            })
        }
    },[user])

    return (
        <SyncOutlined 
            spin 
            className="d-flex justify-content-center display-1 text-danger p-5" 
        />

    )
}


export default StripeCallback;