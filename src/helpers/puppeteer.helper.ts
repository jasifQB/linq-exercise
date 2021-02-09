import puppeteer from 'puppeteer'
import { IPuppeteerOptions } from '../interfaces/others.interface'
export class PuppeteerHelper {
  private browser!: puppeteer.Browser

  constructor(private options: IPuppeteerOptions) { }

  public async setupBrowser(): Promise<void> {
    this.browser = await puppeteer.launch(this.options)
  }

  public async closeBrowser(): Promise<void> {
    if (this.browser) (await this.browser.close())
  }

  public async setupPage(url: string): Promise<puppeteer.Page> {
    const page = await this.browser.newPage()

    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36')

    await page.goto(url)

    await page.waitForSelector('.simpleLabel__selectedKey--11QuD')
    await page.click('.simpleLabel__selectedKey--11QuD')
    await page.click('.shipToDropdown__list--1_3yJ li:last-child a')

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    return page
  }
}
