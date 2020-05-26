export default {
    palette: {
      type: 'dark',
      primary: {
        light: "#B0F4E6",
        main: "#226089",
        dark: "#0D0221",
        contrastText: "#FCF9EC",
      },
      secondary: {
        light: "#B0F4E6",
        main: "#394359",
        dark: "#12D3CF",
        contrastText: "#FCF9EC",
      },
      background: {
        default: "#256e9b",
        paper: "#7aadca"
      }
    },
    typography: {
      useNextVariants: true,
    },
    css: {
      form: {
        textAlign: "center",
        margin: "0 auto",
        maxWidth: 600,
      },
      image: {
        margin: "20px auto",
        width: 150,
        height: 150
      },
      pageTitle: {
        margin: "10px auto",
      },
      textField: {
        margin: "10px auto",
      },
      button: {
        marginTop: 20,
        position: "relative",
      },
      wrongError: {
        color: "#F44336",
        marginTop: 10,
      },
      progress: {
        position: "absolute",
      },
      invisibleSeparator: {
        border: "none",
        margin: 4,
      },
      visibleSeparator: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 20,
      },
      paper: {
        padding: 20,
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
          "& button": {
            position: "absolute",
            top: "80%",
            left: "70%",
          },
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: "50%",
        },
        "& .profile-details": {
          textAlign: "center",
          "& span, svg": {
            verticalAlign: "middle",
          },
          "& a": {
            color: "#00bcd4",
          },
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0",
        },
        "& svg.button": {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      buttons: {
        textAlign: "center",
        "& a": {
          margin: "20px 10px",
        },
      },
    },
  };
  