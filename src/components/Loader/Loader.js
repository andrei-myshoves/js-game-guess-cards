import * as styles from './Loader.module.css'

export function Loader() {
    return `
      <div class="${styles.loaderWrapper}">
        <div class="${styles.loader}"></div>
      </div>
    `
}
