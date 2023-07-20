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

type WidgetProps = {
  companyContext: CompanyContextProps;
  isOpen: boolean;
};

const formulaireInitial = {
  periodId: "",
  areaId: "",
  participants: 0,
  timeSlotId: "",
  date: null,
  firstname: "",
  lastname: "",
  phoneNumber: "",
  mail: "",
  comment: "",
};

export default function Widget({ companyContext, isOpen }: WidgetProps) {
  const { t } = useTranslation();
  const { formulaire, handleChange, setFormulaire, handleCustomChange } =
    useFormulaire<ReservationRequest>({
      ...formulaireInitial,
    });
  const [activeStep, setActiveStep] = useState<number>(0);
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
      color: companyContext.companySettings?.mainColor,
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: companyContext.companySettings?.mainColor,
      }),
      "& .QontoStepIcon-completedIcon": {
        color: companyContext.companySettings?.mainColor,
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

  return (
    <div
      className={`resajet-widget ${
        isOpen ? "resajet-widget-open" : "resajet-widget-close"
      }`}
    >
      <Header companyContext={companyContext} />
      <div className="resajet-body">
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
      <Footer
        activeStep={activeStep}
        formulaire={formulaire}
        setActiveStep={(as) => setActiveStep(as)}
        steps={steps}
        t={t}
      />
    </div>
  );
}
