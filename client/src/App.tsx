/** Diseño: Taller de Alto Contraste — experiencia estática de una sola ruta y tema carbón. */
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { playaDelCarmenCampaignPath, playaDelCarmenThankYouPath } from "./lib/campaignRoutes";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={playaDelCarmenCampaignPath} component={Home} />
      <Route path={playaDelCarmenThankYouPath} component={ThankYou} />
      <Route path="/" component={Home} />
      <Route path="/gracias" component={ThankYou} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
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
