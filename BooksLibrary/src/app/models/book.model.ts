// DEFINE BOOK OBJECT FOR THE PROJECT
export interface Book {
    id: string;
    title: string;
    author: string;
    date: Date;
    imgUrl?: string;
}