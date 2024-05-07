import { Container } from "@mui/material";
import { AboutBlock } from "components/HomePage/AboutBlock";
import { TitleBlock } from "components/HomePage/TitleBlock";
import { TryServiceBlock } from "components/HomePage/TryServiceBlock";
import RewriterFooter from "components/RewriterFooter/RewriterFooter";
import { ReactElement } from "react";

// const styles = {};

export const HomePage = (): ReactElement => {
  return (
    <>
      <Container>
        <TitleBlock />
        <AboutBlock />
        <TryServiceBlock />
      </Container>
      <RewriterFooter />
    </>
  );
};
