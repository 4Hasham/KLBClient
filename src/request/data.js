export async function requestJSONData(file) {
    return await new Promise((resolve, reject) => {
        fetch("api/truckData?file=trucks")
        .then((res) => {
            resolve(res.json());
        });
    });
}