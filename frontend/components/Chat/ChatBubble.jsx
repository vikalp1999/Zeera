import {Flex, Card, CardBody, CardFooter, Avatar, CardHeader} from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function ChatBubble({ data }) {
  const {auth} = useSelector(state=>state)

  if(data.sender._id==auth.userData._id){
      return (
          <Flex className="SelfMsgContainer" alignItems="flex-end"  gap="10px">
          <Card
          bg="#2F80ED"
          borderRadius={"20px 20px 0px 20px"}
          flexGrow={1}
          color="white"
        >
          {/* <CardHeader p="20px 20px 0px 20px" fontWeight={"600"} color="">Name</CardHeader> */}
          <CardBody
            p="20px 20px 0px 20px"
            fontSize={{ base: "0.8em", md: "0.6em", xl: "0.8em" }}
          >
            {data.msg}
          </CardBody>
          <CardFooter
            p="20px 20px 10px 0"
            justifyContent={"flex-end"}
            fontSize="0.7em"
            pt="0px"
          >
            4:06 pm
          </CardFooter>
        </Card>
        <Avatar size={{ base: "md", md: "sm", xl: "md" }} />
      </Flex>
      )   
  } else {
      return (
          <>
          <Flex
            className="OthersMsgContainer"
            alignItems="flex-end"
            gap="10px"
            flexDirection={"row-reverse"}
          >
          <Card
              color="#1B1A57"
              borderRadius={"20px 20px 20px 0px"}
              flexGrow={1}
              bg="#E8F1FB"
            >
              <CardHeader
                p="20px 20px 0px 20px"
                fontWeight={"600"}
                fontSize={{ base: "0.5em", md: "0.7em", xl: "0.9em" }}
                color="#F5B544"
              >
                {data.sender.name}
              </CardHeader>
              <CardBody
                p="0px 20px 0px 20px"
                fontSize={{ base: "0.8em", md: "0.6em", xl: "0.8em" }}
              >
                {data.msg}
              </CardBody>
              <CardFooter
                p="20px 20px 10px 0"
                justifyContent={"flex-end"}
                fontSize={{ base: "0.7em", md: "0.5em", xl: "0.7em" }}
                pt="0px"
              >
                4:06 pm
              </CardFooter>
            </Card>
            <Avatar size={{ base: "md", md: "sm", xl: "md" }} />
            </Flex>
          </>
      )
  }
}