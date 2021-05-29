import React from 'react';
import { render } from 'react-dom';
import { throttle } from 'lodash';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import './styles/styles.css';
import { theme } from './theme/theme';
import configureStore from './store/configureStore';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
      localStorage.clear();
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Ops, algo errado aconteceu, a simulação irá ser resetada. Por favor recarregue a página!</h1>;
      }

      return this.props.children;
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log(e);
    }
};

const store = configureStore();

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>
);

render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('app'));
