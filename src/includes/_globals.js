import { upperFirst } from 'lodash/upperFirst'
import { camelCase } from 'lodash/camelCase'

export const GlobalComponent = {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/**/*.vue', {
      eager: true
    })
    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = upperFirst(
        camelCase(
          path
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
      )

      // Register the component with Vue
      app.component(`Base${componentName}`, module.default)
    })
  }
}
