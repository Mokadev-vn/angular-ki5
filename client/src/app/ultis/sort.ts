export const sort = (data: Array<any>, field: string, type: Number = 1) => {
    let sortData = data.sort((a: any, b: any) => {
        if (typeof a[field] == 'number') {
            return a[field] - b[field];
        }

        var stringA = a[field].toUpperCase();
        var stringB = b[field].toUpperCase();
        if (stringA < stringB) {
            return -1
        }
        if (stringA > stringB) {
            return 1;
        }
        return 0;
    })

    if (type == 2) {
        return sortData.reverse()
    }
    return sortData

}