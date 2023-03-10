import React, { useEffect, useRef, useState } from 'react';
import {
    IconButton,
    useToast,
    Heading,
    Box,
    CloseButton,
    Flex,
    ModalFooter,
    Avatar,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Spinner
} from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react'
import {
    FiMenu,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { teamAction } from '../../redux/user/user.action';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BiRefresh } from 'react-icons/bi';

const LinkItems = [];
var role = "";
var teamId = "";
var code = "";
var teamName = ""

let API = process.env.NEXT_PUBLIC_API_LINK;
export default function AllUser({ children }) {
    const { isAuth, userData } = useSelector(store => store.auth);
    const { teamData } = useSelector(store => store.team);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()

    if (!!teamData) {
        if (!!teamData.members && LinkItems.length == 0) {
            teamId = teamData.roomLead._id;
            role = userData.role;
            code = teamData._id
            teamName = teamData.name
            LinkItems.push(...teamData.members);
        }
    }
    
    useEffect(() => {
        if (!isAuth) {
            router.push("/auth")
        }
    }, [])

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose: onClosed, ...rest }) => {
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { teamData } = useSelector(store => store.team);
    const toast = useToast()
    const { isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1 } = useDisclosure()
    const [task, setTask] = useState({
        title: "",
        deadline: ""
    });
    const taskData = useRef({
        assigner: "",
        assignee: "",
        chatroom: ""
    });


    const handleTask = (assignee, chatroom) => {
        if (role == "admin") {
            taskData.current.assigner = teamId;
            taskData.current.assignee = assignee;
            taskData.current.chatroom = chatroom;
            onOpen()
        }
        else {
            return;
        }
    }


    const ChangeTask = (event) => {
        const { name, value } = event.target;
        setTask({
            ...task,
            [name]: value
        })
    }

    const AddTask = async () => {
        const cred = { ...task, ...taskData.current }
        let res = await axios.post(`${API}/task/addtask`, cred)
        let data = await res.data;
        onClose()
        dispatch(teamAction(code))
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Assign Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input name='title' onChange={ChangeTask} placeholder='Title' />
                            <FormLabel>DeadLine</FormLabel>
                            <Input type="date" name='deadline' onChange={ChangeTask} placeholder='Deadline' />
                        </FormControl>

                        <Button onClick={AddTask} colorScheme='blue' mt={3}>
                            Create Task
                        </Button>
                    </ModalBody>

                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen1} onClose={onClose1}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Invite more Teammates!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Share this code with your teammates</Text>
                    <Text>{code}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose1}>
                    Close
                    </Button>
                    <Button variant='ghost' onClick={()=>{
                        navigator.clipboard.writeText(code);
                        toast({
                            position: 'top',
                            duration: 2000,
                            render: () => (
                              <Box color='white' p={3} bg='gray' borderRadius={'10px'}>
                                Code copied to clipboard
                              </Box>
                            ),})
                            onClose1()
                    }}>Copy Code</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Box
                bg={useColorModeValue('white', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{ base:'100%', md: '19.5%', xl: '19.5%' }} 
                pos="fixed"
                h="full"
                {...rest}>
                <Flex mx='2px' py='15px' justifyContent="space-around">
                    <Text fontSize='22px' fontWeight='bold'>
                        <Flex alignItems="center" gap="10px">
                            {teamName}
                            <BiRefresh cursor="pointer" onClick={() => { dispatch(teamAction(code)) }} />
                        </Flex>
                    </Text>
                    <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClosed} />
                </Flex>
                {role=='admin'?<Button display={'block'} m='auto' style={{marginBottom:"5px"}} onClick={onOpen1}>Invite more members</Button>:null}
                <Divider size='10' colorScheme='blue' />
                <Heading size="5"  style={{display:'grid',justifyContent:"center", padding:"5px"}}>Members</Heading>
                <Divider size='10' colorScheme='blue' />
                <Box
                h={'100%'}
                overflowY={'auto'}
                scrollBehavior={'smooth'}
                >
                {teamData.members.map((link) => (
                    <NavItem onClick={() => { handleTask(link._id, link.currentChatroom) }} key={link.name}>
                        {link}
                    </NavItem>
                ))}
                </Box>
            </Box>
        </>
    );
};

const NavItem = ({ children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                alignItems={'center'}
                p="2"
                mr="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#9AB7F5',
                    color: 'white',
                }}
                justifyContent={'space-between'}
                px='10px'
                {...rest}>
                    <Flex
                    alignItems={'center'}
                    >
                        <Avatar name={children.name} mr='15px' />
                        <Text fontSize={'20px'}>{children.name}</Text>
                    </Flex>
                    {children.online ? <Box 
                    bg='green'
                    w='10px'
                    h='10px'
                    borderRadius={'50%'}
                    />
                    :
                    <Box border='1px solid gray' 
                    w='10px'
                    h='10px'
                    borderRadius={'50%'}
                    />}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            position='sticky'
            top='0'
            alignItems="center"
            zIndex={'100'}
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
                Next In
            </Text>
        </Flex>
    );
};