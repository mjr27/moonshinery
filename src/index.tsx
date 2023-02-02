import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {HashRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

function setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length === 2) {
        const a = parts.pop();
        if (!a) {
            return "";
        }
        return a.split(";").shift();
    }
}

function Index() {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(getCookie("theme") === 'dark' ? "dark" : "light");
    const toggleColorScheme = (value?: ColorScheme) => {
        const scheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setCookie("theme", scheme);
        setColorScheme(scheme);
    }

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                <HashRouter>
                    <App/>
                </HashRouter>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

root.render(
    <React.StrictMode>
        <Index/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
