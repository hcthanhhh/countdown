'use client';

import { useCallback, useEffect, useState } from 'react';

type PayloadType<T = any> = {
  method: string;
  seq: number;
  params: T;
};

type StatusType = 'disable' | 'connecting' | 'closed';

export default function useWebsocket<T = any, P = any>(
  url: string,
  socketPayload?: PayloadType<P>,
  auth?: PayloadType<String>,
) {
  // if socket sent data set it into this state
  const [data, setData] = useState<T>();
  // state of socket is connect or close by this state
  const [toggleSocket, setToggleSocket] = useState<boolean>(false);
  // management message
  const [status, setStatus] = useState<{
    status: StatusType;
    message: string;
  }>({
    status: 'disable',
    message: 'N/A',
  });

  // handle toggle socket change state of socket is connect or disconnect it
  const handleToggleSocket = (status: boolean) => {
    setToggleSocket(status);
  };

  // handle change status
  const handleChangeStatus = useCallback(
    (status: StatusType, message: string) => {
      setStatus({
        status,
        message,
      });
    },
    [toggleSocket],
  );

  useEffect(() => {
    if (toggleSocket) {
      // define socket client
      const socket = new WebSocket(url);
      // const socket: Socket = io(baseUrl);

      socket.onopen = () => {
        // convert JSON string to bytes using TextEncoder
        const encoder = new TextEncoder();

        // if server need authorization, pass the params and if statement
        if (auth) {
          //===>> authorization <<===//
          const authorization: PayloadType = {
            method: auth.method,
            seq: auth.seq,
            params: auth.params,
          };
          // Convert JSON object to JSON string
          const authJsonToString = JSON.stringify(authorization);
          // encode to byte data
          const authStringToByteData = encoder.encode(authJsonToString);
          socket.send(authStringToByteData);
        }

        // send payload to server
        if (socketPayload) {
          //===>> send data <<===//
          const myPayload = {
            method: socketPayload.method,
            seq: socketPayload.seq,
            params: socketPayload.params,
          };
          // convert JSON object to JSON string
          const payloadString = JSON.stringify(myPayload);
          const payloadByte = encoder.encode(payloadString);
          socket.send(payloadByte);
        }
      };

      socket.onmessage = (event: any) => {
        if (event.data instanceof ArrayBuffer) {
          // handle binary data as ArrayBuffer
          const byteData = new Uint8Array(event.data);
          // set data to state data
          setData(byteData as typeof event.data);
          // when complete close socket
          // if (byteData) {
          // socket.close()
          // set status
          // handleChangeStatus("closed", "Socket is closed!")
          // }
        } else if (event.data instanceof Blob) {
          // handle binary data as Blob
          // define a reader
          const reader = new FileReader();

          // buffer data
          reader.readAsArrayBuffer(event.data);

          // read and convert data
          reader.onload = function () {
            const byteData = new Uint8Array(reader.result as typeof event.data);
            const decoder = new TextDecoder('utf-8');
            const jsonString = decoder.decode(byteData);
            // parse the JSON string to get the object
            const receivedObject = JSON.parse(jsonString);

            // set data to state data
            setData(receivedObject);
            // when complete close socket
            // if (receivedObject) {
            // socket.close()
            // set status
            // handleChangeStatus("closed", "Socket is closed!")
            // }
          };
        } else {
          // handle text data i
          setData(event.data);
          // when complete close socket
          // if (event.data) {
          // socket.close()
          // set status
          // handleChangeStatus("closed", "Socket is closed!")
          // }
        }
      };

      // when socket connect error or something wrong you can handle here
      socket.onerror = (_err) => {
        console.log('Socket is error at: ', _err);
      };

      // when socket close do something here
      socket.addEventListener('close', (_event) => {
        // console.log("WebSocket connection closed:", event)
      });

      return () => {
        if (socket) {
          // when component unmount close socket
          socket.close();
          // when complete close socket
          // handleChangeStatus("closed", "Socket is closed!")
        }
      };
    } else {
      // socket.close()
      // handleChangeStatus("closed", "Socket is closed!")
    }
  }, [toggleSocket]);

  // return sequentially params
  // 1.data when socket return | 2. change status connect or close to socket
  // 3. status and message data | 4.handle change status message
  return [data, handleToggleSocket, status, handleChangeStatus] as const;
}
