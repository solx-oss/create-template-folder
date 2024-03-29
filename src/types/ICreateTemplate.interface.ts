/**
 * ICopyDir encapsulates one of the ways of approaching the copyDir function
 * @typedef {object} ICopyDir
 * @param {string} inDir The path of the `directory` or `file` you want to copy
 * @param {string} outDir The path of the `directory` that you should want to copy to
 * @param {Record<string, string>} vars Vars should hold the objects that will map over the files and folders and change the templates with your own provided values
 * @param {number} number This value corresponds to the number of curly brackets used on the templates. It should **never** be below 2. Advisable to use below it in case of possible naming conflicts in templating languages
 */
export interface ICreateTemplate {
  /**
   * The path of the `directory` or `file` you want to copy
   */
  inDir: string;
  /**
   * The path of the `directory` that you should want to copy to
   */
  outDir: string;
  /**
   * Vars should hold the objects that will map over the files and folders and change the templates with your own provided values
   *
   * @default {}
   *
   * Eventually maps over the following way:
   * @example
   * {hello:"world"}
   *
   * const string = "Hello there, {{hello}}"
   * // function gets called with the object obove
   * console.log(function(string)) // "Hello there, world"
   */
  vars: Record<string, string>;
  /**
   * Optional value, but defines the number of curly brackets  used in your templates.
   * ## Numbers below 2 are not permitted
   * @default 2
   * @example
   * {number: 2} // maps to templates that are using double curly brackets: {{hello}}
   *
   */
  number?: number;
}
