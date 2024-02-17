export async function findGymWithId(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/gyms/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}

export async function gatherAllGyms(){
    try {
        const response = await fetch(`http://127.0.0.1:8000/gyms`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('error:', error);
    }
}