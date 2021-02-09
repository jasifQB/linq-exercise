import chalk from 'chalk'
import clear from 'clear'
import program from 'commander'
import figlet from 'figlet'
import fs from 'fs-extra'
import path from 'path'
import { Wine } from './models/wine.model'
import { WineService } from './services/wine.service'
(async () => {
  try {
    clear()
    console.log(chalk.magenta(figlet.textSync('wine-cli', { horizontalLayout: 'full' })))

    program
      .version('0.0.1')
      .description('An exercise CLI for LINQ')
      .option('-g, --grapes <grapes>', 'grape varietal')
      .option('-r, --min-rating <minRating>', 'Minimum wine rating')
      .option('-p, --min-price <minPrice>', 'Minimum price range')
      .option('-P, --max-price <maxPrice>', 'Maximum price range')
      // .option('-h, --headless', 'open chromium in headless mode')
      .parse(process.argv)

    program.parse()

    if (!process.argv.slice(2).length) {
      program.outputHelp()
    }

    const options = program.opts()

    if (!options.grapes) {
      console.log(chalk.red('\nERROR: You must specify a grape varietal.\n'))
      process.exit(1)
    }

    if (options.minRating && isNaN(options.minRating)) {
      console.log(chalk.red('\nERROR: Invalid rating.\n'))
      process.exit(1)
    }

    if (options.minPrice && isNaN(options.minPrice)) {
      console.log(chalk.red('\nERROR: Invalid minimum price.\n'))
      process.exit(1)
    }

    if (options.maxPrice && isNaN(options.maxPrice)) {
      console.log(chalk.red('\nERROR: Invalid maximum price.\n'))
      process.exit(1)
    }

    // const headless = !!options.headless

    const wineService = new WineService()
    const result = await wineService.getAllWines({
      grapes: options.grapes,
      minRating: options.minRating || 0,
      minPrice: options.minPrice || 1,
      maxPrice: options.maxPrice || 9999999,
    })

    fs.writeFileSync('./output/output.json', `[${Wine.factoryMapModeltoJSON(result).join(',')}]`, { flag: 'w+'})
    console.log(chalk.green('\nOutput saved to file: ./output/output.json \n'))
    process.exit(1)
  } catch (error) {
    console.log(error)
    console.log(chalk.red(`\n${error.message}\n`))
    process.exit(1)
  }
})()
