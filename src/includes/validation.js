import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `This field ${ctx.field} is required.`,
          min: `The value must be more than ${ctx.value}.`,
          max: `The value must be at most ${ctx.value}.`,
          alpha_spaces: `The field ${ctx.field} can only contain alphabetic characters and spaces.`,
          email: 'Please enter a valid email address.',
          min_value: `The value must be at least ${ctx.value}.`,
          max_value: `The value must be at most ${ctx.value}.`,
          confirmed: 'The values do not match.',
          excluded: `The value must be different from ${ctx.value}.`,
          country_excluded: `Dueto restrictions we do not accept users from ${ctx.value}.`,
          passwords_mismatch: 'The passwords do not match',
          tos: 'You must agree to the Terms of Service'
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid`
        return message
      }
    })
  }
}
