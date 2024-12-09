

import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { PlusIcon } from '../components/icons/PlusIcon'
import { ShareIcon } from '../components/icons/shareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hook/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../components/config'

function Dashboard() {

  const [modalOpen,setModalOpen]=useState(false);
  const { contents, deleteContent,refresh } = useContent();
    useEffect(()=>{
     refresh();
    },[modalOpen])

    return (
      <div>
                <div>
                  <Sidebar/>
                </div>

          <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>

                   <CreateContentModel open={modalOpen} onClose={()=>
                        {
                          setModalOpen(false);
                        }
                      }/>
                   <div className="flex justify-end gap-4">
                          <Button onClick={()=>{
                            setModalOpen(true)
                          }} variant="primary" text="Add Content" startIcon={<PlusIcon/>}>
                          </Button>

                          <Button onClick={async()=>{
                             const response= await axios.post(BACKEND_URL+"/api/v1/brain/share" ,{
                              share:true
                             },{
                              headers:{
                               "token":localStorage.getItem("token")
                              }
                             })

                            const shareUrl=`http://localhost:5173/share/${response.data.hash}`;

                            alert(shareUrl) ;
                          }} 
                          variant="secondary"   text="Share Brain" startIcon={<ShareIcon/>}>
                          </Button>
                  </div>

                  <div className='flex flex-wrap gap-4'>
                    
                    
                    {
                      // console.log(
                        contents.map(({ _id, type, title, link }) => (
                          <Card
                            key={_id}
                            _id={_id} // Pass _id instead of id
                            type={type}
                            title={title}
                            link={link}
                            onDelete={deleteContent}
                          />
                        ))
                    }
  

                         
                        

                          
                  </div>
          </div>
    </div>
    )
        
}

export default Dashboard;