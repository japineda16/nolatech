import type { Post } from "@/types/interfaces";
import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

// --- Interfaces de Datos ---

// Interfaz para los manejadores de eventos que el hook recibirá
export interface SocketEventHandlers {
  "new-post"?: (data: Post) => void;
  "post-updated"?: (data: Post) => void;
  // Puedes añadir más eventos aquí si los necesitas
  [eventName: string]: ((data: Post) => void) | undefined; // Permite eventos dinámicos
}

// --- Hook TypeScript ---

const useSocketEvents = (
  socketServerUrl: string,
  eventHandlers: SocketEventHandlers
) => {
  // Aseguramos que socketRef.current sea de tipo Socket o null
  const socketRef = useRef<SocketIOClient.Socket | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;

    // Si ya existe una conexión, la cerramos antes de crear una nueva
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // Inicializa la conexión de Socket.IO
    // El tipo inferido aquí es Socket<DefaultEventsMap, DefaultEventsMap>
    socketRef.current = io(socketServerUrl, {
      transports: ["websocket", "polling"],
    });

    socketRef.current.on("connect", () => {
      console.log("Conectado a Socket.IO con ID:", socketRef.current?.id);
    });

    socketRef.current.on("disconnect", (reason: string) => {
      console.log("Desconectado de Socket.IO:", reason);
    });

    socketRef.current.on("connect_error", (error: Error) => {
      console.error("Error de conexión de Socket.IO:", error.message);
    });

    // Itera sobre los manejadores de eventos proporcionados y los suscribe
    // Aseguramos que eventName sea una clave válida de eventHandlers
    for (const eventName in eventHandlers) {
      if (Object.hasOwnProperty.call(eventHandlers, eventName)) {
        const handler = eventHandlers[eventName];
        if (handler) {
          // Asegúrate de que el handler no sea undefined
          // Usamos 'any' aquí para los datos del evento, ya que el tipo específico
          // dependerá del 'eventName'. Podrías refinar esto si sabes el tipo de cada evento.
          socketRef.current.on(
            eventName,
            (data: { [key: string]: string | number }) => {
              if (isMounted.current) {
                handler(data as unknown as Post);
              }
            }
          );
        }
      }
    }

    return () => {
      isMounted.current = false;
      if (socketRef.current) {
        console.log("Desconectando de Socket.IO...");
        socketRef.current.disconnect(); // Desconecta el socket al desmontar el componente
      }
    };
  }, [socketServerUrl, eventHandlers]);

  // Nueva función para emitir eventos al servidor
  // Tipamos los parámetros eventName y data
  const emitEvent = useCallback(
    (eventName: string, data: { [key: string]: string | number | Date }) => {
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.emit(eventName, data);
        console.log(`Evento '${eventName}' emitido con datos:`, data);
      } else {
        console.warn(
          "Socket no conectado, no se pudo emitir el evento:",
          eventName
        );
      }
    },
    []
  );

  return { emitEvent }; // Devolvemos la función para que el componente la pueda usar
};

export default useSocketEvents;
