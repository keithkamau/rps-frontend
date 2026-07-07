import { io } from "socket.io-client";
import { authService } from "./authService";

const SOCKET_URL = "https://rps-backend-ro2g.onrender.com";

class WebSocketService {
  socket = null;

  connect(token = authService.getToken()) {
    if (this.socket?.connected) return this.socket;

    this.socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    return this.socket;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }

  on(event, handler) {
    this.connect().on(event, handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    this.socket?.off(event, handler);
  }

  emit(event, payload) {
    this.connect().emit(event, payload);
  }

  joinTournament(tournamentId) {
    this.emit("tournament:join", { tournamentId });
  }

  leaveTournament(tournamentId) {
    this.emit("tournament:leave", { tournamentId });
  }

  submitChoice(matchId, roundId, choice) {
    this.emit("game:choice", { matchId, roundId, choice });
  }
}

const websocketService = new WebSocketService();

export default websocketService;
