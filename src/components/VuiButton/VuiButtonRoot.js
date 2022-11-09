import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import linearGradient from "assets/theme/functions/linearGradient";

export default styled(Button)(({ theme, ownerState }) => {
  const { palette, functions, borders } = theme;
  const { color, variant, size, circular, iconOnly } = ownerState;

  const { white, dark, text, transparent, gradients } = palette;
  const { boxShadow, pxToRem, rgba, linearGradient } = functions;
  const { borderRadius } = borders;

  const containedStyles = () => {
    const backgroundValue = palette[color] ? palette[color].main : white.main;
    const focusedBackgroundValue = palette[color] ? palette[color].focus : white.focus;
    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], dark.main, 0.5);

    let colorValue = blue.main;

    if (color === "blue" || !palette[color]) {
      colorValue = blue.main;
    } else if (color === "primary") {
      colorValue = gradients.dark.state;
    }

    let focusedColorValue = blue.main;

    if (color === "blue") {
      focusedColorValue = text.main;
    } else if (color === "primary" || color === "error" || color === "dark") {
      focusedColorValue = blue.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,

      "&:hover": {
        backgroundColor: backgroundValue,
      },

      "&:focus:not(:hover)": {
        backgroundColor: focusedBackgroundValue,
        boxShadow: boxShadowValue,
      },

      "&:disabled": {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };

  const outliedStyles = () => {
    const backgroundValue = color === "white" ? transparent.main : transparent.main;
    const colorValue = palette[color] ? palette[color].main : white.main;

    const boxShadowValue = palette[color]
      ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5)
      : boxShadow([0, 0], [0, 3.2], white.main, 0.5);
    let borderColorValue = palette[color] ? palette[color].main : rgba(white.main, 0.75);

    if (color === "blue") {
      borderColorValue = rgba(blue.main, 0.75);
    }

    return {
      background: backgroundValue,
      color: colorValue,
      borderColor: borderColorValue,

      "&:hover": {
        background: transparent.main,
        borderColor: colorValue,
      },

      "&:focus:not(:hover)": {
        background: transparent.main,
        boxShadow: boxShadowValue,
      },

      "&:active:not(:hover)": {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85,
      },

      "&:disabled": {
        color: colorValue,
        borderColor: colorValue,
      },
    };
  };

  // styles for the button with variant="gradient"
  const gradientStyles = () => {
    // background value
    const backgroundValue = linearGradient(
      palette.gradients[color].main,
      palette.gradients[color].state,
      palette.gradients[color].deg
    );
    // "linear-gradient(126.97deg, rgba(222, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)";

    // color value
    let colorValue = white.main;

    if (color === "blue") {
      colorValue = blue.main;
    } else if (color === "primary") {
      colorValue = gradients.dark.state;
    } else {
      colorValue = blue.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,

      "&:focus:not(:hover)": {
        boxShadow: "none",
      },

      "&:disabled": {
        background: backgroundValue,
        color: colorValue,
      },
    };
  };
  const textStyles = () => {
    const colorValue = palette[color] ? palette[color].main : blue.main;
    const focusedColorValue = palette[color] ? palette[color].focus : palette[color].focus;

    return {
      color: colorValue,

      "&:hover": {
        color: focusedColorValue,
      },

      "&:focus:not(:hover)": {
        color: focusedColorValue,
      },
    };
  };
  const circularStyles = () => ({
    borderRadius: borderRadius.section,
  });
  const iconOnlyStyles = () => {
    let sizeValue = pxToRem(38);

    if (size === "small") {
      sizeValue = pxToRem(25.4);
    } else if (size === "large") {
      sizeValue = pxToRem(52);
    }

    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === "small") {
      paddingValue = pxToRem(4.5);
    } else if (size === "large") {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,

      "& .material-icons": {
        marginTop: 0,
      },

      "&:hover, &:focus, &:active": {
        transform: "none",
      },
    };
  };

  return {
    ...(variant === "contained" && containedStyles()),
    ...(variant === "outlined" && outliedStyles()),
    ...(variant === "gradient" && gradientStyles()),
    ...(variant === "text" && textStyles()),
    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});
