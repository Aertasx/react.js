import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        {/* {navigation.state === 'loading' && <p>Loading..</p>} */}
      </main>
    </>
  );
}

export default RootLayout;
