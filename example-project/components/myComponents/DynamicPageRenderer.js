import { useRouter } from 'next/router';
import LandingPage from '../../pages/landing';
import Components from '../../pages/components';

const DynamicPageRenderer = () => {
  const router = useRouter();

  let PageComponent;
  
  // Router.pathname, mevcut sayfanın rotasını verir
  switch (router.pathname) {
    case '/':
      PageComponent = LandingPage;
      break;
    case '/components':
      PageComponent = Components;
      break;
    default:
      PageComponent = LandingPage;
  }

  return <PageComponent />;
};

export default DynamicPageRenderer;
