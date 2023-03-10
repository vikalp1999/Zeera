import { Stack, Box, Avatar, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { BsPlusLg } from "react-icons/bs";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from 'react-redux';
import { StrictModeDroppable } from "../StrictModeDroppable";
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useEffect, useState } from "react";
import { updateTaskAction } from "../../redux/user/user.action";

// const taskData = [{
//     title:"Do Redux",
//     status: "todo",
//     deadline: "23-12-2022",
//     assignee: "Rai Ganatra"
// },{
//     title:"Do Redux",
//     status: "inprogress",
//     deadline: "23-12-2022",
//     assignee: "Aman Ojha"
// },{
//     title:"Do Redux all day",
//     status: "done",
//     deadline: "23-12-2022",
//     assignee: "Yash Sutar"
// },{
//     title:"Do Redux",
//     status: "todo",
//     deadline: "23-12-2022",
//     assignee: "Zohn Moe"
// }]
var role = "";
var code = "";
const Tasks = () => {
    return (
        <Tabs 
        isFitted variant="enclosed" 
        position="absolute" 
        top={{ base: "10vh", md: "0", xl: "0" }} 
        left={{ base: "0", md: "20vw", xl: "20vw" }}  
        w={{ base: "100vw", md: "80vw", xl: "60vw" }} 
        gap="30px" 
        minH={"100vh"} 
        m="20px auto">
            <TabList w="100%" >
                <Tab _selected={{ bg: "#4486F6", color: "white" }} fontWeight="600">Project Tasks</Tab>
                {/* <Tab _selected={{bg:"#F5B544", color:"black"}} fontWeight="600">Personal Tasks</Tab> */}
            </TabList>
            <TabPanels>
                <TabPanel><ProjectTasks /></TabPanel>
                <TabPanel><PersonalTasks /></TabPanel>
            </TabPanels>
        </Tabs>
    )
}


const ProjectTasks = () => {
    return (
        <>
            <Flex className="ProjectTasks" flexDirection={"column"} w="100%" minH={"80%"} >
                {/* <Box display="flex" flexDirection={"row"} justifyContent={"flex-end"} m="10px" mb="20px">
                    <Heading size="md">Project Tasks</Heading>
                    <Button rightIcon={<BsPlusLg />} colorScheme='blue' variant='solid'>
                        Add Task
                    </Button>
                </Box> */}
                <TaskContentProject />
            </Flex>
        </>
    )
}

const PersonalTasks = () => {
    return (
        <>
            <Flex className="PersonalTasks" flexDirection={"column"} minH={"50%"}>
                <Box display="flex" flexDirection={"row"} justifyContent={"flex-end"} >
                    {/* <Heading>My Personal Tasks</Heading> */}
                    <Button rightIcon={<BsPlusLg />} bg='#F5B544' variant='solid' m="10px" mb="20px">
                        Add Task
                    </Button>
                </Box>
                {/* <TaskContentPersonal/> */}
            </Flex>
        </>
    )
}

