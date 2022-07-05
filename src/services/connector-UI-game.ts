import game from "../game/game/game";

const getPlayers = () => game.getAvailablePlayers();

const connector = { getPlayers };

export default connector;
