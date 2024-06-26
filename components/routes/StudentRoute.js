import {useEffect, useState, useContext} from 'react'
import {Context} from '../../context'
import axios from 'axios'
import { useRouter } from 'next/router'
import {SyncOutlined} from '@ant-design/icons'


const StudentRoute = ({children, showNav=true})=>{

    //state 
    const [ok, setOk] = useState(false);

    const router = useRouter()
    const{
        state:{user},
    } = useContext(Context);
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`);
                console.log(data);
                setOk(true);       
            }catch(err){
                console.log(err);
                setOk(false)
                router.push('/login')
            }
        }

        fetchUser();

    }, [])

    return(
        
            <>
                {/*<h1>{hidden && JSON.stringify(user)}</h1>*/}
                {!ok? 
                    (<SyncOutlined 
                        spin
                        className="d-flex justify-content-center display-1 text-primary p-5"
                    />): (

                        <div className="container-fluid">
                          {children}
                        </div>
                )}
            </>
        
    )
}

export default StudentRoute;