const TaskContentProject = () => {
    const { team } = useSelector(store => store);
    const { teamData, done, inprogress, todo } = useSelector(store => store.team);
    const { userData } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const taskData = userData?.role === "admin" ? teamData?.alltasks : teamData?.alltasks?.filter((task)=>task.assignee._id === userData._id)
    const [height, setHeight] = useState(0)

    if (!!userData && !!teamData) {
        if (!!userData.role && !!teamData._id) {
            role = userData.role;
            code = teamData._id
        }
    }

    const onDragEnd = (result) => {
        const { source:{droppableId, index}, destination } = result
        dispatch(updateTaskAction(droppableId, team[droppableId][index]._id, destination.droppableId))
    }

    useEffect(()=>{
        setHeight(window.innerHeight-120)
    }, [window.innerHeight])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
        <Flex className="taskContent" flexDirection={{ base: "column", lg: "row" }} w="100%" gap="10px">
            <Flex flexDirection={"column"} gap="5px" w="100%">
                <Heading size="md" color={"#4F5E7B"} fontWeight="500">To Do</Heading>
                <StrictModeDroppable droppableId="todo">
                    {(provided)=>(
                        <Stack
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        overflowY={{ base:'none', md: 'auto', xl: 'auto' }} 
                        minH={{ base:height/4.2 }} 
                        w="100%"
                        height={{ base:'max-content', md: height, xl: height }} 
                        gap='20px'
                        bg={'#F1948A'}
                        p="15px"
                        direction={{ base: "row", md: "column", xl: "column" }} 
                        overflowX={'auto'}
                        borderRadius={"10px"}>
                            {todo.map((task, i) => {
                                if (task.status === "todo") {
                                    return <TaskCard index={i} key={i} data={task} status="inprogress" />
                                            
                                }
                            })}
                            {provided.placeholder}
                        </Stack>
                    )}
                </StrictModeDroppable>
            </Flex>
            <Flex flexDirection={"column"} gap="5px" w="100%">
                <Heading size="md" color={"#4F5E7B"} fontWeight="500">In Progress</Heading>
                <StrictModeDroppable droppableId="inprogress">
                    {(provided)=>(
                        <Stack 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        overflowY={{ base:'none', md: 'auto', xl: 'auto' }} 
                        w="100%" 
                        minH={{ base:height/4.2 }} 
                        height={{ base:'max-content', md: height, xl: height }} 
                        gap='20px'
                        bg="#F9E79F" 
                        p="15px" 
                        direction={{ base: "row", md: "column", xl: "column" }} 
                        overflowX={'auto'}
                        borderRadius={"10px"}>
                            {inprogress.map((task, i) => {
                                if (task.status === "inprogress") {
                                    return <TaskCard index={i} key={i} data={task} status="done" />
                                }
                            })}
                            {provided.placeholder}
                        </Stack>
                    )}
                </StrictModeDroppable>
            </Flex>
            <StrictModeDroppable droppableId="done">
                {(provided)=>(
                    <Flex flexDirection={"column"} gap="5px" w="100%" >
                        <Heading size="md" color={"#4F5E7B"} fontWeight="500">Completed</Heading>
                        <Stack 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        overflowY={{ base:'none', md: 'auto', xl: 'auto' }} 
                        w="100%" 
                        height={{ base:'max-content', md: height, xl: height }} 
                        gap="20px" 
                        bg="#82E0AA"
                        minH={{ base:height/4.2 }} 
                        p="15px" 
                        direction={{ base: "row", md: "column", xl: "column" }} 
                        overflowX={'auto'}
                        borderRadius={"10px"}>
                            {done.map((task, i) => {
                                if (task.status === "done") {
                                    return <TaskCard index={i} key={i} data={task} status="finish" />
                                }
                            })}
                        {provided.placeholder}
                        </Stack>
                    </Flex>
                    )}
            </StrictModeDroppable>
        </Flex>
        </DragDropContext>
    )
}

// const TaskContentPersonal = () => {
//     const { teamData } = useSelector(store => store.team);
//     console.log("teamData", teamData)
//     // const taskData = teamData.solotasks
//     return (
//         <>
//             <Flex className="taskContent" flexDirection={{base:"column", lg:"row"}}  w="100%" gap="10px">
//                 <Flex flexDirection={"column"} gap="5px" w="100%">
//                     <Heading size="md" color={"#4F5E7B"} fontWeight="500">To Do</Heading>
//                     <VStack w="100%" minH="480px" p="15px" bg="#F7F7F7" borderRadius={"10px"}>
//                         {taskData&&taskData.map((task,i)=>{
//                             if(task.status==="todo"){
//                                 return <TaskCard key={i} data={task}/>
//                             }
//                         } )}
//                     </VStack>
//                 </Flex>
//                 <Flex flexDirection={"column"} gap="5px" w="100%">
//                     <Heading size="md" color={"#4F5E7B"} fontWeight="500">In Progress</Heading>
//                     <VStack w="100%" minH="480px" p="15px" bg="#F7F7F7" borderRadius={"10px"}>
//                         {taskData.map((task,i)=>{
//                             if(task.status==="inprogress"){
//                                 return <TaskCard key={i} data={task}/>
//                             }
//                         } )}
//                     </VStack>
//                 </Flex>
//                 <Flex flexDirection={"column"} gap="5px" w="100%" >
//                     <Heading size="md" color={"#4F5E7B"} fontWeight="500">Completed</Heading>
//                     <VStack w="100%" gap="20px" bg="#F7F7F7" minH="480px" p="15px" borderRadius={"10px"}>
//                         {taskData.map((task,i)=>{
//                             if(task.status==="done"){
//                                 return <TaskCard key={i} data={task}/>
//                             }
//                         } )}
//                     </VStack>
//                 </Flex>
//             </Flex>
//         </>
//     )
// }


export default Tasks;

