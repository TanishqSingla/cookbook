import { useState, ChangeEvent, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Textarea,
  Select,
  Input,
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Code,
  Divider,
} from '@chakra-ui/react'
import * as jose from 'jose'

interface JwtPayload {
  [key: string]: any
}

function App() {
  const [token, setToken] = useState('')
  const [secret, setSecret] = useState('')
  const [algorithm, setAlgorithm] = useState('HS256')
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null)
  const toast = useToast()

  const algorithms = ['HS256', 'HS384', 'HS512']

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
      toast({
        title: 'JWT created successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
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
      setDecodedToken(decoded as JwtPayload)
      toast({
        title: 'JWT decoded successfully',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error decoding JWT',
        description: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
        duration: 5000,
      })
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Dev Cookbook - JWT Tools</Heading>
        
        <Tabs>
          <TabList>
            <Tab>Encode</Tab>
            <Tab>Decode</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={2}>Header</Text>
                  <Textarea
                    value={header}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setHeader(e.target.value)}
                    height="100px"
                    fontFamily="monospace"
                    resize="vertical"
                  />
                </Box>

                <Box>
                  <Text mb={2}>Payload</Text>
                  <Textarea
                    value={payload}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPayload(e.target.value)}
                    height="150px"
                    fontFamily="monospace"
                    resize="vertical"
                  />
                </Box>

                <Box>
                  <Text mb={2}>Secret</Text>
                  <Input
                    type="password"
                    value={secret}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSecret(e.target.value)}
                    placeholder="Enter your secret key"
                  />
                </Box>

                <Box>
                  <Text mb={2}>Algorithm</Text>
                  <Select value={algorithm} onChange={(e: ChangeEvent<HTMLSelectElement>) => setAlgorithm(e.target.value)}>
                    {algorithms.map((algo) => (
                      <option key={algo} value={algo}>
                        {algo}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Button colorScheme="blue" onClick={handleEncode}>
                  Encode
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text mb={2}>JWT Token</Text>
                  <Textarea
                    value={token}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setToken(e.target.value)}
                    height="100px"
                    fontFamily="monospace"
                    resize="vertical"
                    placeholder="Paste your JWT token here"
                  />
                </Box>

                <Button colorScheme="blue" onClick={handleDecode}>
                  Decode
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {decodedToken && (
          <Box>
            <Divider my={4} />
            <Heading size="md" mb={4}>Decoded Token</Heading>
            <Code display="block" whiteSpace="pre" p={4} borderRadius="md">
              {JSON.stringify(decodedToken, null, 2)}
            </Code>
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default App 