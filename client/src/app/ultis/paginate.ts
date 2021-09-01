export const paginate = (data: any) => {
    data[0].label = '<';
    data[data.length - 1].label = '>';
    data = data.map((item: any) =>{
        if(item.url){
            item.link = item.url.split('=')[1];
        }
        return item;
    })
    return data;
}