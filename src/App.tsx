import { useRef } from "react";
import { connect } from "socket.io-client";

function App() {
  const addEle = useRef<HTMLDivElement>(null);

  const webSocketURL = process.env.REACT_APP_CONNECT_URL as string;

  const socket = connect(webSocketURL, {
    path: "/socket.io",
    transports: ["websocket"],
  });

  socket.on("data", (data) => {
    const namespan = document.createElement("span");
    namespan.classList.add("name");
    const name = document.createTextNode(data.username);
    namespan.appendChild(name);

    const colonspan = document.createElement("span");
    colonspan.classList.add("colon");
    const colon = document.createTextNode(":");
    colonspan.appendChild(colon);

    const metaspan = document.createElement("span");
    metaspan.classList.add("meta");

    const randomColor = [
      "one",
      "user",
      "um",
      "hehe",
      "realkk",
      "holy",
      "heh",
      "wow",
      "end",
    ];

    const randomValue =
      randomColor[Math.floor(Math.random() * randomColor.length)];
    metaspan.classList.add(randomValue);

    metaspan.append(namespan, colonspan);
    const messagespan = document.createElement("span");

    messagespan.classList.add("message");
    const message = document.createTextNode(data.content);
    messagespan.appendChild(message);

    const container = document.createElement("div");
    container.classList.add("container");
    container.append(metaspan, messagespan);

    addEle.current?.appendChild(container);
  });

  return <div id="log" ref={addEle}></div>;
}

export default App;
