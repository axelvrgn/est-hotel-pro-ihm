import { useForm } from "react-hook-form";
import CustomFormControl from "../Form/CustomFormControl";
import CustomInput from "../Form/CustomInput";
import { Button, Spacer } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CHAMP_OBLIGATOIRE, ENREGISTRER } from "../../data/constants";
//installer moment js

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

const HotelRoomForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IHotelRoomFormValues>({
    mode: "onChange",
    resolver: yupResolver(hotelRoomFormValidationSchema),
  });

  const onSubmit = (values: IHotelRoomFormValues) => {
    return values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <CustomInput type="number" name="price" register={register} min={0} />
      </CustomFormControl>
      <CustomFormControl label="Catégorie" errorField={errors.categoryRoom}>
        <CustomInput type="text" name="categoryRoom" register={register} />
      </CustomFormControl>
      <CustomFormControl label="Statut" errorField={errors.state}>
        <CustomInput type="text" name="state" register={register} />
      </CustomFormControl>
      <Spacer height={"20px"} />
      <Button type="submit" isDisabled={!isValid}>
        {ENREGISTRER}
      </Button>
    </form>
  );
};

export default HotelRoomForm;
