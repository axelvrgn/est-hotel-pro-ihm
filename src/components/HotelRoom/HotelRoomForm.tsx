import { useForm } from "react-hook-form";
import CustomFormControl from "../Form/CustomFormControl";
import CustomInput from "../Form/CustomInput";
import {
  Button,
  InputGroup,
  InputRightElement,
  Spacer,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CHAMP_OBLIGATOIRE,
  DZD,
  ENREGISTRER,
  METTRE_A_JOUR,
} from "../../data/constants";
import CustomSelect from "../Form/CustomSelect";
import { CATEGORIES_ROOM } from "../../data/HotelRoom";
import { CategoryRoom, HotelRoom } from "../../interfaces/HotelRoom";
import { FormMode } from "../../helpers/FormUtils";

interface IHotelRoomFormValues {
  roomNumber: number;
  price: number;
  categoryRoom: string;
  state: string;
}

const hotelRoomFormValidationSchema = yup.object().shape({
  roomNumber: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .transform((val) => (val === Number(val) ? val : null)),
  price: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .transform((val) => (val === Number(val) ? val : null)),
  categoryRoom: yup.string().required(CHAMP_OBLIGATOIRE),
  state: yup.string().required(CHAMP_OBLIGATOIRE),
});

type HotelRoomFormProps = {
  submitFunction: (values: HotelRoom) => void;
  formIsSubmitting: boolean;
  formMode: FormMode;
  hotelRoom?: HotelRoom;
};

const HotelRoomForm = ({
  submitFunction,
  formIsSubmitting,
  formMode,
  hotelRoom,
}: HotelRoomFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IHotelRoomFormValues>({
    mode: "onChange",
    resolver: yupResolver(hotelRoomFormValidationSchema),
    defaultValues: {
      ...(hotelRoom && {
        roomNumber: hotelRoom.roomNumber,
        price: hotelRoom.price,
        categoryRoom: CategoryRoom[hotelRoom.category],
        state: hotelRoom.state,
      }),
    },
  });

  const onSubmit = (values: IHotelRoomFormValues) => {
    const newHotelRoom: HotelRoom = {
      id: values.roomNumber.toString(),
      roomNumber: values.roomNumber,
      price: values.price,
      category: values.categoryRoom as any,
      state: values.state,
    };

    submitFunction(newHotelRoom);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <CustomFormControl
          label={"Numéro de chambre"}
          errorField={errors.roomNumber}
        >
          <CustomInput
            type="number"
            name="roomNumber"
            register={register}
            min={0}
          />
        </CustomFormControl>
        <CustomFormControl label={"Prix"} errorField={errors.price}>
          <InputGroup>
            <CustomInput
              type="number"
              name="price"
              register={register}
              min={0}
            />
            <InputRightElement style={{ fontWeight: "600" }}>
              {DZD}
            </InputRightElement>
          </InputGroup>
        </CustomFormControl>
        <CustomFormControl label="Catégorie" errorField={errors.categoryRoom}>
          <CustomSelect
            name="categoryRoom"
            register={register}
            placeholder="Sélectionner une catégorie"
            options={CATEGORIES_ROOM}
          />
        </CustomFormControl>
        <CustomFormControl label="Statut" errorField={errors.state}>
          <CustomSelect
            name="state"
            register={register}
            placeholder="Sélectionner un statut"
            options={["option1", "option2"]}
          />
        </CustomFormControl>
      </div>
      <Spacer height={"20px"} />
      <Button
        type="submit"
        colorScheme="primary"
        isDisabled={!isValid}
        isLoading={formIsSubmitting}
      >
        {formMode === FormMode.CREATION ? ENREGISTRER : METTRE_A_JOUR}
      </Button>
    </form>
  );
};

export default HotelRoomForm;
