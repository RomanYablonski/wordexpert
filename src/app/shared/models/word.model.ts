export class Word {
  constructor(
    public english: string,
    public russian: string,
    public status: string,
    public wasMistaked?: boolean,
    public successes?: number,
    public key?: string,
    public englishStatus?: string,
  ) {}
}
