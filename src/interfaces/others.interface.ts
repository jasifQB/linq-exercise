import { IBaseParams } from './base.interface'

export interface IGrape extends IBaseParams { }

export interface IPuppeteerOptions {
  headless: boolean
  timeout: number
}
