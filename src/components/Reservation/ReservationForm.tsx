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
import { CHAMP_OBLIGATOIRE, DZD, ENREGISTRER } from "../../data/constants";
import CustomTextArea from "../Form/CustomTextArea";

//installer moment js

interface IReservationFormValues {
  startDate: string;
  endDate: string;
  claim: string;
  numberOfChildren: number;
  numberOfAdults: number;
  pricePaid: number;
  review: number;
}

const reservationFormValidationSchema = yup.object().shape({
  startDate: yup.string().required(CHAMP_OBLIGATOIRE),
  endDate: yup.string().required(CHAMP_OBLIGATOIRE),
  claim: yup.string().required(CHAMP_OBLIGATOIRE),
  numberOfChildren: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .min(0)
    .transform((val) => (val === Number(val) ? val : null)),
  numberOfAdults: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .min(0)
    .transform((val) => (val === Number(val) ? val : null)),
  pricePaid: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .min(0)
    .transform((val) => (val === Number(val) ? val : null)),
  review: yup
    .number()
    .required(CHAMP_OBLIGATOIRE)
    .min(0)
    .transform((val) => (val === Number(val) ? val : null)),
});

const ReservationForm = () => {
  const today = new Date();
  const tomorrow = new Date(today.getDate() + 1);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IReservationFormValues>({
    mode: "onChange",
    resolver: yupResolver(reservationFormValidationSchema),
    defaultValues: {
      startDate: today.toDateString(),
      endDate: tomorrow.toString(),
    },
  });

  const onSubmit = (values: IReservationFormValues) => {
    return values;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <CustomFormControl label={"Début"} errorField={errors.startDate}>
          <CustomInput type="date" name="startDate" register={register} />
        </CustomFormControl>
        <CustomFormControl label={"Fin"} errorField={errors.endDate}>
          <CustomInput type="date" name="endDate" register={register} />
        </CustomFormControl>
        <CustomFormControl label="Réclamations" errorField={errors.claim}>
          <CustomTextArea
            name="claim"
            register={register}
            placeholder="Réclamations"
          />
        </CustomFormControl>
        <CustomFormControl
          label={"Nombre d'enfants"}
          errorField={errors.numberOfChildren}
        >
          <CustomInput
            type="number"
            name="numberOfChildren"
            register={register}
            min={0}
          />
        </CustomFormControl>
        <CustomFormControl
          label={"Nombre d'adultes"}
          errorField={errors.numberOfAdults}
        >
          <CustomInput
            type="number"
            name="numberOfAdults"
            register={register}
            min={0}
          />
        </CustomFormControl>
        <CustomFormControl label={"Prix"} errorField={errors.pricePaid}>
          <InputGroup>
            <CustomInput
              type="number"
              name="pricePaid"
              register={register}
              min={0}
            />
            <InputRightElement style={{ fontWeight: "600" }}>
              {DZD}
            </InputRightElement>
          </InputGroup>
        </CustomFormControl>
        <CustomFormControl label={"Review"} errorField={errors.review}>
          <CustomInput
            type="number"
            name="review"
            register={register}
            min={0}
          />
        </CustomFormControl>
      </div>
      <Spacer height={"20px"} />
      <Button type="submit" colorScheme="primary" isDisabled={!isValid}>
        {ENREGISTRER}
      </Button>
    </form>
  );
};

export default ReservationForm;
