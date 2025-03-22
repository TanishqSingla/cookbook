import { useState, ChangeEvent } from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Textarea,
  Input,
  Button,
  useToast,
  HStack,
  VStack,
  Code,
  Divider,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react'
import * as jose from 'jose'

interface JwtPayload {
  [key: string]: any
}

function App() {
  const [token, setToken] = useState('')
  const [secret, setSecret] = useState('')
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null)
  const [isValid, setIsValid] = useState<boolean>(false)
  const toast = useToast()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleEncode = async () => {
    try {
      const headerObj = JSON.parse(header)
      const payloadObj = JSON.parse(payload)
      
      const secretKey = new TextEncoder().encode(secret)
      const jwt = await new jose.SignJWT(payloadObj)
        .setProtectedHeader(headerObj)
        .setIssuedAt()
        .sign(secretKey)

      setToken(jwt)
      setDecodedToken(payloadObj)
      setIsValid(true)
      toast({
        title: 'JWT created successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      setIsValid(false)
      toast({
        title: 'Error creating JWT',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      })
    }
  }

  const handleDecode = async () => {
    try {
      const decoded = await jose.decodeJwt(token)
      setDecodedToken(decoded)
      setHeader(JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2))
      setPayload(JSON.stringify(decoded, null, 2))
      setIsValid(true)
      toast({
        title: 'JWT decoded successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      setIsValid(false)
      toast({
        title: 'Error decoding JWT',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      })
    }
  }

  const handleVerify = async () => {
    try {
      if (!token || !secret) {
        throw new Error('Token and secret are required')
      }
      const secretKey = new TextEncoder().encode(secret)
      await jose.jwtVerify(token, secretKey)
      setIsValid(true)
      toast({
        title: 'Signature verified successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      setIsValid(false)
      toast({
        title: 'Invalid signature',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      })
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" size="lg">JWT Tools</Heading>
        
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <VStack spacing={4} align="stretch">
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">Encoded</Text>
                  <Badge colorScheme={isValid ? 'green' : 'red'}>
                    {isValid ? 'Valid JWT' : 'Invalid JWT'}
                  </Badge>
                </HStack>
                <Textarea
                  value={token}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setToken(e.target.value)}
                  height="150px"
                  fontFamily="monospace"
                  placeholder="Paste your JWT token here"
                  bg={bgColor}
                  borderColor={borderColor}
                />
                <HStack mt={4} spacing={4}>
                  <Button colorScheme="blue" onClick={handleDecode} flex={1}>
                    Decode
                  </Button>
                  <Button colorScheme="green" onClick={handleVerify} flex={1}>
                    Verify Signature
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold" mb={2}>HEADER: ALGORITHM & TOKEN TYPE</Text>
                <Textarea
                  value={header}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHeader(e.target.value)}
                  height="100px"
                  fontFamily="monospace"
                  bg={bgColor}
                  borderColor={borderColor}
                />
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>PAYLOAD: DATA</Text>
                <Textarea
                  value={payload}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPayload(e.target.value)}
                  height="150px"
                  fontFamily="monospace"
                  bg={bgColor}
                  borderColor={borderColor}
                />
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>VERIFY SIGNATURE</Text>
                <Input
                  type="password"
                  value={secret}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSecret(e.target.value)}
                  placeholder="Enter your secret key"
                  bg={bgColor}
                  borderColor={borderColor}
                />
              </Box>

              <Button colorScheme="blue" onClick={handleEncode}>
                Encode
              </Button>
            </VStack>
          </GridItem>
        </Grid>

        {decodedToken && (
          <Box>
            <Divider my={4} />
            <Heading size="md" mb={4}>Decoded Token</Heading>
            <Code display="block" whiteSpace="pre" p={4} borderRadius="md" bg={bgColor}>
              {JSON.stringify(decodedToken, null, 2)}
            </Code>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default App 