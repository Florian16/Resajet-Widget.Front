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
};

export default function Widget({
  companyContext,
  isOpen,
  openCloseWidget,
}: WidgetProps) {
  const { t, i18n } = useTranslation();
  const { formulaire, handleChange, setFormulaire, handleCustomChange } =
    useFormulaire<ReservationRequest>({
      ...formulaireInitial,
    });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const steps = [
    t("steps.reservation"),
    t("steps.informations"),
    t("steps.recapitulatif"),
  ];

  useEffect(() => {
    setFormulaire({ ...formulaireInitial });
    if (isOpen) setActiveStep(0);
  }, [isOpen, setFormulaire]);

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ ownerState }) => ({
      color: companyContext.company?.mainColor,
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: companyContext.company?.mainColor,
      }),
      "& .QontoStepIcon-completedIcon": {
        color: companyContext.company?.mainColor,
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
      .catch(() => {
        console.log("error");
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
        <div className="resajet-body-container">
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
                t={t}
              />
            )}
            {activeStep === 1 && (
              <Information
                formulaire={formulaire}
                handleChange={handleChange}
                handleCustomChange={handleCustomChange}
                t={t}
              />
            )}
            {activeStep === 2 && (
              <Recapitulatif
                t={t}
                formulaire={formulaire}
                companyContext={companyContext}
              />
            )}

            {activeStep === 3 && (
              <SuccessAnimation
                title={t("validation.reservationBienEnregistree")}
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
        />
      }
    </div>
  );
}
