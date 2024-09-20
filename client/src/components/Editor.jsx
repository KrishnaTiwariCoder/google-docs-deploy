import React, { useEffect } from "react";
import { Box } from "@mui/material";

import Quill from "quill";
import { Component, toolbarOptions } from "../constants";

import { io } from "socket.io-client";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Editor = () => {
  const serverURL = "http://localhost:8080";
  const [quillServerState, setQuillServerState] = useState();
  const [socketServerState, setSocketServerState] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const quillServer = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    quillServer.disable();
    quillServer.setText("Loading the document...");
    setQuillServerState(quillServer);
  }, []);

  useEffect(() => {
    const socketServer = io(serverURL);
    setSocketServerState(socketServer);
    return () => {
      socketServer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socketServerState || !quillServerState) return;

    const handleChange = (delta) => {
      console.log(delta);
      quillServerState.setContents(delta);
    };

    socketServerState.on("receive-data", handleChange);

    return () => {
      socketServerState.off("receive-data", handleChange);
    };
  }, [socketServerState]);

  useEffect(() => {
    if (!socketServerState || !quillServerState) return;

    const handleChange = (delta, oldDelta, source) => {
      if (source !== "user") return;

      socketServerState.emit("send-change", delta);
      // console.log(quillServerState.getContents());
      socketServerState.emit("save-document", quillServerState.getContents());
      console.log(quillServerState.getContents());
    };

    quillServerState.on("text-change", handleChange);

    return () => {
      quillServerState.off("text-change", handleChange);
    };
  }, [quillServerState]);

  useEffect(() => {
    if (!socketServerState || !quillServerState) return;

    socketServerState.once("load-document", (document) => {
      quillServerState.setContents(document);
      quillServerState.enable();
    });

    socketServerState.emit("get-document", id);
  }, [quillServerState, socketServerState, id]);

  return (
    <Component>
      <h2>Google Docs Clone</h2>
      <Box className="container" id="container"></Box>
    </Component>
  );
};

export default Editor;
