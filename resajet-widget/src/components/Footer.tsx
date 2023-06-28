import { Grid, Button } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { FormulaireReservation } from "../interfaces/FormulaireReservation";

type FooterProps = {
  activeStep: number;
  formulaire: FormulaireReservation;
  setActiveStep: (as: number) => void;
  steps: string[];
};

export default function Footer({
  activeStep,
  formulaire,
  setActiveStep,
  steps,
}: FooterProps) {
  const nextIsDisabled = () => {
    if (activeStep === 0) {
      return (
        formulaire?.restoreOption === "" ||
        formulaire?.covers <= 0 ||
        formulaire?.date === null ||
        formulaire?.timeSlotId === ""
      );
    }
    return false;
  };
  return (
    <div className="resajet-footer">
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button
            startIcon={<ChevronLeft />}
            onClick={() => activeStep !== 0 && setActiveStep(activeStep - 1)}
            style={{
              color: "black",
              cursor: activeStep === 0 ? "not-allowed" : "pointer",
            }}
            disableRipple={activeStep === 0}
            disableElevation={activeStep === 0}
          >
            Retour
          </Button>
        </Grid>
        <Grid item>
          <Button
            endIcon={
              activeStep === steps.length - 1 ? <CheckIcon /> : <ChevronRight />
            }
            onClick={() =>
              !nextIsDisabled() &&
              (activeStep === steps.length - 1
                ? alert("Fini")
                : setActiveStep(activeStep + 1))
            }
            style={{
              color: "black",
              cursor: nextIsDisabled() ? "not-allowed" : "pointer",
            }}
            disableRipple={nextIsDisabled()}
          >
            {activeStep === steps.length - 1 ? "Valider" : "Suivant"}{" "}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
