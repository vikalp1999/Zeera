import {
  Flex,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Icon,
  Input,
} from "@chakra-ui/react";
import ChatBubble from "./ChatBubble";
import { BiSmile } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsChatText } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { teamAction } from "../../redux/user/user.action";

const endpoint = process.env.NEXT_PUBLIC_API_LINK
let arr = []

const Chat = () => {
  let socket = io.connect(endpoint)
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [msgs, changeMsgs] = useState(arr)
  const { auth, team } = useSelector(state=>state)
  const dispatch = useDispatch()
  const timer = useRef(null)

  
  const handleSend = () => {
    socket.emit('newMsg', {
      msg:message,
      sender:auth.userData._id,
      chat:team.teamData?._id
    })
    setMessage("")
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };
  
  
  useEffect(()=>{
    socket.on("newMessage", (msg)=>{
      let newArr = [...msgs]
      newArr.push(msg)
      changeMsgs([...newArr])
    })
  
    socket.on('update', ()=>{
      if(timer.current!=null){
        clearTimeout(timer.current)
        timer.current = null
      }
      timer.current = setTimeout(()=>{
        dispatch(teamAction(team.teamData._id))
      }, 2500)
    })
  }, [socket])
  
  useEffect(()=>{
    socket.emit('setup', auth.userData._id)
  }, [])
  
  useEffect(()=>{
    if(team.teamData?.messages!=undefined){
      arr = [...team.teamData?.messages]
      changeMsgs([...team.teamData?.messages])
    }
  }, [team.teamData])

  return (
    <>
      <Button
        onClick={handleClick}
        display={isActive ? "none" : "flex"}
        position="fixed"
        bottom={'5vh'}
        right={'5vh'}
        w="65px"
        bg={"#2F80ED"}
        height={"65px"}
        borderRadius="40px"
        color="white"
        _hover={{ bg: "#F5B544" }}
      >
        <Icon
          as={BsChatText}
          color="white"
          cursor="pointer"
          bg={"transparent"}
          w="100%"
          h="100%"
          borderRadius="40px"
        />
      </Button>
      <Flex
        display={isActive ? "flex" : "none"}
        w={{base:"100vw",md:"60vw", lg:"25vw"}}
        position={"fixed"}
        top={{ base:'12vh', md: '0px', xl: '0px' }} 
        right='0vh'
        border={'1px solid red'}
        height={{ base:'88vh', md: 'auto', xl: '100vh' }} 
        fontFamily="Poppins"
      >
        <Card
          w="100%"
          sx={{
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
          borderTopLeftRadius="20px"
          // w="30vw" position={"relative"} top="0px" left="70vw"
        >
          <CardHeader
            display={"flex"}
            bg={"#2F80ED"}
            borderTopLeftRadius="20px"
            sx={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            justifyContent="space-between"
            flexDirection={"row"}
          >
            <Heading
              size={{ base: "xs", lg: "sm", xl: "md" }}
              fontFamily="Poppins"
            >
              {team.teamData?.name}
            </Heading>
            <Button
              onClick={handleClick}
              bg={"transparent"}
              w="20px"
              height={"20px"}
              borderRadius="40px"
              _hover={{ bg: "transparent" }}
            >
              <Icon
                as={GrFormClose}
                cursor="pointer"
                bg={"white"}
                w="40px"
                h="40px"
                color="#4F5E7B"
              />
            </Button>
          </CardHeader>

          <CardBody
            display={"flex"}
            flexDirection={"column"}
            gap="20px"
            bg="#F7F7F7"
            justifyContent={"flex-end"}
            overflowY='auto'
          >
            {msgs.map(ele=><ChatBubble data={ele}/>)}  
          </CardBody>
          <CardFooter
          bg="white"
            sx={{
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
            }}
            p="5px 20px"
          >
            <Flex flexDirection={"column"} w="100%" >
              {/* <Flex><Menu>Options</Menu></Flex> */}
              {/* <Divider/> */}
              <Flex
                flexDirection="row"
                alignItems={"center"}
                w="100%"
                gap="20px"
                m="10px 0px"
                
              >
                <Icon
                  as={BiSmile}
                  w="25px"
                  height={"25px"}
                  color="#4F5E7B"
                  cursor="pointer"
                />
                <Input
                  placeholder="Write a message..."
                  flexGrow={1}
                  borderRadius="10px"
                  onChange={handleChange}
                  value={message}
                />
                <Icon
                  as={ImAttachment}
                  w="25px"
                  height={"25px"}
                  color="#4F5E7B"
                  cursor="pointer"
                />
                <Button
                  onClick={handleSend}
                  bg={"white"}
                  w="20px"
                  height={"20px"}
                  borderRadius="40px"
                  _hover={{ bg: "transparent" }}
                >
                  <Icon
                    as={RiSendPlaneFill}
                    w="45px"
                    height={"45px"}
                    bg={"#2F80ED"}
                    borderRadius="25px"
                    p="10px"
                    color="white"
                    cursor="pointer"
                  />
                </Button>
              </Flex>
            </Flex>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
};

export default Chat;
