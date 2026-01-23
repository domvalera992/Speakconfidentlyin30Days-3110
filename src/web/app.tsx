import { Route, Switch } from "wouter";
import Index from "./pages/index";
import { Provider } from "./components/provider";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
        return (
                <ErrorBoundary>
                        <Provider>
                                <Switch>
                                        <Route path="/" component={Index} />
                                </Switch>
                        </Provider>
                </ErrorBoundary>
        );
}

export default App;
