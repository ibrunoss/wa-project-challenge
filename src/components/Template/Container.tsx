import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const TemplateContainer: React.FC = (props) => {
  const { children } = props;
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "95vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default TemplateContainer;
