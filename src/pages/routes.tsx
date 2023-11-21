import DirectionResult from "@/components/Direction/DirectionResult/DirectionResult";
import FavoritePlace from "@/components/FavoritePlaces/FavoritePlace";
import PlaceSuggestion from "@/components/PlaceSuggestion/PlaceSuggestion";
import { CLEAR_PLACE_SUGGESTIONS, PlaceSuggestionContext, PlaceSuggestionReducerContext } from "@/contexts/PlaceSuggestionContext";
import { DirectionRendererDispatchContext } from "@/contexts/RouteContext";
import { CLEAR_FROM, CLEAR_TO, SET_FOCUSED_INPUT, SET_FROM, SET_TO, SWAP, SearchContext, SearchDispatchContext, focusedInputType } from "@/contexts/SearchContext";
import useCurrentPosition from "@/hooks/useCurrentLocation";
import { Box, Circle, Divider, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaArrowLeft, FaTimesCircle } from "react-icons/fa";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import { MdSwapVert } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const RouteSearchPage = () => {

    const search = useContext(SearchContext);
    const searchDispatch = useContext(SearchDispatchContext);

    const placeSuggestions = useContext(PlaceSuggestionContext);
    const placeSuggestionsDispatch = useContext(PlaceSuggestionReducerContext);

    const directionDispatch = useContext(DirectionRendererDispatchContext);

    const { from, to, focusedInput } = search;
    const { loading: currentLocationLoading, getCurrentLocation } = useCurrentPosition();

    const handleClear = (focusedInput: focusedInputType) => {
        if (focusedInput === "from") {
            searchDispatch({ type: CLEAR_FROM })
        }
        if (focusedInput === "to") {
            searchDispatch({ type: CLEAR_TO })
        }

        placeSuggestionsDispatch({ type: CLEAR_PLACE_SUGGESTIONS })
        directionDispatch({ type: "CLEAR_DIRECTION" })
    }

    const handleFocusInput = (focusedInput: focusedInputType) => {
        searchDispatch({ type: SET_FOCUSED_INPUT, payload: { focusedInput } })
        directionDispatch({ type: "CLEAR_DIRECTION" })
    }

    return (
        <Flex direction="column" h="100svh">
            <Stack bgColor="brand.500" p={3} pb={6} rowGap={3}>
                <Flex w="full" align="center">
                    <IconButton
                        icon={<Icon
                            as={FaArrowLeft}
                            color="white"
                            w={4}
                            h={4}
                        />}
                        as={RouterLink}
                        to="/search"
                        aria-label="back"
                        size="sm"
                        variant="ghost"
                    />
                    <Heading textAlign="center" flex={1} as="h1" fontWeight="medium" size="md" color="white">ค้นหาเส้นทาง</Heading>
                    <Box w={8} h={8} />
                </Flex>
                <Flex w="full" gap={2} pl={3}>
                    <Stack flex={1}>
                        <Flex align="center" gap={3}>
                            <Circle size={3} bgColor="blue.500" shadow="xl" />
                            <InputGroup>
                                <InputLeftElement><Text fontFamily="prompt" justifyContent="end" fontSize="smaller" textColor="gray">จาก</Text></InputLeftElement>
                                <Input
                                    bgColor="white" type="text" borderLeft="none" placeholder="เริ่มจากที่ไหน" fontFamily="prompt" color="gray" _focusVisible={{ border: "none" }}
                                    value={from}
                                    onChange={(e) => { searchDispatch({ type: SET_FROM, payload: { from: e.target.value } }) }}
                                    onFocus={() => searchDispatch({ type: SET_FOCUSED_INPUT, payload: { focusedInput: "from" } })}
                                />
                                {from && (
                                    <InputRightElement>
                                        <Icon
                                            as={FaTimesCircle} color="gray" w={4} h={4}
                                            onClick={() => handleClear("from")}
                                        />
                                    </InputRightElement>
                                )}
                            </InputGroup>
                        </Flex>
                        <Flex align="center" gap={3}>
                            <Box w={3} h={3} bgColor="red.500" borderRadius="2px" shadow="xl" />
                            <InputGroup>
                                <InputLeftElement><Text fontFamily="prompt" justifyContent="end" fontSize="smaller" textColor="gray">ถึง</Text></InputLeftElement>
                                <Input
                                    bgColor="white" type="text" borderLeft="none" placeholder="ไปที่ไหนดี" fontFamily="prompt" color="gray" _focusVisible={{ border: "none" }}
                                    value={to}
                                    onChange={(e) => { searchDispatch({ type: SET_TO, payload: { to: e.target.value } }) }}
                                    onFocus={() => handleFocusInput("to")}
                                />
                                {to && (
                                    <InputRightElement>
                                        <Icon
                                            as={FaTimesCircle} color="gray" w={4} h={4}
                                            onClick={() => handleClear("to")}
                                        />
                                    </InputRightElement>
                                )}
                            </InputGroup>
                        </Flex>
                    </Stack>
                    <Flex align="center">
                        <IconButton
                            icon={<Icon
                                as={MdSwapVert}
                                color="white"
                                w={6} h={6}
                            />}
                            aria-label="swap"
                            size="md"
                            variant="none"
                            onClick={() => searchDispatch({ type: SWAP })}
                        />
                    </Flex>
                </Flex>
            </Stack>
            <Flex flex={1} direction="column">
                {focusedInput && placeSuggestions.placeSuggestions.length == 0 && (
                    <Stack p={5} spacing={3} fontFamily="prompt" divider={<Divider />}>
                        <Flex justify="space-between" onClick={getCurrentLocation}>
                            <Heading size="md" fontWeight="semibold">ตำแหน่งปัจจุบัน</Heading>
                            {!currentLocationLoading ? (
                                <Icon as={FaLocationCrosshairs} color="slate" w={4} h={4} />
                            ) : (
                                <Spinner color="slate" w={4} h={4} />
                            )}
                        </Flex>
                        <Link display="flex" justifyContent="space-between" as={RouterLink} to="/pickLocation">
                            <Heading size="md" fontWeight="semibold">เลือกบนแผนที่</Heading>
                            <Icon as={FaLocationDot} color="slate" w={4} h={4} />
                        </Link>
                        <FavoritePlace />
                    </Stack>
                )}
                <PlaceSuggestion />
                <DirectionResult />
            </Flex>

        </Flex>
    )
}

export default RouteSearchPage