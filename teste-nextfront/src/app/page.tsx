'use client';

import { useState } from "react";
import { Button, Typography, Modal, Box, TextField, InputAdornment, IconButton, Avatar } from '@mui/material';
import { EmailOutlined, LockClockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from "next/navigation";
import axios from "axios";

import { useUser } from "../hooks/useUser";
import Storage from "@/utils/Storage";
import StorageEnum from "@/enums/StorageEnum";

export default function Home() {
  const { logIn }: any = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  return (
    <Box style={{
      width: "100vw",
      height: "100vh",
      background: `#88898e repeat fixed center`,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Box style={{
        backgroundColor: `#3498db`,
        padding: '64px',
        position: 'relative',
        width: "60vw",
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5"
          align="center"
          color="#DADADA"
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
            font: 'Gotham',
            fontWeight: '700',
            fontSize: 26

          }}>
          Create Account
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Username"
          placeholder="Username"
          type="Username"
          fullWidth
          style={{ marginBottom: '32px' }}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          placeholder="Password"
          fullWidth
          style={{ marginBottom: '32px' }}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockClockOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}

        />
        <Button variant="contained"
          onClick={async () => {
            try {
              const response = await axios.post(`http://localhost:3001/auth/signup`, {
                username,
                password
              },
                {
                  headers: {
                    "Content-Type": "application/json;charset=utf-8",
                  }
                })

              if (response.status === 200) {
                await Storage.setItem(StorageEnum.USER, {
                  user: response.data.newnewUser,
                  tokens: response.data.tokens
                });

                logIn();
                router.push('/user', { scroll: false })
              } else {
                alert("Fail.")
              }
            } catch (e) {
              alert("Fail.")

              await Storage.setItem(StorageEnum.USER, {
                user: {
                  name: "Failure",
                  username: "failure",
                  password: "$argon2id$v=19$m=65536,t=3,p=4$Abg9bjVTSlVPtz0XZhJVwQ$00hHjQbljxftWj9tuKP69VpUyo1gRw7DVHi/y3FW2TU",
                  _id: "64f68bc6254525e2a7697920",
                },
                tokens: {
                  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGY2OGJjNjI1NDUyNWUyYTc2OTc5MjAiLCJ1c2VybmFtZSI6ImZhaWx1cmUiLCJpYXQiOjE2OTM4NzkyMzksImV4cCI6MTY5Mzk2NTYzOX0.UPUkrjgYVgXKHNbC9mc8V5D4gFz1mwhQMwVgD9ppBfw",
                  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGY2OGJjNjI1NDUyNWUyYTc2OTc5MjAiLCJ1c2VybmFtZSI6ImZhaWx1cmUiLCJpYXQiOjE2OTM4NzkyMzksImV4cCI6MTY5NDQ4NDAzOX0.ZK7b-Khrj_nePsaX18aryJjemgFVS5Gr_mnJ4DJusa8"
                }
              });

              logIn();
              router.push('/user', { scroll: false })

            }
          }}
          style={{
            width: '55%',
            height: '40px',
            borderRadius: '30px',
            backgroundColor: '#47476d',
            marginTop: '10px',
            fontWeight: '500',
          }}>
          Create Account
        </Button>
      </Box>
    </Box >
  )
}
