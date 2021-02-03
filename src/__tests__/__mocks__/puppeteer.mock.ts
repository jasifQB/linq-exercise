/* istanbul ignore file */

import { Browser, Page } from 'puppeteer'
import { IPuppeteerOptions } from '../../interfaces/others.interface'

export const mPage = ({
  setRequestInterception(): Promise<void> {
    return Promise.resolve()
  },
  on(): void {
    console.log('on function')
  },
  waitForSelector(): Promise<void> {
    return Promise.resolve()
  },
  setUserAgent(): Promise<void> {
    return Promise.resolve()
  },
  evaluate(): Promise<void> {
    return Promise.resolve()
  },
  waitForNavigation(): Promise<void> {
    return Promise.resolve()
  },
  goto(url: string): Promise<void> {
    console.log(url)

    return Promise.resolve()
  },
} as unknown) as Page

export const MBrowser = ({
  newPage(): Promise<typeof mPage> {
    return Promise.resolve(mPage)
  },
  close(): Promise<void> {
    return Promise.resolve()
  },
}) as Browser

export const MPuppeteer = ({
  launch(options: IPuppeteerOptions): Promise<typeof MBrowser> {
    console.log({ options })

    return Promise.resolve(MBrowser)
  },
}) as any
