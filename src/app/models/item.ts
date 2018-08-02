export class Item {
    id: string;
    categoryId: string;
    location: string;

    constructor(id:string, categoryId:string, location:string){
        this.id=id;
        this.categoryId=categoryId;
        this.location=location;
    }
}