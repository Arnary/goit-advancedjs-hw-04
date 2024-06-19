import axios from "axios";

const API_KEY = "44432226-c2b8db609e5d1d7f1a74c07d6";

const BASIC_URL = "https://pixabay.com/api/";

export async function getPhoto(query, page, per_page=40) {
    const response = await axios.get(BASIC_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page,
        }
    });

    if (response.status != 200) {
        throw new Error(response.statusText);
    };

    return response.data;
}
