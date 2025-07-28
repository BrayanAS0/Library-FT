import { Book } from "./Books";
import { Reviews } from "./Reviews";
import { Recommendations } from './Recommendations';

export interface Book_with_detail extends Book{
    reviews:Reviews[],
    recommendations:Recommendations[]
}