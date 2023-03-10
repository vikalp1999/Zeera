import { Stack, Box, Avatar, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from "@chakra-ui/react";
import { BiStopwatch } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskAction, updateTaskAction } from "../../redux/user/user.action";
import { Draggable } from 'react-beautiful-dnd'
import { useState } from "react";

let role = ''
let code = ''
export default function TaskCard({ data, status, index }) {
    const { userData } = useSelector(state=>state.auth)
    const { teamData } = useSelector(state=>state.team)
    const [isDragging, setIsDragging] = useState(false)
    const dispatch = useDispatch()

    if(userData){
        role = userData.role
        code = teamData._id
    }

    const deleteTask = (task) => {
        if (confirm("Are You Sure") == true) {
            dispatch(deleteTaskAction(task, code))
        } else {
            return;
        }
    }

    const updateStatus = (id) => {
        if (confirm("Are You Sure") == true) {
            dispatch(updateTaskAction(data.status, id, status, code))
        } else {
            return;
        }
    }
    
    return (
            <Draggable draggableId={data.title} index={index}>
                {(provided)=>(
                    <Card 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    h='25%'
                    bg="white" 
                    minW={{ base: "max-content" }}
                    minH="25%"
                    p="10px">
                        <CardBody p="0px">
                            <Flex gap="10px" alignItems={"flex-start"} justifyContent="space-between">
                                <Flex gap="10px">
                                    <Avatar size="sm" name={data.assignee.name} />
                                    <Box dislay="flex" justifyContent={"flex-start"}>
                                        <Text fontWeight="600" fontSize="1em">{data.title}</Text>
                                        <Text>{data.assignee.name}</Text>
                                    </Box>
                                </Flex>
                                {
                                    (role == "admin") ? <Box onClick={() => { deleteTask(data._id) }} borderRadius={"20px"} variant="ghost" p="0px"><Icon as={MdDelete} color="blue" /></Box> : ""
                                }
                            </Flex>
                        </CardBody>
                        <CardFooter p="5px" display="flex" justifyContent={"space-between"} alignItems="center">
                            <Box display="flex" flexDirection={"row"} gap="3px">
                                <Icon as={BiStopwatch} cursor="pointer" bg={"transparent"} w="20px" height="20px" color="red.600" />
                                <Text fontSize={"0.8em"}>{data.deadline}</Text>
                            </Box>
                            {
                                (status != "finish") ? <Button onClick={() => { updateStatus(data._id) }} bg="#29B3FE" colorScheme="#29B3FE" size="sm" >{data.status != "done" ? <Icon as={AiOutlineArrowRight} size={"12px"} color="white" /> : <Icon as={IoMdDoneAll} size={"12px"} color="white" />}</Button> : ""
                            }
                        </CardFooter>
                    </Card>
                )}
            </Draggable>
    )


}