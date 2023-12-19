import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Flex, FormControl, FormLabel, Input,useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Appcontext } from '../ContextProvider/AppcontextProvider';
import { extendTheme } from "@chakra-ui/react"
import axios from 'axios';


const Login = () => {
let toast=useToast();
  let [state, setstate] = useState("login");
  let { cart, setCart, isauth, setisauth, user, setuser } = useContext(Appcontext);
  let navigate = useNavigate();

  const theme = extendTheme({
    colors: {
      customColor: "#FF0000", // Replace with your desired color value
    },
  })

  let [signobj, setsignobj] = useState({
    name: "",
    email: "",
    password: ""
  })

  let [loginobj, setloginobj] = useState({
    email: "",
    password: ""
  })

  let handleLogin = (e) => {
    setloginobj({ ...loginobj, [e.target.name]: e.target.value })
  }
  let handleSignup = (e) => {
    setsignobj({ ...signobj, [e.target.name]: e.target.value })
  }
  let doLogin=async()=>{
    let res=await axios.post("http://localhost:8080/login",loginobj);
    console.log(res);
    if(res.data.msg.includes("success")){
toast({
  title: 'Login success.',
  status: 'success',
  duration: 2000,
  isClosable: true,
})
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("userName",res.data.userName)
      setisauth(true);
      navigate("/")
    }else{
      alert(res.data.msg)
    }
        }
  let doSignup = async () => {
    console.log(signobj)
    let res = await axios.post('http://localhost:8080/signup', signobj);
    if(res.data.msg.includes("success")){
      toast({
        title: 'Signup success.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    }
    else{
alert(res.data.msg)
    }
  }

  return (
    <Container >
      <Flex m={'40px auto'} justifyContent={'space-around'} >
        <Button variant='outline' background={state=="signup"?"blue":"white"} color={state=="signup"?"white":"black"} onClick={() => { setstate("signup") }}
          colorScheme={state=="login"?"black":"green"} size='lg'
        >Signup</Button>
        <Button variant='outline'  background={state=="login"?"blue":"white"} color={state=="login"?"white":"black"} onClick={() => { setstate("login") }}
          colorScheme={state=="signup"?"black":"green"} size='lg'
        >Login</Button>
      </Flex>
      {
        state == "login" && <>
          <Box boxShadow={'0 0 10px black'} p={'20px 20px'} m={'50px auto'} border={'none'} borderRadius={'15px 0 15px 0'}>
            <FormControl textAlign={"center"}>
              <FormLabel fontFamily={"Brush Script MT"} color={'rgb(8,65,92)'} mt={'10px'} fontSize={'xl'} >Email</FormLabel>
              <Input type='email' name='email' onChange={handleLogin} size='lg' />
              <FormLabel mt={'10px'} fontFamily={"Brush Script MT"}  fontSize={'xl'} color={'rgb(8,65,92)'}>Password</FormLabel>
              <Input type='password' name='password' onChange={handleLogin} size='lg' />
              <Button onClick={() => { doLogin() }}
                colorScheme="teal" m={"auto"} color={'white'} size='lg' my={'10px'} alignSelf={'center'}>Login</Button>
            </FormControl>
          </Box>

        </>
      }
      {
        state == "signup" && <>
          <Box boxShadow={'0 0 10px black'} p={'20px 20px'} m={'50px auto'} border={'none'} borderRadius={'15px 0 15px 0'}>
            <FormControl textAlign={"center"}>
              <FormLabel fontFamily={"Brush Script MT"} mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Name</FormLabel>
              <Input type='text' name='name' onChange={handleSignup} size='lg' />
              <FormLabel fontFamily={"Brush Script MT"} mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Email</FormLabel>
              <Input type='email' name='email' onChange={handleSignup} mt={'15px'} size='lg' />
              <FormLabel fontFamily={"Brush Script MT"} mt={'15px'} fontSize={'xl'} color={'rgb(14,36,8)'}>Password</FormLabel>
              <Input type='password' name='password' onChange={handleSignup} size='lg' />
              <Button onClick={() => { doSignup() }}
                colorScheme="teal" color={'white'} size='lg' m={'10px auto'}>Signup</Button>
            </FormControl>
          </Box>
        </>
      }
    </Container>
  )
}

export default Login
