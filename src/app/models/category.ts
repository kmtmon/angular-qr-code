import { Observable } from "../../../node_modules/rxjs";

export class Category {
    id: string;
    name: string;
    description: string;
    imagePath:string;
    constructor(id:string, name:string, desc:string, imagePath: string){
        this.id=id;
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
    }
}