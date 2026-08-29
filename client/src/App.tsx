/** Diseño: Taller de Alto Contraste — experiencia estática de una sola ruta y tema carbón. */
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { playaDelCarmenCampaignPath, playaDelCarmenThankYouPath } from "./lib/campaignRoutes";
import Home from "./pages/Home";

const AcademyRoot = lazy(() => import("./pages/AcademyRoot"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

function RouteLoading() {
  return <div aria-hidden="true" />;
}

function AcademyRootRoute() {
  return <Suspense fallback={<RouteLoading />}><AcademyRoot /></Suspense>;
}

function ThankYouRoute() {
  return <Suspense fallback={<RouteLoading />}><ThankYou /></Suspense>;
}

function NotFoundRoute() {
  return <Suspense fallback={<RouteLoading />}><NotFound /></Suspense>;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={playaDelCarmenCampaignPath} component={Home} />
      <Route path={playaDelCarmenThankYouPath} component={ThankYou} />
      <Route path="/" component={AcademyRootRoute} />
      <Route path="/gracias" component={ThankYouRoute} />
      <Route path="/404" component={NotFoundRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
