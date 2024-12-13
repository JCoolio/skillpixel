const API_URL = "http://127.0.0.1:5000";

export const fetchPlayerData = async (playerName) => {
    const response = await fetch(`${API_URL}/player?name=${playerName}`);
    if (!response.ok) {
        throw new Error("Failed to fetch player data");
    }
    return response.json();
};

export const fetchSignature = async (playerName, template) => {
    const response = await fetch(`${API_URL}/signature?name=${playerName}&template=${template}`);
    if (!response.ok) {
        throw new Error("Failed to generate signature");
    }
    return response.blob();
};
