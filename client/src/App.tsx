import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import About from "./pages/About";
import News from "./pages/News";
import FAQPage from "./pages/FAQPage";
import EngageIndividual from "./pages/EngageIndividual";
import EngageBusiness from "./pages/EngageBusiness";
import EngageAssociation from "./pages/EngageAssociation";
import Contact from "./pages/Contact";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/donate"} component={Donate} />
      <Route path={"/about"} component={About} />
      <Route path={"/news"} component={News} />
      <Route path={"/faq"} component={FAQPage} />
      <Route path={"/engage-particulier"} component={EngageIndividual} />
      <Route path={"/engage-entreprise"} component={EngageBusiness} />
      <Route path={"/engage-association"} component={EngageAssociation} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
