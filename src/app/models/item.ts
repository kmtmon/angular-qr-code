export class Item {
    id: string;
    categoryId: string;
    location: string;
    status: string;
    constructor(id:string, categoryId:string, location:string, status:string){
        this.id=id;
        this.categoryId=categoryId;
        this.location=location;
        this.status=status;
    }
}