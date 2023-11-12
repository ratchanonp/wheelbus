import { Flex } from "@chakra-ui/react"

const TestPage = () => {
    return (
        <Flex direction="column" h="100svh" w="100svw" align="center" justify="center">
            <svg>
                {/* Vertical Line */}
                <line x1="20" y1="30" x2="20" y2="50" stroke="#000" strokeWidth="2" />

                {/* Rounded Rect with border */}
                <rect x="10" y="10" rx="4" ry="4" width="20" height="20" fill="#ef4444" stroke="#fff" strokeWidth="2" />
            </svg>
        </Flex>
    )
}

export default TestPage