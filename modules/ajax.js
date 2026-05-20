class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                callback(xhr.status === 200 ? JSON.parse(xhr.responseText) : null, xhr.status);
            }
        };
    }
}
export const ajax = new Ajax();
