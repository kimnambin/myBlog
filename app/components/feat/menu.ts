interface EditProps{
    key : string;
    id : string
}

export const confirApprove = ({key , id} : EditProps ) => {
    const confirmKey = process.env.NEXT_PUBLIC_APPROVE_KEY;
    
    if(confirmKey == key){
        window.open(`https://www.notion.so/${id}`, '_blank');
    }else{
        alert('수정할 권한이 없습니다.')
    }
}