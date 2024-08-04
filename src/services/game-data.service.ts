import axios from "axios";
import { IPlayers } from "./start-game.service";
import { GAME_HISTORY, SAVE_GAME } from "../constants/api/endpoints.constants";
import { ApiResponse } from "../constants/response/api-response";

export class GameData {
  private static instance: GameData;

  static getInstance(): GameData {
    if (!GameData.instance) {
      GameData.instance = new GameData();
    }
    return GameData.instance;
  }

  async saveGameData(payload: IPlayers): Promise<ApiResponse<any>> {
    const save = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}${SAVE_GAME}`,
      payload
    );
    return new ApiResponse(
      save.data?.message,
      save.data?.status,
      save.data?.data
    );
  }

  async getGameHistory(): Promise<ApiResponse<IPlayers[]>> {
    const _get = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}${GAME_HISTORY}`
    );
    return _get.data;
  }
}
