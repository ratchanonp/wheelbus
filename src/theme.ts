import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            100: "#DFFFEE",
            500: "#2BC875",
        },
        slate: {
            500: "#64748b",
        },
        origin: "#3b82f6",
        destination: "#ef4444"
    },
    fonts: {
        heading: `'Prompt', sans-serif`,
        body: `'Sarabun', sans-serif`,
    },
})

export default theme;