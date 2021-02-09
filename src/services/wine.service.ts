import { Page } from 'puppeteer'
import { PuppeteerHelper } from '../helpers/puppeteer.helper'
import { IGrape } from '../interfaces/others.interface'
import { ISearchParam } from '../interfaces/search-param.interface'
import { Wine } from '../models/wine.model'
import Utils from '../utils'
import { URLS } from '../utils/constants'

declare const window: any

export class WineService {
  private page!: Page

  public async getAllWines(searchParams: ISearchParam): Promise<Wine[]> {
    const puppeteerHelper = new PuppeteerHelper({ headless: true, timeout: 9999999 })
    await puppeteerHelper.setupBrowser()
    try {
      this.page = await puppeteerHelper.setupPage(URLS.EXPLORE_PAGE_URL)
      const grapeList = await this.fetchGrapeList()
      const requestedGrapes = searchParams.grapes.split(',').map((grape) => grape.trim())
      const requestedGrapeIDs = grapeList.filter((grape: IGrape) => requestedGrapes.findIndex((rGrape) =>
        rGrape.toLowerCase() === grape.name.toLowerCase()) > -1).map((grape) => grape.id)

      if (!requestedGrapeIDs.length) throw new Error('Invalid grapes input.')

      searchParams.grapes = requestedGrapeIDs.join(',')
      const wineList = await this.fecthCompleteWineList(searchParams)

      puppeteerHelper.closeBrowser()

      return wineList
    } catch (error) {
      puppeteerHelper.closeBrowser()
      throw error
    }
  }

  private async fetchGrapeList(): Promise<IGrape[]> {
    const result = await this.page.evaluate(async (apiURL) => {
      const cacheKey = `${window.vivinoCacheKey}${localStorage.getItem('local_cache_key')}`
      const response = await fetch(`${apiURL}?cache_key=${cacheKey}`)
      const responseText = await response.text()

      return JSON.parse(responseText)
    }, URLS.GRAPE_LIST_API)

    if (result.error) throw new Error(result.error)

    return (result.grapes as IGrape[]) || []
  }

  private async fecthCompleteWineList(searchParams: ISearchParam): Promise<Wine[]> {
    const wineList: Wine[] = []

    const result: any = await this.fetchWineList(searchParams, 1)

    const totalRecordsCount = result.records_matched
    const recordsPerPage = result.records.length
    const totalPages = Math.ceil(totalRecordsCount / recordsPerPage)

    console.log({ totalRecordsCount })

    wineList.push(...Wine.factoryMapJSONtoModel(result.records))

    for (let page = 2; page <= totalPages; page++) {
      const result: any = await this.fetchWineList(searchParams, page)
      wineList.push(...Wine.factoryMapJSONtoModel(result.records))
    }

    return wineList
  }

  private async fetchWineList(searchParams: ISearchParam, pageIndex: number): Promise<any> {
    const searchURL = Utils.buildSearchURL(searchParams, pageIndex)
    const result = await this.page.evaluate(async (url) => {
      const response = await fetch(url)
      const responseText = await response.text()

      return JSON.parse(responseText)
    }, searchURL)
    if (result.error) throw new Error(result.error)

    return result.explore_vintage
  }
}
