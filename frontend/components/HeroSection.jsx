import { Container, Flex, chakra, VStack, Heading, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../assets/heroImage.svg";

export const HeroSection = () => {
    const HeroImage = chakra(Image, {
        propsToBePassed: (prop) => ["src", "width", "height", "alt"].includes(prop)
    });
    const SignupLink = chakra(Link, {
        propsPassed: (prop) => [href].includes(prop)
    });

    return (
        <Flex w="100vw" mt={{ base: "0px", lg: "120px" }} mb="80px">
            <Flex w={{ base: "95%", md: "80%", lg: "60%" }} m="auto" p={"20px"} flexDirection={{ base: "column-reverse", lg: "row" }} alignItems="center">
                <Flex alignItems="center" w={{ base: "95%", lg: "120%" }}>
                    <VStack display={"flex"} alignItems="flex-start" gap={"10px"} w="100%">
                        <Heading fontSize={{ sm: "2xl", md: "4xl", lg: "4xl", xl: "4xl", "2xl": "4xl" }} color="#434343"><chakra.span bgGradient='linear(to-r,#29B3FE, #4486F6)'
                            bgClip='text'>NextIn</chakra.span> brings all your tasks, teammates, and tools together</Heading>
                        <Text fontSize={["1xl"]} fontWeight={"400"} color="#434343">Collaborate with your team on any project with your tasks, and schedule all in one place.</Text>
                        <SignupLink href={"/auth"} fontSize={{ base: "18px", lg: "22px" }} fontWeight={"500"} bg={"#F5B544"} p={{ base: "5px 20px", lg: "12px 20px" }} borderRadius={"50px"} textAlign="center" _hover={{ outline: "3px solid #F5B544", bg: "white" }} sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>Sign up for free ⇥</SignupLink>
                    </VStack>
                </Flex>
                <HeroImage p="0px" src={heroImage} width="50vw" height={{ base: "60vw", lg: "25vw" }} alt="Hero Image" />
            </Flex>
        </Flex>
    )
}


export default HeroSection;