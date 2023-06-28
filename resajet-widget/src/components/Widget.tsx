import { Stepper, Step, StepLabel, Grid, Button } from "@mui/material";
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
import Information from "./Information";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";

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
  firstname: "",
  lastname: "",
  phone: "",
  mail: "",
  comment: "",
};

const steps = ["Réservation", "Données", "Validation"];

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

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ ownerState }) => ({
      color: restaurantContext.restaurantSettings?.mainColor,
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: restaurantContext.restaurantSettings?.mainColor,
      }),
      "& .QontoStepIcon-completedIcon": {
        color: restaurantContext.restaurantSettings?.mainColor,
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
          backgroundColor: restaurantContext.restaurantSettings?.mainColor,
        }}
      >
        <span>Réserver maintenant</span>
      </div>
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
              restaurantContext={restaurantContext}
              formulaire={formulaire}
              onChangeStepper={(activeStep: number) =>
                setActiveStep(activeStep)
              }
            />
          )}
          {activeStep === 1 && (
            <Information formulaire={formulaire} handleChange={handleChange} />
          )}
        </div>
      </div>
      <div className="resajet-footer">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button
              startIcon={<ChevronLeft />}
              disabled={activeStep === 0}
              onClick={() => setActiveStep(activeStep - 1)}
              style={{ color: "black" }}
            >
              Retour
            </Button>
          </Grid>
          <Grid item>
            <Button
              endIcon={
                activeStep === steps.length - 1 ? (
                  <CheckIcon />
                ) : (
                  <ChevronRight />
                )
              }
              onClick={() =>
                activeStep === steps.length - 1
                  ? alert("Fini")
                  : setActiveStep(activeStep + 1)
              }
              style={{ color: "black" }}
            >
              {activeStep === steps.length - 1 ? "Terminer" : "Suivant"}{" "}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
