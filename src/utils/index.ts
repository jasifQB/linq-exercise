import { ISearchParam } from '../interfaces/search-param.interface'
import { URLS } from './constants'

export default class Utils {
  private static buildQueryString(key: string, values: string): string {
    if (!values) return ''
    const queryvalues = values.split(',').map((val) => val.trim())

    return queryvalues.reduce((queryString, value) => `${queryString}&${key}=${value}`, '')
  }

  public static buildSearchURL(searchParams: ISearchParam, pageIndex: number): string {
    let url = `${URLS.EXPLORE_API_URL}?country_code=US&currency_code=USD`
    url += this.buildQueryString('grape_ids[]', searchParams.grapes)
    url += `&grape_filter=varietal`
    url += `&min_rating=${searchParams.minRating}`
    url += `&order_by=ratings_average&order=desc&page=${pageIndex}`
    url += `&price_range_max=${searchParams.maxPrice}`
    url += `&price_range_min=${searchParams.minPrice}`

    return url
  }
}
