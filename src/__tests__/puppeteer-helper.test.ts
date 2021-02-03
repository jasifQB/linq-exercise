import { PuppeteerHelper } from '../helpers/puppeteer.helper'
import { URLS } from '../utils/constants'
import { MBrowser } from './__mocks__/puppeteer.mock'

jest.mock('puppeteer', () => ({
  launch() {
    return MBrowser
  },
}))

describe('puppeteer helper class tests', () => {
  it('should return page with desired url after prepare browser', async () => {
    const puppeteerHelper = new PuppeteerHelper({ headless: true, timeout: 999999 })
    await puppeteerHelper.setupBrowser()
    const page = puppeteerHelper.setupPage(URLS.EXPLORE_PAGE_URL)

    expect(page).toBeTruthy()
  })
})
