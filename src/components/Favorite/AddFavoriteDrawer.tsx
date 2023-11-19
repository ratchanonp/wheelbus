import { FavoriteCategory, FavoritePlaceInput } from "@/interfaces/favorite.interface";
import { addFavoritePlace } from "@/utils/favorite";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, FormControl, FormLabel, Heading, IconButton, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


interface Props extends Omit<DrawerProps, "children"> {
    address: string;
    currentLocation: {
        lat: number;
        lng: number;
    }
}

const AddFavoriteDrawer = (props: Props) => {

    const navigate = useNavigate();

    const { isOpen, onClose, address, currentLocation } = props;
    const { lat, lng } = currentLocation;

    const handleAddFavoritePlace = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData(form);

        const favoritePlace: FavoritePlaceInput = {
            name: formData.get("name") as string,
            category: formData.get("category") as FavoriteCategory,
            position: {
                lat: parseFloat(formData.get("lat") as string),
                lng: parseFloat(formData.get("lng") as string)
            }
        }

        const response = await addFavoritePlace(favoritePlace);
        console.log(response)

        if (response) {
            navigate("/favorites");
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
                    <Heading color="slate">เพิ่มสถานที่โปรด</Heading>
                    <IconButton icon={<CloseIcon />} aria-label="Close Drawer" size="sm" onClick={onClose} />
                </DrawerHeader>
                <DrawerBody>
                    <form id="add-favorite-place" onSubmit={handleAddFavoritePlace}>
                        <Stack spacing={5}>
                            <FormControl>
                                <FormLabel htmlFor="name">ชื่อสถานที่</FormLabel>
                                <Input placeholder="ชื่อสถานที่" id="name" name="name" required />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="address">ที่อยู่</FormLabel>
                                <Input placeholder="ที่อยู่" value={address} id="address" readOnly disabled />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="category">ประเภทสถานที่</FormLabel>
                                <RadioGroup defaultValue="HOME" id="category" name="category">
                                    <Stack direction="row">
                                        <Radio value="HOME">บ้าน</Radio>
                                        <Radio value="WORK">ที่ทำงาน</Radio>
                                        <Radio value="OTHER">อื่นๆ</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <input type="hidden" name="lat" id="lat" value={lat} />
                            <input type="hidden" name="lng" id="lng" value={lng} />
                        </Stack>
                    </form>
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme="brand" size="lg" w="full" type="submit" form="add-favorite-place">เพิ่มสถานที่โปรด</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default AddFavoriteDrawer