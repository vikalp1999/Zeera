// import { container, formsContainer, signinSignup, signUpForm, signInForm, title, inputField, socialText, socialMedia, socialIcon, btnTransparent, btn, panelsContainer, image, leftPanel, rightPanel, content, head, para } from '../styles/auth.module.css';
import { FaFacebookF } from 'react-icons/fa';
import { BsGoogle, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser, updateUser } from '../redux/auth/auth.action';
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import axios from 'axios';
import { AddChatroom, teamAction } from '../redux/user/user.action';

let API = process.env.NEXT_PUBLIC_API_LINK;
const initForm = {
    name: "",
    email: "",
    password: ""
}
export default function Auth() {
    const toast = useToast()
    const dispatch = useDispatch()
    const { isRegistered, isAuth, userData, isError, ErrorMsg } = useSelector(store => store.auth);
    const { teamData } = useSelector(store => store.team);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const router = useRouter()
    const [regi, setRegi] = useState("");
    const [room, setRoom] = useState("");
    const [code, setCode] = useState("");
    const [form, setForm] = useState(initForm)

    const handleChange = (event) => {
        const { value, name } = event.target;
        setForm(
            {
                ...form,
                [name]: value
            }
        )
    }

    const handleSignup = (event) => {
        event.preventDefault();
        dispatch(registerUser(form));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginUser(form))
    }

    const handleCreate = async () => {
        let res = await axios.post(`${API}/chatroom/new`, {
            lead: userData._id,
            name: room
        })
        let data = await res.data;
        if(data.error==false){
            dispatch(AddChatroom(data.chatroom))
            dispatch(updateUser(data.user))
            toast({
                title: 'Chatroom created successfully',
                description: "We've created your chatroom for you.",
                status: 'success',
                duration: 4000,
                position:'top'
            })
            onClose()
            setRegi("")
        } else {
            toast({
                title: 'Something went wrong',
                description: data.msg,
                status: 'error',
                duration: 3000,
                position:'top'
            })
        }
    }
    
    const handleJoin = async () => {
        let res = await axios.post(`${API}/chatroom/join/${code}`, {
            user: userData._id
        })
        let data = await res.data;
        if(data.error==false){
            dispatch(AddChatroom(data.chatroom))
            toast({
                title: 'Chatroom Joined.',
                description: "Taking you to your team.",
                status: 'success',
                duration: 4000,
                position:'top'
              })
              onClose()
              setRegi("")
            } else {
                toast({
                    title: 'Something went wrong',
                    description: data.msg,
                    status: 'error',
                    duration: 3000,
                    position:'top'
                })
            }
    }

    useEffect(() => {
      if(isRegistered){
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            position:'top'
          })
        onOpen()
      }
    }, [isRegistered])
    
    useEffect(() => {
      if(isError){
        toast({
            title: 'Something went wrong',
            description: ErrorMsg,
            status: 'error',
            duration: 4000,
          })
      }
    }, [isError])

    useEffect(()=>{
        let len = Object.keys(teamData).length
        if(isAuth && !len){
            if(userData.currentChatroom){
                dispatch(teamAction(userData.currentChatroom))
            }
        }
        if(isAuth && len){
            router.push("/dashboard")
        }
    }, [isAuth, teamData])

    return (
        <>
            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs variant='enclosed'>
                            <TabList>
                                <Tab>Create Chart Room</Tab>
                                <Tab>Join Chart Room</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <FormControl>
                                        <FormLabel>Chart Room Name</FormLabel>
                                        <Input onChange={(e) => { setRoom(e.target.value) }} placeholder='Chart Room Name' />
                                    </FormControl>

                                    <Button onClick={handleCreate} colorScheme='blue' mt={3}>
                                        Create Chart Room
                                    </Button>
                                </TabPanel>
                                <TabPanel>
                                    <FormControl>
                                        <FormLabel>Join Room Name</FormLabel>
                                        <Input onChange={(e) => { setCode(e.target.value) }} placeholder='Chart Room Code' />
                                    </FormControl>

                                    <Button onClick={handleJoin} colorScheme='blue' mt={3}>
                                        Join Chart Room
                                    </Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Auth */}
            <div className={`container ${regi}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleLogin} action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <input name='email' type="email" onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <input name='password' type="password" onChange={handleChange} placeholder="Password" />
                            </div>
                            <input type="submit" value="Login" className="btn solid" />
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                        <form onSubmit={handleSignup} action="#" className="sign-up-form">
                            <h2 className="title">Sign up with new accont</h2>
                            <div className="input-field">
                                <input name='name' type="text" onChange={handleChange} placeholder="Name" />
                            </div>
                            <div className="input-field">
                                <input name='email' type="email" onChange={handleChange} placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <input name='password' type="password" onChange={handleChange} placeholder="Password" />
                            </div>
                            <input type="submit" className="btn" value="Sign up" />
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <FaFacebookF />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsTwitter />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsGoogle />
                                </a>
                                <a href="#" className="social-icon">
                                    <BsLinkedin />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" onClick={() => { setRegi("sign-up-mode") }}>
                                Sign up
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={() => { setRegi("") }}>
                                Sign in
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/register.svg" className=" image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}