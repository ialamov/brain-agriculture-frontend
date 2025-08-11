import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../../components/organism/AppBar";
import { Grid } from "../../components/organism/Grid";
import { GridFastAccess } from "../../components/organism/Grid/GridFastAccess";
import { loadSummary } from "../../store/home/thunks";
import { Page } from "./Home.styles";
import type { Summary } from "../../service/metrics/types";

const Home = () => {
  const dispatch = useDispatch();
  const summary = useSelector((s: any) => s.home.summary);
  const status  = useSelector((s: any) => s.home.status);
  const authStatus = useSelector((s: any) => s.auth.status);
  const accessToken = useSelector((s: any) => s.auth.accessToken);

  useEffect(() => { 
    if (authStatus === 'authenticated' && accessToken) {
      // @ts-ignore
      dispatch(loadSummary()); 
    }
  }, [dispatch, authStatus, accessToken]);

  return (
    <>
      <AppBar />
      <Page>
        <Grid 
          summary={summary} 
          status={status}
        />
        <GridFastAccess />
      </Page>
    </>
  );
}

export default Home