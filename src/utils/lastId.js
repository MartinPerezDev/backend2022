export const lastId = async (item) => {
    try {
        if (item.length === 0) {
            return 1;
        }
        let newId = item[item.length - 1].id + 1;
        return newId;
    } catch (err) {
        throw new Error(err.message)
    }
}