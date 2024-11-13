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
import CustomTextArea from "../Form/CustomTextArea";
import { Reservation, UserSnapShot } from "../../interfaces/Reservation";
import { FormMode } from "../../helpers/FormUtils";
interface IReservationFormValues {
  userName: string;
  userFirstName: string;
  userNumberPhone: string;
  startDate: string;
  endDate: string;
  claim: string;
  numberOfChildren: number;
  numberOfAdults: number;
  pricePaid: number;
  review: number;
}

const reservationFormValidationSchema = yup.object().shape({
  userName: yup.string().required(CHAMP_OBLIGATOIRE),
  userFirstName: yup.string().required(CHAMP_OBLIGATOIRE),
  userNumberPhone: yup.string().required(CHAMP_OBLIGATOIRE),
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

type ReservationFormProps = {
  submitFunction: (newReservation: Reservation) => void;
  formIsSubmitting: boolean;
  formMode: FormMode;
  reservation?: Reservation;
};

const ReservationForm = ({
  submitFunction,
  formIsSubmitting,
  formMode,
  reservation,
}: ReservationFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IReservationFormValues>({
    mode: "onChange",
    resolver: yupResolver(reservationFormValidationSchema),
    defaultValues: {
      ...(reservation && {
        userName: reservation.userSnapShot.name,
        userFirstName: reservation.userSnapShot.firstName,
        userNumberPhone: reservation.userSnapShot.numberPhone,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        claim: reservation.claim,
        numberOfAdults: reservation.numberOfAdults,
        numberOfChildren: reservation.numberOfChildren,
        pricePaid: reservation.pricePaid,
        review: reservation.review,
      }),
    },
  });

  const onSubmit = (values: IReservationFormValues) => {
    const reservationUser: UserSnapShot = {
      name: values.userName,
      firstName: values.userFirstName,
      numberPhone: values.userNumberPhone,
    };

    const newReservation: Reservation = {
      id: "reservation-" + Math.random().toString(),
      userSnapShot: reservationUser,
      startDate: values.startDate,
      endDate: values.endDate,
      claim: values.claim,
      numberOfChildren: values.numberOfChildren,
      numberOfAdults: values.numberOfAdults,
      pricePaid: values.pricePaid,
      review: values.review,
    };

    submitFunction(newReservation);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", gap: "15px" }}>
          <CustomFormControl label={"Nom"} errorField={errors.startDate}>
            <CustomInput type="text" name="userName" register={register} />
          </CustomFormControl>
          <CustomFormControl label={"Prénom"} errorField={errors.startDate}>
            <CustomInput type="text" name="userFirstName" register={register} />
          </CustomFormControl>
          <CustomFormControl label={"Téléphone"} errorField={errors.startDate}>
            <CustomInput
              type="text"
              name="userNumberPhone"
              register={register}
            />
          </CustomFormControl>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <CustomFormControl label={"Début"} errorField={errors.startDate}>
            <CustomInput type="date" name="startDate" register={register} />
          </CustomFormControl>
          <CustomFormControl label={"Fin"} errorField={errors.endDate}>
            <CustomInput type="date" name="endDate" register={register} />
          </CustomFormControl>
        </div>
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

export default ReservationForm;
