export class Log {
    id: string;
    itemId: string;
    remark: string;
    status: string;
    timestamp: string;
    userId:string;
    description:string;
    constructor(id: string,itemId: string,remark: string,status: string, timestamp: string , userid: string,description:string){
        this.id=id;
        this.itemId=itemId;
        this.remark=remark;
        this.status=status;
        this.timestamp=timestamp;
        this.userId=userid;
        this.description=description;
    }
}
