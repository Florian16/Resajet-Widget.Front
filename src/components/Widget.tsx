import { Stepper, Step, StepLabel } from "@mui/material";
import { CompanyContextProps } from "../contexts/CompanyContext";
import { useFormulaire } from "../hooks/useFormulaire";
import { useEffect, useState } from "react";
import Reservation from "./Reservation";
import { ReservationRequest } from "../requests/ReservationRequest";
import { styled } from "@mui/material/styles";
import { StepIconProps } from "@mui/material/StepIcon";
import Check from "@mui/icons-material/Check";
import Information from "./Information";
import Footer from "./Footer";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import Recapitulatif from "./Recapitulatif";
import SuccessAnimation from "./SuccessAnimation";
import { reservationService } from "../services/reservation.service";
import dayjs from "dayjs";
import { Error } from "../dtos/Error/Error";
import { ErrorType } from "../enums/ErrorType";

type WidgetProps = {
  companyContext: CompanyContextProps;
  isOpen: boolean;
  openCloseWidget: () => void;
};

const formulaireInitial: ReservationRequest = {
  periodId: "",
  areaId: "",
  participants: 0,
  timeSlotId: "",
  date: null,
  firstname: "",
  lastname: "",
  phoneNumber: "",
  email: "",
  comment: "",
  termsConditions: false,
};

