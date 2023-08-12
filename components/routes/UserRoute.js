import { SyncOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import apiService from '../../config/apiService'
import { Context } from '../../context'
import UserNav from '../nav/UserNav'

const UserRoute = ({children, showNav=true})=>{

    //state 
    const [ok, setOk] = useState(false);

    const router = useRouter()
    const{
        state:{user},
    } = useContext(Context);
    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const {data} = await apiService.get('/current-user');
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
                            <div className="row">
                                <div className="col-md-2">
                                    { showNav && <UserNav /> }
                                
                                </div>

                                <div className="col-md-10">{children}</div>
                            </div>
                        </div>
                )}
            </>
        
    )
}

export default UserRoute;