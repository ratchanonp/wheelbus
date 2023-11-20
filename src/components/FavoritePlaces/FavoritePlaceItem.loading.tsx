import { Skeleton } from "@chakra-ui/react";

interface Props {
    noItems: number;
}

const FavoritePlaceItemLoading = (props: Props) => {

    const { noItems } = props;

    return (
        <>
            {[...Array(noItems)].map((_, idx) => {
                return (
                    <Skeleton key={idx} height="20px" />
                )
            })}
        </>
    )
}

export default FavoritePlaceItemLoading