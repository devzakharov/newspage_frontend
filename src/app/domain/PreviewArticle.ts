export class PreviewArticle {

  id: string;
  description: string;
  image: string;
  title: string;
  photo: string;
  anons: string;
  category: string;
  publishDate: string;

  constructor(
    id: string,
    description: string,
    image: string,
    title: string,
    photo: string,
    anons: string,
    category: string,
    publishDate: string) {

    this.id = id;
    this.description = description;
    this.image = image;
    this.title = title;
    this.photo = photo;
    this.anons = anons;
    this.category = category;
    this.publishDate = publishDate;

  }
}
