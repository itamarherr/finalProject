export const getBusinessDetails = async (id) => {
    try {
        const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch business details');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not valid JSON');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching business details: ' + error.message);
    }
};