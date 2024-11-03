import _ from 'lodash'
export const GlobalComponent = {
  install(app) {
    const baseComponents = import.meta.glob('../components/base/**/*.vue', {
      eager: true
    })
    Object.entries(baseComponents).forEach(([path, module]) => {
      const componentName = _.upperFirst(
        _.camelCase(
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
