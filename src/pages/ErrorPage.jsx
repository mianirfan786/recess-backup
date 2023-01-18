import { Container, Grid } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container maxWidth="sm">
            <h1>Oops!</h1>
            <h4>Sorry, an unexpected error has occurred.</h4>
            <Grid xs={2}><h3>{error.status}</h3></Grid> <Grid xs={8}><h5>{error.statusText || error.message}</h5></Grid>
        </Container>
    );
}
