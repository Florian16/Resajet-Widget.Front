import { Grid, Button } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { ReservationRequest } from "../requests/ReservationRequest";
import { TFunction } from "i18next";

type FooterProps = {
  activeStep: number;
  formulaire: ReservationRequest;
  setActiveStep: (as: number) => void;
  steps: string[];
  t: TFunction;
};

export default function Footer({
  activeStep,
  formulaire,
  setActiveStep,
  steps,
  t,
}: FooterProps) {
  const nextIsDisabled = () => {
    if (activeStep === 0) {
      return (
        formulaire?.periodId === "" ||
        formulaire?.participants <= 0 ||
        formulaire?.date === null ||
        formulaire?.timeSlotId === ""
      );
    }
    if (activeStep === 1) {
      return (
        formulaire?.periodId === "" ||
        formulaire?.participants <= 0 ||
        formulaire?.date === null ||
        formulaire?.timeSlotId === "" ||
        formulaire?.lastname === "" ||
        formulaire?.firstname === "" ||
        formulaire?.mail === "" ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          formulaire?.mail
        ) ||
        formulaire?.phoneNumber === "" ||
        !(
          formulaire?.phoneNumber &&
          /^\+\d{1,3}\s?\d{1,14}$/.test("+" + formulaire?.phoneNumber)
        )
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
              {t("footer.retour")}
            </Button>
          </Grid>
        )}
        <Grid item style={{ marginLeft: "auto" }}>
          <Button
            endIcon={
              activeStep === steps.length - 1 ? <CheckIcon /> : <ChevronRight />
            }
            onClick={() => !nextIsDisabled() && setActiveStep(activeStep + 1)}
            style={{
              color: "black",
              cursor: nextIsDisabled() ? "not-allowed" : "pointer",
            }}
            disableRipple={nextIsDisabled()}
          >
            {activeStep === steps.length - 1
              ? `${t("footer.valider")}`
              : `${t("footer.suivant")}`}{" "}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
