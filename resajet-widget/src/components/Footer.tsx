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
        {activeStep !== 0 && (
          <Grid item>
            <Button
              startIcon={<ChevronLeft />}
              onClick={() => setActiveStep(activeStep - 1)}
              style={{
                color: "black",
              }}
            >
              Retour
            </Button>
          </Grid>
        )}
        <Grid item style={{ marginLeft: "auto" }}>
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
