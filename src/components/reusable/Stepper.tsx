import { Box, Stepper, Step, StepButton, Button } from "@mui/material";
import classes from './resuable.module.css';
import { type CustomStepperProps } from "../../types";


export default function CustomStepper({
  steps,
  activeStep,
  handleNext,
  handleBack,
  handleFinish,
  isComplete,
  nonLinear = false,
  children,
}: CustomStepperProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear={nonLinear} activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label} completed={false || false}>
            <StepButton>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <div className="stepper-content">
          {children[activeStep]}
        </div>

        <Box sx={{ display: "flex", pt: 2 }}>
          {activeStep ? <Button onClick={handleBack} className={`${classes['back-button']} ${classes['button']}`}>Back</Button> : undefined}
          <Box sx={{ flex: "1 1 auto" }} />
          <Button disabled={!isComplete} onClick={activeStep < steps.length - 1 ? handleNext : handleFinish} sx={{ mr: 1 }} className={classes["button"]}>
            {activeStep < steps.length - 1 ? "Next" : "Apply"}
          </Button>
        </Box>
      </div>
    </Box>
  );
}
