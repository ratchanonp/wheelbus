import { FavoritePlace } from "@/interfaces/favorite.interface";
import { deleteFavoritePlace } from "@/utils/favorite";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, HStack, Heading, IconButton, Text } from "@chakra-ui/react";


interface Props extends Omit<DrawerProps, "children"> {
    favoritePlace?: FavoritePlace;
    reFetch: () => void;
}

const DeleteFavoriteDrawer = (props: Props) => {


    const { isOpen, onClose, favoritePlace, reFetch } = props;

    if (!favoritePlace) return null;

    const { name, id } = favoritePlace;

    const handleDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await deleteFavoritePlace(id);
            reFetch();
            onClose();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent borderTopRadius="2xl">

                <DrawerHeader display="flex" alignItems="center" justifyContent="space-between">
                    <Heading color="slate">ลบสถานที่โปรด</Heading>
                    <IconButton icon={<CloseIcon />} aria-label="Close Drawer" size="sm" onClick={onClose} />
                </DrawerHeader>
                <DrawerBody>
                    <Text>
                        คุณต้องการลบสถานที่โปรด <Text as="span" fontWeight="bold" textDecor="underline">{name}</Text>  ใช่หรือไม่
                    </Text>
                </DrawerBody>
                <DrawerFooter>
                    <HStack w="full">
                        <Button variant="outline" size="lg" w="full" onClick={onClose}>ยกเลิก</Button>
                        <Button colorScheme="red" size="lg" w="full" onClick={handleDelete}>ลบ</Button>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DeleteFavoriteDrawer
