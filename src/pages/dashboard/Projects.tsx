import Dashboard from './Dashboard'
import projects_icon from "../../assets/images/projects.svg"
import calendar_clock from "../../assets/images/calendar_clock.svg"
import search from "../../assets/images/search.svg"
import team_members from "../../assets/images/team_members.svg"
import Button from '../../components/common/Button'
import barcode from '../../assets/images/barcode.svg'
import project_line from '../../assets/images/project_line.svg'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import makeRequest from '../../services/request'
import { Context } from '../../context/DashboardContext'
import utils from '../../utils/utils'
import Skeleton from '../../components/dashboard/projects/Skeleton'


const Projects = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate(); 
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  useEffect(()=>{
    async function getAllProjects() {
      try {
        setLoadingProjects(true);
        const res = await makeRequest('GET', `/projects/get-all`, user?.token);
        setLoadingProjects(false);
        if(res.type === 'success'){
          setProjects(res.data.data.results);
        }else{
          utils.createErrorNotification(res.data.message, 1000);
          setProjects([]);
        }
      } catch (error) {
        console.log('error: ', error);
      }
    }
    getAllProjects();
  },[]);
  return (
    <Dashboard>
      <div className="text-20 font-medium flex flex-col gap-5 w-full justify-start cursor-pointer h-[90px] px-20"> 
        <div className="h-[25px] w-full"></div>
        <div className="flex h-[65px] items-center">
          <img src={projects_icon} alt="" className="h-35"/>    
          <div className="">Projects</div> 
        </div>
      </div>
      <div className="w-full flex flex-col gap-20 create-project">
        <div className="flex w-full justify-between items-center px-20">
          <div className="flex items-center gap-10">
            <div className="border border-borderGray px-16 py-10 rounded-8 flex gap-10 items-center cursor-pointer font-normal bg-white"><img src={search } alt=""/> <input type="text" placeholder='Search project' className='outline-none border-none bg-inherit text-borderGray cursor-pointer'/></div>
            <Button label="Search" onClick={()=>{}} extraClass='bg-lightBlue'/>
          </div>
          <div className="flex items-center gap-10">
            <div className="border border-borderGray px-16 py-10 rounded-8 flex gap-10 items-center cursor-pointer font-semibold"><img src={calendar_clock} alt=""/> Filter by Date Created</div>
            <Button label="+  &nbsp;Create Project" onClick={()=>navigate('/projects/new')}/>
          </div>
        </div>
        {!loadingProjects && projects.length === 0 && <div className="flex flex-col gap-20 px-20 font-bold">
          <div className="font-hiragino text-[32px]">Create and manage projects</div>
          <div className="font-normal w-[80%]">Create unlimited projects with link and QR Code invite and keep track of how many team members join them while tracking the length of each project. Also take attendance at your convenience.</div>
          <div className="font-normal">
            <Button label="+  &nbsp;Create Project" onClick={()=>navigate('/projects/new')}/>
          </div>
        </div>}
        {!loadingProjects && projects.length > 1 && <div className="flex flex-col px-20 gap-30 mb-[100px]">
          <div className="flex flex gap-40 border-b border-borderGray w-full">
            <div className="py-10 border-b-2  border-recruitBlue w-fit-content flex items-center gap-10 cursor-pointer">All <span className='bg-recruitBlue text-white h-full text-[10px] py-[3px] px-[4px] rounded-5 flex items-center justify-center'>20</span></div>
            <div className="py-10 w-fit-content flex items-center gap-10 cursor-pointer text-lightBlack">Active <span className='bg-[#F1F1F1] h-full text-[10px] py-[3px] px-[4px] rounded-5 flex items-center justify-center text-lightBlack font-semibold'>20</span></div>
            <div className="py-10 w-fit-content flex items-center gap-10 cursor-pointer text-lightBlack">Ended <span className='bg-[#F1F1F1] h-full text-[10px] py-[3px] px-[4px] rounded-5 flex items-center justify-center text-lightBlack font-semibold'>20</span></div>
          </div>
          <div className="flex flex-col w-full gap-20">
            <div className="bg-white flex flex-col px-20 py-20 gap-20 rounded-12">
              <div className="flex grid-cols-2 gap-20 items-end">
                  <img src={barcode} alt="" className='w-[180px] h-[180px]'/>
                  <div className="flex gap-10 justify-between align-center h-full w-full">
                    <div className="flex flex-col gap-10 h-full justify-between">
                      <div className="flex items-center text-24 font-semibold bg-activeBg text-activeText text-[10px] justify-center h-[25px] w-fit-content p-[6px] rounded-5">Active</div>
                      <div className="flex items-center text-24 font-semibold">Project Name</div>
                      <div className="flex gap-10 h-full">
                        <div className="h-full">
                          <img src={project_line} alt="" className='h-full'/>
                        </div>
                        <div className="flex flex-col gap-10 h-full justify-between text-recruitBlue font-semibold">
                          <div className="">Start</div>
                          <div className="">End</div>
                        </div>
                        <div className="flex flex-col gap-10 h-full justify-between whitespace-nowrap ml-20">
                          <div className="whitespace-nowrap">Saturday, March 16, 1:30 PM</div>
                          <div className="whitespace-nowrap">Mar 23, 4:00 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center text-14 text-recruitBlue gap-10"><img src={team_members} alt="" /> 2 Team Members</div>
                    </div>
                    <div className="flex gap-20 items-center">
                      <div className="flex items-center justify-center w-[180px] border-[1.4px] border-recruitBlue p-5 h-[40px] rounded-8 gap-10 cursor-pointer cursor-pointer" onClick={()=>navigate('/projects/id')}> Manage Project <i className="fa-solid fa-arrow-right"></i></div>
                      <i className="fa-regular fa-share-from-square text-[24px] cursor-pointer"></i> 
                      <i className="fa-solid fa-ellipsis-vertical text-[24px] text-recruitBlue cursor-pointer"></i>
                    </div>
                  </div>
              </div>
            </div>
            <div className="bg-white flex flex-col px-20 py-20 gap-20 rounded-12">
              <div className="flex grid-cols-2 gap-20 items-end">
                  <img src={barcode} alt="" className='w-[180px] h-[180px]'/>
                  <div className="flex gap-10 justify-between align-center h-full w-full">
                    <div className="flex flex-col gap-10 h-full justify-between">
                      <div className="flex items-center text-24 font-semibold bg-endedBg text-lightBlack text-[10px] justify-center h-[25px] w-fit-content p-[6px] rounded-5">Ended</div>
                      <div className="flex items-center text-24 font-semibold">Project Name</div>
                      <div className="flex gap-10 h-full">
                        <div className="h-full">
                          <img src={project_line} alt="" className='h-full'/>
                        </div>
                        <div className="flex flex-col gap-10 h-full justify-between text-recruitBlue font-semibold">
                          <div className="">Start</div>
                          <div className="">End</div>
                        </div>
                        <div className="flex flex-col gap-10 h-full justify-between whitespace-nowrap ml-20">
                          <div className="whitespace-nowrap">Saturday, March 16, 1:30 PM</div>
                          <div className="whitespace-nowrap">Mar 23, 4:00 PM</div>
                        </div>
                      </div>
                      <div className="flex items-center text-14 text-recruitBlue gap-10"><img src={team_members} alt="" /> 2 Team Members</div>
                    </div>
                    <div className="flex gap-20 items-center">
                      <div className="flex items-center justify-center w-[180px] border-[1.4px] border-recruitBlue p-5 h-[40px] rounded-8 gap-10 cursor-pointer cursor-pointer" onClick={()=>navigate('/projects/id')}> Manage Project <i className="fa-solid fa-arrow-right"></i></div>
                      <i className="fa-regular fa-share-from-square text-[24px] cursor-pointer"></i> 
                      <i className="fa-solid fa-ellipsis-vertical text-[24px] text-recruitBlue cursor-pointer"></i>
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>}
        {loadingProjects && <div className='flex flex-col gap-30'>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>}
      </div>
    </Dashboard>
  )
}

export default Projects