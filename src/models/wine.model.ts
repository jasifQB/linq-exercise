export class Wine {
  public title = ''
  public year: number | string = ''
  public region = ''
  public country = ''
  public averageRating = 0
  public ratingsCount = 0
  public price = 0
  public currencyCode = ''
  public imageUrl = ''
  public bottleVolume = 0
  public discountPercent = 0
  constructor(data: {
    title: string,
    year: number | string,
    region: string,
    country: string,
    averageRating: number,
    ratingsCount: number,
    price: number,
    currencyCode: string,
    imageUrl: string,
    bottleVolume: number,
    discountPercent: number
  }){
    this.title = data.title
    this.year = data.year
    this.region = data.region
    this.country = data.country
    this.averageRating = data.averageRating
    this.ratingsCount = data.ratingsCount
    this.price = data.price
    this.currencyCode = data.currencyCode
    this.imageUrl = data.imageUrl
    this.bottleVolume = data.bottleVolume
    this.discountPercent = data.discountPercent
  }

  public static factoryMapJSONtoModel(json: any[]): Wine[] {
    return json.map((wine: any) => {
      return new Wine({
        title: wine?.vintage?.name,
        year: wine?.vintage?.year,
        price: wine?.price?.amount,
        currencyCode: wine?.price?.currency?.code,
        averageRating: wine?.vintage?.statistics?.ratings_average,
        ratingsCount: wine?.vintage?.statistics?.ratings_count,
        imageUrl: wine?.vintage?.image?.location,
        region: wine?.vintage?.wine?.region?.name,
        country: wine?.vintage?.wine?.region?.country?.name,
        bottleVolume: wine?.price?.bottle_type?.volume_ml,
        discountPercent: wine?.price?.discount_percent,
      })
    })
  }
}
