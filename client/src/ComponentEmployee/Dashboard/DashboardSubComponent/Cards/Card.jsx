// import React from "react";
// import { Link } from "react-router-dom";
// import './Card.css';

// const Card = ({ title,subtitle, subtitle1, text, link1, name,buttonColor,textColor}) => {
//   return (
//     <div className="card company-cards" style={{height:"250px"}}>
//       <div className="card-body"
//       style={{
//         width: "16rem",
//         "@media (max-width: 768px)": {
//           width: "8rem"
//         }
//       }}>
//       <button className="card-subtitle mb-2 text-body-secondary p-2 mb-2"style={{ backgroundColor: buttonColor, border:"none", color:textColor, fontWeight:600, fontSize:"10px" }}>{subtitle}</button>
//      <h5 className="card-title company-title">{title}</h5>
//         <h6 className="card-subtitle1 mb-2 text-body-secondary">{subtitle1} <span>{name}</span></h6>
//         <p className="card-text company-text">{text}</p>
//         <p className="link">{link1}</p>
//       </div>
//     </div>
//   );
// };


// export default Card;
  import React, { useState } from "react";
  import Box from "@mui/material/Box";
  import { useTheme } from "@mui/material/styles";
  import MobileStepper from "@mui/material/MobileStepper";
  import Paper from "@mui/material/Paper";
  import Typography from "@mui/material/Typography";
  import Button from "@mui/material/Button";
  import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
  import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
  import {Link} from "react-router-dom"
  import './Card.css';

  const Card = ({ steps = [], buttonColor, textColor }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // Return a fallback UI if steps are not provided
    if (maxSteps === 0) {
      return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }} className="card company-cards border border-grey">
          <Typography>No content available</Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ maxWidth: 400, flexGrow: 1 }} className="card company-cards border border-grey">
        <Box 
          sx={{ 
            p: 2,
            height: 230,  // Fixed height for the content area
            overflowY: 'auto'  // Enable vertical scrollbar
          }}
        >
          <button
            className="card-subtitle mb-2 text-body-secondary p-2 mb-2"
            style={{ backgroundColor: buttonColor, border: "none", color: textColor, fontWeight: 600, fontSize: "10px" }}
          >
            {steps[activeStep].subtitle}
          </button>
          <h5 className="card-title company-title">{steps[activeStep].title}</h5>
          <h6 className="card-subtitle1 mb-2 text-body-secondary">
            {steps[activeStep].formattedDate} <span>{steps[activeStep].userName}</span>
          </h6>
          <p className="card-text company-text">{steps[activeStep].text}</p>
          {console.log(steps[activeStep].files)}
          
          {steps[activeStep].files && steps[activeStep].files.length > 0 && (
            <div className="file-links">
              {steps[activeStep].files.map((file, fileIndex) => (
                <a 
                  key={fileIndex} 
                  href={file.url_private} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'block', marginTop: '5px' }}
                >
                  Open File
                </a>
 
              ))}
            </div>
          )}
        </Box>
        <MobileStepper
        className="mb-2"
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    );
  };

  export default Card;
