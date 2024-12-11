import { FormControl, FormLabel, Select, Switch } from "@chakra-ui/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CATEGORIES_ROOM, CATEGORY_ROOM_LABELS } from "../../data/HotelRoom";
import { useEffect } from "react";

export type SelectedHotelRoomFilters = {
  categoryRoom: string;
  isAvailable?: boolean;
};

interface IHotelRoomFiltersFormValues {
  categoryRoom: string;
  isAvailable: boolean;
}

type HotelRoomFiltersProps = {
  sendFilters: (filters: SelectedHotelRoomFilters) => void;
};

const HotelRoomFilters = ({ sendFilters }: HotelRoomFiltersProps) => {
  const { register, control, handleSubmit } =
    useForm<IHotelRoomFiltersFormValues>();

  const watchedFileds = useWatch({ control });

  useEffect(() => {
    if (watchedFileds) {
      handleSubmit((data) => handleFilters(data))();
    }
  }, [watchedFileds, handleSubmit]);

  const handleFilters = (data: IHotelRoomFiltersFormValues) => {
    sendFilters(data);
  };

  return (
    <form>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            {"Chambres libres"}
          </FormLabel>
          <Controller
            control={control}
            name="isAvailable"
            render={({ field: { onChange } }) => (
              <Switch onChange={(e) => onChange(e.target.checked)} />
            )}
          />
        </FormControl>
        <Select
          {...register("categoryRoom")}
          placeholder={"Sélectionner une catégorie"}
          focusBorderColor="primary.300"
        >
          {CATEGORIES_ROOM.map((category) => (
            <option value={category} key={category}>
              {CATEGORY_ROOM_LABELS[category]}
            </option>
          ))}
        </Select>
      </div>
    </form>
  );
};

export default HotelRoomFilters;
