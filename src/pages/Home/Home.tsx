import AppBar from "../../components/organism/AppBar";
import QuickAccessGrid from "../../components/organism/QuickAccessGrid";
import { Page } from "./Home.styles";

const Home = () => {
  return (
    <>
      <AppBar />
      <Page>
        <QuickAccessGrid />
      </Page>
    </>
  );
}

export default Home