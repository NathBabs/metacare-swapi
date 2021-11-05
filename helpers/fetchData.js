//@ts-check
import axios from "axios"

let characterArr = []
let counter = 0

/**
 * 
 * @param {string} url 
 * @returns
 */
const fetchData = async (url) => {
    try {
        if (counter == 0) characterArr.length = 0;
        const { data } = await axios.get(url);
        characterArr.push(...data.results);
        counter++

        if (data.next != null) {
            console.log(data.next);
            await fetchData(data.next)
        }

        counter = 0;
        return characterArr;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default fetchData;