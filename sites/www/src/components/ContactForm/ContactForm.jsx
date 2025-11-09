import { useState } from 'react'
import { TextField, Button, Typography, Stack, Box } from '@mui/material'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState({ message: '', type: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email.includes('@')) {
      setStatus({ message: 'Indtast en gyldig e-mail', type: 'error' })
      return
    }

    console.log('Formular sendt', formData)
    setStatus({ message: `Hej ${formData.name} tak for din besked! Du høre fra os snarest.`, type: 'success' })
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setStatus({ message: '', type: '' }), 40000)
  }

  const textFieldStyles = {
    '& .MuiInputLabel-root': { color: '#ffffff' },
    '& .MuiInputBase-input': { color: '#ffffff' },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#cccccc' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
  }

  return (
    <Box sx={{ my: 0 }}>
    
      <Box
        sx={{
          backgroundColor: '#33626C',
          
          maxWidth: 1600,
          mx: 'auto',
          mb: 1,
          p: 2,
          textAlign: 'center',
          
        }}
      >
        <Stack spacing={2}>
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            fontFamily: 'zen Loop',
            fontSize: '64px',
            letterSpacing: 1,
          }}
        >
          Vil du booke et ophold? 
Eller har du blot et spørgsmål?
        </Typography>


        <Typography
          variant="h5"
          sx={{
            color: '#fff',
            fontFamily: "'Nanum Gothic', sans-serif",
            fontSize: '16px',
            letterSpacing: 1,
          }}
        >
         Så tøv ikke med at tage kontakt til os herunder. 
Vi bestræber os på at svare på henvendelser indenfor 24 timer, men op til ferier kan der være travlt, og svartiden kan derfor være op til 48 timer.
        </Typography>
        </Stack>
      </Box>

      
      <Box
        sx={{
          p: 4,
          backgroundColor: '#33626C',
          maxWidth: 1400,
          mx: 'auto',
          boxShadow: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Navn"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={textFieldStyles}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={textFieldStyles}
            />

            <TextField
              label="Hvad drejer henvendelsen sig om?"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              sx={textFieldStyles}
            />

            <TextField
              label="Besked (skriv datoer hvis det drejer sig om en booking)"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              sx={textFieldStyles}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#829B97',
                color: '#fff',
                fontFamily: 'zen Loop',
                '&:hover': {
                  backgroundColor: '#6B807A',
                },
              }}
            >
              Indsend
            </Button>

            {status.message && (
              <Typography
                variant="body1"
                sx={{
                  color: '#FFF',
                  fontWeight: 'bold',
                  mt: 1,
                }}
              >
                {status.message}
              </Typography>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default ContactForm