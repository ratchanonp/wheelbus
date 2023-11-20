import StepDetail from "@/components/Step/StepDetail";
import { DirectionRendererContext, DirectionRendererDispatchContext } from "@/contexts/RouteContext";
import { SearchContext } from "@/contexts/SearchContext";
import useGetDirection from "@/hooks/useGetDirection";
import { Divider, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DirectionResult = () => {

    const dispatch = useContext(DirectionRendererDispatchContext);
    const directionRenderer = useContext(DirectionRendererContext);

    const search = useContext(SearchContext);

    const { fromPlaceId, toPlaceId } = search;

    const { direction, getDirection } = useGetDirection();

    const handleSelectionRouteOption = (routeIndex: number) => {
        if (!direction) return null;

        const option: google.maps.DirectionsRendererOptions = {
            routeIndex: routeIndex,
        }

        dispatch({
            type: "PICK_DIRECTION_INDEX",
            payload: option
        })

        navigate("/navigation");
    }

    useEffect(() => {
        if (fromPlaceId && toPlaceId) {
            getDirection(fromPlaceId, toPlaceId);
        }
    }, [fromPlaceId, toPlaceId])

    useEffect(() => {
        if (direction) {
            const option: google.maps.DirectionsRendererOptions = {
                directions: direction,
            }

            console.log("set option", option);

            dispatch({
                type: "SET_DIRECTION",
                payload: option
            })

            console.log("directionRenderer", directionRenderer);
        }
    }, [direction])

    const navigate = useNavigate();

    return (
        <Stack px={3} divider={<Divider />} spacing={3}>
            {direction?.routes.map((route, index) => {
                const { legs } = route;
                const data = legs[0];

                const { duration, steps, departure_time, arrival_time } = data;

                return (
                    <Flex key={index} gap={5} direction="column" onClick={() => handleSelectionRouteOption(index)} cursor="pointer">
                        <Flex mr={2} flexWrap={"wrap"} gap={2}>
                            {steps.map((step, index) => {
                                return (
                                    <>
                                        <StepDetail key={index} step={step} />
                                        {index !== steps.length - 1 && (
                                            <Icon as={FaChevronRight} color="slate" w={4} h={4} />
                                        )}
                                    </>
                                )
                            })}
                        </Flex>
                        <Flex justifyContent="space-between">
                            <Text>{departure_time?.text} - {arrival_time?.text}</Text>
                            <Text>{duration?.text}</Text>
                        </Flex>
                    </Flex>
                )
            })}
        </Stack>)
}

export default DirectionResult