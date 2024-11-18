import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { create } from 'zustand';
import { Env } from '@/libs/Env.mjs';

const baseUrl = Env.NEXT_PUBLIC_SOCKET_URL;

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  transport: string;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  isConnected: false,
  transport: 'N/A',
  socket: null,
  connect: (token: string) => {
    useEffect(() => {
      const socket = io(baseUrl, {
        auth: {
          token,
        },
      });
      if (socket.connected) {
        onConnect();
      }

      function onConnect() {
        set({ socket, isConnected: true, transport: socket.io.engine.transport.name });

        socket.io.engine.on('upgrade', (transport) => {
          set({ socket, isConnected: true, transport: transport.name });
        });
      }

      function onDisconnect() {
        set({ socket: null, isConnected: false, transport: 'N/A' });
        socket.disconnect();
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      return () => {
        socket.disconnect();
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
    }, []);
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
