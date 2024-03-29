/**
 * IDryRun defines wether this package will do the io-operations. By default it will be set to fault but it is good for testing purposes as well. Or to, at least, not copy files and folders while testing your scripts
 * @typedef {object} IDryRun
 * @param {boolean} dryRun Set's value for the dryRun property
 * @default {dryRun: false}

 */
export interface IDryRun {
  dryRun?: boolean;
}
