import { Stepper, Step, StepLabel } from "@mui/material";
import { RestaurantContextProps } from "../contexts/RestaurantContext";
import { useFormulaire } from "../hooks/useFormulaire";
import { useEffect, useState } from "react";
import Reservation from "./Reservation";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import Check from "@mui/icons-material/Check";

type WidgetProps = {
  restaurantContext: RestaurantContextProps;
  isOpen: boolean;
};

const formulaireInitial = {
  restoreOption: "",
  area: "",
  covers: 0,
  timeSlotId: "",
  date: null,
};

export default function Widget({ restaurantContext, isOpen }: WidgetProps) {
  const { formulaire, handleChange, setFormulaire, handleCustomChange } =
    useFormulaire<FormulaireReservation>({
      ...formulaireInitial,
    });
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    setFormulaire({ ...formulaireInitial });
    if (isOpen) setActiveStep(0);
  }, [isOpen, setFormulaire]);

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: restaurantContext.restaurantSettings?.secondColor,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: restaurantContext.restaurantSettings?.secondColor,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#8a8a8a",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: restaurantContext.restaurantSettings?.secondColor,
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: restaurantContext.restaurantSettings?.secondColor,
      }),
      "& .QontoStepIcon-completedIcon": {
        color: restaurantContext.restaurantSettings?.secondColor,
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

  function QontoStepIcon(props: StepIconProps) {
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
  }

  return (
    <div
      className={`resajet-widget ${
        isOpen ? "resajet-widget-open" : "resajet-widget-close"
      }`}
    >
      <div
        className="resajet-header"
        style={{
          backgroundColor: restaurantContext.restaurantSettings?.secondColor,
        }}
      >
        <span>Réserver maintenant</span>
      </div>
      <div
        className="resajet-body"
        style={{
          background: restaurantContext.restaurantSettings?.mainColor,
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className="resajet-body-stepper"
          connector={<QontoConnector />}
        >
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Réservation</StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Données</StepLabel>
          </Step>
          <Step>
            <StepLabel StepIconComponent={QontoStepIcon}>Validation</StepLabel>
          </Step>
        </Stepper>
        {activeStep === 0 && (
          <Reservation
            handleChange={handleChange}
            handleCustomChange={handleCustomChange}
            restaurantContext={restaurantContext}
            formulaire={formulaire}
            onChangeStepper={(activeStep: number) => setActiveStep(activeStep)}
          />
        )}
      </div>
    </div>
  );
}
