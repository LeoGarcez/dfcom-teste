'use client';

import { useEffect, useState } from "react";
import { Button, Typography, Box, TextField, InputAdornment, IconButton, Avatar } from '@mui/material';
import { Person2Outlined } from '@mui/icons-material';
import { useUser } from '../../hooks/useUser'
import { useRouter } from 'next/navigation'
import StorageEnum from "@/enums/StorageEnum";
import Storage from "@/utils/Storage";
import axios from "axios";

export default function User() {
  const { user, logIn }: any = useUser();
  const [name, setName] = useState("");
  const router = useRouter()

  useEffect(() => {
    if (!user?.user?.name) {
      router.push('/', { scroll: false })
    }
  }, [user, router]);

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
          Hello, {user?.user.username}
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder="Name"
          type="text"
          fullWidth
          style={{ marginBottom: '32px' }}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained"
          onClick={async () => {
            console.log(user)

            const response = await axios.patch(`http://localhost:3001/users/${user.user._id}`, {
              name
            },
              {
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                  "Authorization": `Bearer ${user.tokens.accessToken}`
                }
              })

            if (response.status === 200) {
              await Storage.setItem(StorageEnum.USER, {
                ...user,
                user: response.data
              });

              logIn();
              router.push('/user', { scroll: false })
            } else {
              alert("Fail.")
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
          Editar
        </Button>
      </Box>
    </Box>
  )
}
