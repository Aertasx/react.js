import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An Error Occurred!</h1>
        <p>Couldn't find this page!</p>
      </main>
    </>
  );
}

export default ErrorPage;