export async function requestJSONData(file) {
    return await new Promise((resolve, reject) => {
        fetch("api/Data?file=" + file)
        .then((res) => {
            resolve(res.json());
        });
    });
}

export async function requestData(data) {
    return await new Promise((resolve, reject) => {
        fetch("api/dbData?name=" + data)
        .then((res) => {
            resolve(res.json());
        });
    });
}

export async function getAddress(id) {
    if(!isNaN(id)) {
        return await new Promise((resolve, reject) => {
            fetch("api/getAddress?id=" + id)
            .then((res) => {
                resolve(res.json());
            });
        });
    }
}