export default function Widget({
  companyContext,
  isOpen,
  openCloseWidget,
}: WidgetProps) {
  const { t, i18n } = useTranslation();
  const {
    formulaire,
    handleChange,
    setFormulaire,
    handleCustomChange,
    handleCheckboxChange,
  } = useFormulaire<ReservationRequest>({
    ...formulaireInitial,
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[]>([]);
  const steps = [
    t("steps.reservation"),
    t("steps.informations"),
    t("steps.recapitulatif"),
  ];

  useEffect(() => {
    setFormulaire({ ...formulaireInitial });
    if (isOpen) setActiveStep(0);
  }, [isOpen, setFormulaire]);

  useEffect(() => {
    if (
      formulaire.date !== null &&
      companyContext?.company?.periods
        .find((p) => p.id === formulaire.periodId)
        ?.timeSlots.filter((ts) => {
          const today = dayjs();
          const timeslotTime = dayjs(ts.hour, "HH:mm");

          return !(
            today.isSame(dayjs(formulaire?.date), "day") &&
            timeslotTime.isBefore(today, "hour")
          );
        }).length === 0
    )
      setFormulaire({ ...formulaire, date: null });
  }, [formulaire.periodId]);

  const errorsManagement = (errors: Error[]) => {
    let scrollElement = null;

    if (
      scrollElement === null &&
      errors.findIndex((e) => e.type === ErrorType.Participants) > -1
    ) {
      setActiveStep(0);
      scrollElement = document.getElementById("participants");
    }

    if (
      scrollElement === null &&
      errors.findIndex((e) => e.type === ErrorType.Date) > -1
    ) {
      setActiveStep(0);
      scrollElement = document.getElementById("date");
    }

    if (
      scrollElement === null &&
      errors.findIndex((e) => e.type === ErrorType.Firstname) > -1
    ) {
      setActiveStep(1);
      scrollElement = document.getElementById("firstname");
    }

    if (
      scrollElement === null &&
      errors.findIndex((e) => e.type === ErrorType.Company) > -1
    ) {
      setActiveStep(2);
      scrollElement = document.getElementById("company");
    }

    if (scrollElement !== null) {
      setErrors([...errors]);

      scrollElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const errorsChecking = (isLoading = false) => {
    let newErrors: Error[] = [...errors];
    let scrollElement = null;

    if (activeStep === 0) {
      if (formulaire?.periodId === "") {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("periodId");

          if (newErrors.findIndex((e) => e.type === ErrorType.Period) === -1)
            newErrors.push({
              type: ErrorType.Period,
              message: t("errors.momentRequis"),
              step: 0,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Period);
      }

      if (formulaire?.participants <= 0) {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("participants");

          if (
            newErrors.findIndex((e) => e.type === ErrorType.Participants) === -1
          )
            newErrors.push({
              type: ErrorType.Participants,
              message: t("errors.participantRequis"),
              step: 0,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Participants);
      }

      if (formulaire?.date === null) {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("date");

          if (newErrors.findIndex((e) => e.type === ErrorType.Date) === -1)
            newErrors.push({
              type: ErrorType.Date,
              message: t("errors.dateRequise"),
              step: 0,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Date);
      }

      if (formulaire?.timeSlotId === "") {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("hour");

          if (newErrors.findIndex((e) => e.type === ErrorType.TimeSlot) === -1)
            newErrors.push({
              type: ErrorType.TimeSlot,
              message: t("errors.heureRequise"),
              step: 0,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.TimeSlot);
      }
    } else if (activeStep === 1) {
      if (formulaire?.lastname === "") {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("lastname");

          if (newErrors.findIndex((e) => e.type === ErrorType.Lastname) === -1)
            newErrors.push({
              type: ErrorType.Lastname,
              message: t("errors.nomRequis"),
              step: 1,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Lastname);
      }

      if (formulaire?.firstname === "") {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("firstname");

          if (newErrors.findIndex((e) => e.type === ErrorType.Firstname) === -1)
            newErrors.push({
              type: ErrorType.Firstname,
              message: t("errors.prenomRequis"),
              step: 1,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Firstname);
      }

      if (
        formulaire?.email === "" ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          formulaire?.email
        )
      ) {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("email");

          if (newErrors.findIndex((e) => e.type === ErrorType.Email) === -1)
            newErrors.push({
              type: ErrorType.Email,
              message: t("errors.emailRequis"),
              step: 1,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.Email);
      }

      if (formulaire?.phoneNumber === "") {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("phoneNumber");

          if (
            newErrors.findIndex((e) => e.type === ErrorType.PhoneNumber) === -1
          )
            newErrors.push({
              type: ErrorType.PhoneNumber,
              message: t("errors.telephoneRequis"),
              step: 1,
            });
        }
      } else {
        newErrors = newErrors.filter((e) => e.type !== ErrorType.PhoneNumber);
      }

      if (!formulaire?.termsConditions) {
        if (isLoading) {
          if (scrollElement === null)
            scrollElement = document.getElementById("termsConditions");

          if (
            newErrors.findIndex((e) => e.type === ErrorType.TermsConditions) ===
            -1
          )
            newErrors.push({
              type: ErrorType.TermsConditions,
              message: t("errors.conditionsUtilisationRequis"),
              step: 1,
            });
        }
      } else {
        newErrors = newErrors.filter(
          (e) => e.type !== ErrorType.TermsConditions
        );
      }
    }

    if (isLoading && newErrors.length > 0) {
      scrollElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
      setErrors(newErrors);
    }
    return newErrors.filter((e) => e.step === activeStep).length;
  };

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ ownerState }) => ({
      color: companyContext.company?.companySetting?.mainColor,
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: companyContext.company?.companySetting?.mainColor,
      }),
      "& .QontoStepIcon-completedIcon": {
        color: companyContext.company?.companySetting?.mainColor,
        zIndex: 1,
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    })
  );

  const QontoStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  };

  const validateReservation = () => {
    setIsSubmitting(true);
    reservationService
      .createReservation(
        companyContext.company?.id ?? "",
        formulaire,
        i18n.language
      )
      .then(() => {
        setActiveStep(activeStep + 1);
        setFormulaire({
          ...formulaireInitial,
        });
      })
      .catch((error) => {
        const firstStepErrors = [
          ErrorType.Period,
          ErrorType.Participants,
          ErrorType.Date,
          ErrorType.Area,
          ErrorType.TimeSlot,
        ];
        const secondStepErrors = [
          ErrorType.Lastname,
          ErrorType.Firstname,
          ErrorType.Email,
          ErrorType.PhoneNumber,
          ErrorType.TermsConditions,
        ];
        const newErrors: Error[] = [];

        error?.response?.data?.errors?.forEach((error: Error) => {
          const errorType: ErrorType =
            ErrorType[error.type as keyof typeof ErrorType];
          const step =
            firstStepErrors.findIndex((e) => e === errorType) > -1
              ? 0
              : secondStepErrors.findIndex((e) => e === errorType) > -1
              ? 1
              : 2;
          newErrors.push({ type: errorType, message: error.message, step });
        });
        if (newErrors.length > 0) errorsManagement(newErrors);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div
      className={`resajet-widget ${
        isOpen ? "resajet-widget-open" : "resajet-widget-close"
      }`}
    >
      <Header companyContext={companyContext} />
      <div className="resajet-body">
        <div className="resajet-body-big-container">
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className="resajet-body-stepper"
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && (
              <Reservation
                handleChange={handleChange}
                handleCustomChange={handleCustomChange}
                companyContext={companyContext}
                formulaire={formulaire}
                errors={errors}
                formulaireInitial={formulaireInitial}
                errorsChecking={() => {
                  return errorsChecking();
                }}
                t={t}
              />
            )}
            {activeStep === 1 && (
              <Information
                formulaire={formulaire}
                handleChange={handleChange}
                handleCustomChange={handleCustomChange}
                handleCheckboxChange={handleCheckboxChange}
                companyContext={companyContext}
                errors={errors}
                errorsChecking={() => {
                  return errorsChecking();
                }}
                formulaireInitial={formulaireInitial}
                t={t}
              />
            )}
            {activeStep === 2 && (
              <Recapitulatif
                t={t}
                formulaire={formulaire}
                companyContext={companyContext}
                errors={errors}
              />
            )}

            {activeStep === 3 && (
              <SuccessAnimation
                title={
                  companyContext.company?.companyReservationSetting
                    .automaticConfirmation
                    ? t("validation.reservationBienEnregistree")
                    : t("validation.reservationEnAttenteConfirmation")
                }
              />
            )}
          </div>
        </div>
      </div>
      {
        <Footer
          activeStep={activeStep}
          formulaire={formulaire}
          setActiveStep={(as) => setActiveStep(as)}
          steps={steps}
          validateReservation={validateReservation}
          t={t}
          companyContext={companyContext}
          isSubmitting={isSubmitting}
          openCloseWidget={openCloseWidget}
          errorsChecking={() => errorsChecking(true)}
        />
      }
    </div>
  );
}
