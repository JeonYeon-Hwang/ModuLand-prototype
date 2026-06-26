export function createGeo(size){
    const data = [];

    initialize();

    /* 땅 좌표 생성 */
    function initialize(){
        for(let x = 0; x < size; x++){
            const column = [];
            for(let y = 0; y < size; y++){
                const tile = {
                    x, 
                    y,
                    buliding: undefined,
                    update(){
                        console.log(`updating tile ${x} ${y}`);
                    }
                };
                column.push(tile);
            }
            data.push(column);
        }
    }

    /* 업데이트: 오브젝트 추가하기 */
    function update(){
        for(let x = 0; x < size; x++){
            for(let y = 0; y < size; y++){
                data[x][y].update();
            }
        }       
    }

    return {
        size,
        data,
        update
    }
}