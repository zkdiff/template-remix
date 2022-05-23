import * as React from "react";
import { Scripts } from "@remix-run/react";
import styles from "~/styles/tailwind.css";
import type { LinksFunction } from "@remix-run/react/routeModules";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  ];
};

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <html>
      <head>
        <title>My First Remix App</title>
      </head>
      <body>
        <p>This is a remix app. Hooray!</p>
        <button
          onClick={() => {
            setCount((c) => c + 1);
          }}
        >
          {count}
        </button>
        <Scripts />
      </body>
    </html>
  );
}

export default App;
