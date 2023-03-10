import Link from "next/link";
import { Flex, HStack, chakra, Heading, Grid, Icon } from "@chakra-ui/react";
import Image from "next/image";
import NextIn from "../assets/NextIn.svg";
import { AiOutlineMenu } from "react-icons/ai"


 const Navbar = () => {
  const Logo = chakra(Image, {
    shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop)
  });

  const SignupLink = chakra(Link, {
    propsPassed :(prop)=>[href].includes(prop)
});
  return (
    <Grid>
      <Flex zIndex={"10"} position="fixed" top="0px"w="100vw" bgGradient="linear(to-r,#29B3FE, #4486F6)" sx={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
          <Flex display="flex" w={{base:"95%", md:"80%", lg:"60%" }} flexDirection="row" margin={"auto"} justifyContent={"space-between"} alignItems="center">
              <Logo src={NextIn} width="100" height="30" alt="Next-In Logo" m="20px"/>
              <Flex gap="50px" display={{base:"none", md:"flex"}} height="100%" alignItems={"center"}>
                  <SignupLink href="/auth" style={{color:"#034366", fontFamily:"Segoe UI", fontWeight:"700", fontSize:"1.2em"}} fontSize={[null,null,"0.8em", "1em", "1em", "1.2em"]}>Log in</SignupLink>
                  <SignupLink href="/auth" style={{backgroundColor:"white",color:"#034366",width:"20vw",display:"flex", justifyContent:"center",  fontFamily:"Segoe UI", fontWeight:"700"}}  fontSize={[null,null,"0.8em", "1em", "1em", "1.2em"]} height="100%" p="20px 0px">
                    Try Next-In for free ⇥
                  </SignupLink>
              </Flex>
              <Icon _hover={{color:"#4486F6", bg:"white"}} width="60px" height="100%" color="white" bg="#3c82f5" p="10px" alignItems="center" as = {AiOutlineMenu} display={{base:"flex", md:"none"}} sx={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px" }}/>

          </Flex>
      </Flex>
    </Grid>
  )
}

export default Navbar;