import { FavoriteCategory, FavoritePlace, FavoritePlaceInput } from "@/interfaces/favorite.interface";
import { editFavoritePlace } from "@/utils/favorite";
import { CloseIcon } from "@chakra-ui/icons";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, FormControl, FormLabel, Heading, IconButton, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";


interface Props extends Omit<DrawerProps, "children"> {
    favoritePlace?: FavoritePlace;
    reFetch: () => void;
}

const EditFavoriteDrawer
    = (props: Props) => {


        const { isOpen, onClose, favoritePlace, reFetch } = props;

        if (!favoritePlace) return null;

        const { name, category, id } = favoritePlace;

        const handleAddFavoritePlace = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;

            const formData = new FormData(form);

            const favoritePlace: Partial<FavoritePlaceInput> = {
                name: formData.get("name") as string,
                category: formData.get("category") as FavoriteCategory,
            }

            try {
                await editFavoritePlace(id, favoritePlace);
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
                        <Heading color="slate">แก้ไขสถานที่โปรด</Heading>
                        <IconButton icon={<CloseIcon />} aria-label="Close Drawer" size="sm" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody>
                        <form id="add-favorite-place" onSubmit={handleAddFavoritePlace}>
                            <Stack spacing={5}>
                                <FormControl>
                                    <FormLabel htmlFor="name">ชื่อสถานที่</FormLabel>
                                    <Input placeholder="ชื่อสถานที่" id="name" name="name" defaultValue={name} required />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="category">ประเภทสถานที่</FormLabel>
                                    <RadioGroup defaultValue={category} id="category" name="category">
                                        <Stack direction="row">
                                            <Radio value="HOME">บ้าน</Radio>
                                            <Radio value="WORK">ที่ทำงาน</Radio>
                                            <Radio value="OTHER">อื่นๆ</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
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

export default EditFavoriteDrawer
