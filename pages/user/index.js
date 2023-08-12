import { PlayCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import UserRoute from '../../components/routes/UserRoute';
import apiService from '../../config/apiService';
import { Context } from '../../context';
const UserIndex = ()=>{

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    const{
        state:{user},
    } = useContext(Context);

    useEffect(()=>{
        loadCourses()
    },[])

    const loadCourses = async ()=>{
        try{
            setLoading(true)
            
            const {data} = await apiService.get('/user-courses')
            console.log('DATA', data)
            setCourses(data)
            setLoading(false)

        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }
    return(
        <UserRoute>
            <h1 className="jumbotron square"> USER'S DASHBOARD</h1>
            {
                loading && <SyncOutlined 
                            className="d-flex justify-content-center display-1 text-danger"
                            spin
                        /> 
            }
            {/* TODO:SOLVE BOOSTRAP 5 MEDIA */}
            {courses && courses.map(course=>(
                
                <div className='media pt-2 pb-1' key={course._id}>
                    <Avatar size={80} shape="square" src={course.image? course.image.Location: '/course.png'}/>

                    <div className="media-body pt-2">
                        <div className="row">
                            <div className="col">
                                <Link 
                                    href={`/user/course/${course.slug}`}
                                    className="pointer"
                                >
                                    <a><h5 className="mt-2 text-primary">{course.title}</h5></a>
                                    
                              </Link>
                                <p 
                                    style={{marginTop:'-10px'}}
                                >
                                    {course.lessons.length}
                                </p>
                                <p 
                                    className="text-muted" 
                                    style={{marginTop: '-15px', fontSize:'12px'}}
                                >
                                by {course.instructor.name}
                                </p>
                            </div>

                            <div className="col-md-3 mt-3 text-center">
                            <Link 
                                href={`/user/course/${course.slug}`}
                                className="pointer"
                            >
                                <a><PlayCircleOutlined className="h2 pointer text-primary"/></a>
                                
                            </Link>
                            </div>
                        </div>
                    </div>

                </div>


            ))}
        </UserRoute>
    )
}

export default UserIndex;