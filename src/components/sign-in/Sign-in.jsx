import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service.js";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = localStorage.getItem("isLoggedIn")=== "true";

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoading(false);
      navigate("/employees");
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      console.error(error);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if(isLoggedIn){
      navigate("/employees");
    }
  }, [isLoggedIn,navigate]);

  return (
    <>
      {!isLoggedIn && (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                style={{ textAlign: "right" }}
                
              >
                تسجيل الدخول
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                style={{ textAlign: "right" }}
                color={"red"}
              >
                 {showError&&"خطأ فى البريد الالكترونى او كلمه المرور"}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
                style={{ textAlign: "right" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="البريد الالكترونى"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  style={{ textAlign: "right" }}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="كلمة المرور"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  style={{ textAlign: "right" }}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? "جاري تسجيل الدخول" : "تسجيل الدخول"}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) }
    </>
  );
}