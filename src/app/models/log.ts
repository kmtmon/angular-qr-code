export class Log {
    id: string;
    itemId: string;
    remark: string;
    status: string;
    timestamp: string;
    userId:string;
    constructor(id: string,itemId: string,remark: string,status: string, timestamp: string , userid: string){
        this.id=id;
        this.itemId=itemId;
        this.remark=remark;
        this.status=status;
        this.timestamp=timestamp;
        this.userId=userid;
    }
}
