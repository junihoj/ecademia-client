import {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'

const Index = ({courses})=>{
    // const [courses, setCourses] = useState([])

    // useEffect(()=>{
    //     const fetchCourses = async ()=>{
    //         const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses`)
    //         setCourses(data)
    //     }
    //     fetchCourses()
    // },[])
    return (
        <div className='square'>
            <h1 className="jumbotron text-center bg-primary">This is working</h1>

            <div className="container-fluid">
               <div className="row">
                    {courses.map((course)=>(
                            <div key={course._id} className="col-md-4">
                                <CourseCard course={course}/>
                            </div>)
                        )
                    }
               </div> 
            </div>
        </div>
    )
}



export async function getServerSideProps(){
    // console.log("THIS SHOULD RETURN UNDEFINE",process.env.API)
    // console.log("WILL PUBLIC RUN", `${process.env.NEXT_PUBLIC_API}`)
    const {data}  = await axios.get(`${process.env.NEXT_PUBLIC_API}/courses`)

    return {
        props:{
            courses: data,
        }
    }
}


export default Index