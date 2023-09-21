import { Grid, Button, CircularProgress } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import { ReservationRequest } from "../requests/ReservationRequest";
import { TFunction } from "i18next";
import { CompanyContextProps } from "../contexts/CompanyContext";

type FooterProps = {
  activeStep: number;
  formulaire: ReservationRequest;
  setActiveStep: (as: number) => void;
  steps: string[];
  t: TFunction;
  validateReservation: () => void;
  companyContext: CompanyContextProps;
  isSubmitting: boolean;
  openCloseWidget: () => void;
};

export default function Footer({
  activeStep,
  formulaire,
  setActiveStep,
  steps,
  t,
  validateReservation,
  companyContext,
  isSubmitting,
  openCloseWidget,
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
        formulaire?.email === "" ||
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          formulaire?.email
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
        {activeStep !== 0 && activeStep !== steps.length && (
          <Grid item>
            <Button
              startIcon={<ChevronLeft />}
              onClick={() => setActiveStep(activeStep - 1)}
              style={{
                color: "black",
              }}
              className="resajet-footer-label-back-step"
            >
              {t("footer.retour")}
            </Button>
          </Grid>
        )}
        <Grid item style={{ marginLeft: "auto" }}>
          {companyContext && isSubmitting ? (
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                color: () => companyContext.company?.mainColor,
                animationDuration: "800ms",
                position: "absolute",
                right: 55,
              }}
              size={40}
              thickness={4}
            />
          ) : (
            <Button
              endIcon={
                activeStep === steps.length - 1 ? (
                  <CheckIcon />
                ) : (
                  <ChevronRight />
                )
              }
              onClick={() => {
                if (activeStep === steps.length) {
                  openCloseWidget();
                } else {
                  activeStep === steps.length - 1 && validateReservation();
                  !nextIsDisabled() &&
                    activeStep !== steps.length - 1 &&
                    setActiveStep(activeStep + 1);
                }
              }}
              style={{
                color: "black",
                cursor: nextIsDisabled() ? "not-allowed" : "pointer",
              }}
              className="resajet-footer-label-next-step"
              disableRipple={nextIsDisabled()}
            >
              {activeStep === steps.length
                ? `${t("footer.fermer")}`
                : activeStep === steps.length - 1
                ? `${t("footer.valider")}`
                : `${t("footer.suivant")}`}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
