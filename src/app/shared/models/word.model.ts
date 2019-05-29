export class Word {
  constructor(
    public english: string,
    public russian: string,
    public status: string,
    public englishStatus?: string,
    public id?: number
  ) {}
}
