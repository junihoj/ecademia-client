import { SyncOutlined } from '@ant-design/icons'
import { useContext, useEffect } from 'react'
import apiService from '../../config/apiService'
import { Context } from '../../context'

const StripeCallback = ()=>{
    const {state:{user}} = useContext(Context)

    useEffect(()=>{
        if(user){
            apiService.post('/get-account-status').then(res=>{
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