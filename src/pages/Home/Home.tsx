import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../../components/organism/AppBar";
import { Grid } from "../../components/organism/Grid";
import { GridFastAccess } from "../../components/organism/Grid/GridFastAccess";
import { loadSummary, loadTotalAreaRegistered } from "../../store/home/thunks";
import { Page } from "./Home.styles";

const Home = () => {
  const dispatch = useDispatch();
  const summary = useSelector((s: any) => s.home.summary);
  const totalAreaRegistered = useSelector((s: any) => s.home.totalAreaRegistered);
  const status  = useSelector((s: any) => s.home.status);
  const authStatus = useSelector((s: any) => s.auth.status);
  const accessToken = useSelector((s: any) => s.auth.accessToken);

  useEffect(() => { 
    if (authStatus === 'authenticated' && accessToken) {
      dispatch<any>(loadSummary());
      dispatch<any>(loadTotalAreaRegistered());
    }
  }, [dispatch, authStatus, accessToken]);
  return (
    <>
      <AppBar />
      <Page>
        <Grid 
          summary={{...summary, totalAreaRegistered: totalAreaRegistered}} 
          status={status}
        />
        <GridFastAccess />
      </Page>
    </>
  );
}

export default Home